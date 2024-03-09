import { readdirSync } from "fs";
import { join } from "path";
import {
    CovalentClient,
    type Chain,
    type Transaction,
} from "@covalenthq/client-sdk";
import {
    type Configs,
    type DecodingFunction,
    type Decoders,
    type DecodingFunctions,
    type EventType,
    type DecoderConfig,
    type Fallbacks,
    type NativeDecodingFunction,
} from "./decoder.types";
import { encodeEventTopics, type Abi } from "viem";

export class GoldRushDecoder {
    private static configs: DecoderConfig = {};
    private static decoders: Decoders = {};
    private static fallbacks: Fallbacks = {};
    private static native_decoder: NativeDecodingFunction;
    private static decoding_functions: DecodingFunctions = [];
    private static fallback_functions: DecodingFunctions = [];
    private static fileExtension: "js" | "ts" =
        process.env.NODE_ENV !== "test" ? "js" : "ts";

    public static initDecoder = () => {
        console.info("Initializing GoldrushDecoder Service...");

        const protocolsDirectoryPath: string = join(__dirname, "/protocols");
        const protocols = readdirSync(protocolsDirectoryPath);
        let protocolsCount: number = 0;
        let configsCount: number = 0;
        for (const protocol of protocols) {
            const protocolPath = join(protocolsDirectoryPath, protocol);
            const files = readdirSync(protocolPath);
            let configFile: string | null = null,
                decodersFile: string | null = null;
            files.forEach((file) => {
                if (file.endsWith(`.configs.${this.fileExtension}`)) {
                    configFile = file;
                }
                if (file.endsWith(`.decoders.${this.fileExtension}`)) {
                    decodersFile = file;
                }
            });
            if (configFile && decodersFile) {
                protocolsCount++;
                const configs = require(join(protocolPath, configFile))
                    .default as Configs;
                configs.forEach(
                    ({ address, is_factory, chain_name, protocol_name }) => {
                        this.configs[chain_name] ??= {};
                        this.configs[chain_name][protocol_name] ??= {};
                        this.configs[chain_name][protocol_name][address] = {
                            is_factory: is_factory,
                        };
                        configsCount++;
                    }
                );
                require(join(protocolPath, decodersFile));
            }
        }

        const fallbacksDirectoryPath: string = join(__dirname, "/fallbacks");
        const fallbacks = readdirSync(fallbacksDirectoryPath);
        for (const fallback of fallbacks) {
            const fallbackPath = join(fallbacksDirectoryPath, fallback);
            const files = readdirSync(fallbackPath);
            let fallbackFile: string | null = null;
            files.forEach((file) => {
                if (file.endsWith(`.fallback.${this.fileExtension}`)) {
                    fallbackFile = file;
                }
            });
            if (fallbackFile) {
                require(join(fallbackPath, fallbackFile));
            }
        }

        const nativeDecoderPath: string = join(
            __dirname,
            "native",
            `native.decoder.${this.fileExtension}`
        );
        require(join(nativeDecoderPath));

        const decodersCount = this.decoding_functions.length;
        const fallbacksCount = this.fallback_functions.length;

        console.info("1 native decoder added");
        console.info(`${protocolsCount.toLocaleString()} protocols found`);
        console.info(`${configsCount.toLocaleString()} configs generated`);
        console.info(`${decodersCount.toLocaleString()} decoders generated`);
        console.info(`${fallbacksCount.toLocaleString()} fallbacks generated`);
    };

    public static on = (
        event_id: string,
        chain_names: Chain[],
        abi: Abi,
        decoding_function: DecodingFunction
    ) => {
        const [protocol, event_name] = event_id.split(":");
        const [topic0_hash] = encodeEventTopics({
            abi: abi,
            eventName: event_name,
        });
        this.decoding_functions.push(decoding_function);
        const decoding_function_index: number =
            this.decoding_functions.length - 1;
        chain_names.forEach((chain_name) => {
            const configExists = this.configs[chain_name]?.[protocol]
                ? true
                : false;
            if (!configExists) {
                throw Error(
                    `config for ${protocol} does not exist on ${chain_name}`
                );
            }
            Object.keys(this.configs[chain_name][protocol]).forEach(
                (address) => {
                    this.decoders[chain_name] ??= {};
                    this.decoders[chain_name][address] ??= {};
                    this.decoders[chain_name][address][topic0_hash] =
                        decoding_function_index;
                }
            );
        });
    };

    public static fallback = (
        event_name: string,
        abi: Abi,
        decoding_function: DecodingFunction
    ) => {
        const [topic0_hash] = encodeEventTopics({
            abi: abi,
            eventName: event_name,
        });
        this.fallback_functions.push(decoding_function);
        const fallback_function_index: number =
            this.fallback_functions.length - 1;
        this.fallbacks[topic0_hash] = fallback_function_index;
    };

    public static native = (native_decoder: NativeDecodingFunction) => {
        this.native_decoder = native_decoder;
    };

    public static decode = async (
        chain_name: Chain,
        tx: Transaction,
        covalent_api_key: string
    ) => {
        const covalent_client = new CovalentClient(covalent_api_key);
        const events: EventType[] = [];
        if (tx.value) {
            const nativeEvent = this.native_decoder(tx);
            events.push(nativeEvent);
        }

        const decodedEvents = await Promise.all(
            (tx.log_events ?? []).map((log) => {
                const {
                    raw_log_topics: [topic0_hash],
                    sender_address,
                    sender_factory_address,
                } = log;
                const decoding_index =
                    this.decoders[chain_name]?.[sender_address]?.[
                        topic0_hash
                    ] ??
                    this.decoders[chain_name]?.[sender_factory_address]?.[
                        topic0_hash
                    ];
                const fallback_index = this.fallbacks[topic0_hash];

                if (decoding_index !== undefined) {
                    return this.decoding_functions[decoding_index](
                        log,
                        tx,
                        chain_name,
                        covalent_client
                    );
                } else if (fallback_index !== undefined) {
                    return this.fallback_functions[fallback_index](
                        log,
                        tx,
                        chain_name,
                        covalent_client
                    );
                }
                return null;
            })
        );

        return events.concat(decodedEvents.filter(Boolean) as EventType[]);
    };
}
