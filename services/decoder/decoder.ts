import { chunkify } from "../../utils/functions";
import {
    type Configs,
    type DecoderConfig,
    type Decoders,
    type DecodingFunction,
    type EventType,
    type Fallbacks,
    type NativeDecodingFunction,
    type QueryOptions,
} from "./decoder.types";
import {
    GoldRushClient,
    type ChainName,
    type Transaction,
} from "@covalenthq/client-sdk";
import { readdirSync } from "fs";
import { join } from "path";
import { encodeEventTopics, type Abi } from "viem";

export class GoldRushDecoder {
    private static configs: DecoderConfig = {};
    private static decoders: Decoders = {};
    private static fallbacks: Fallbacks = {};
    private static native_decoder: NativeDecodingFunction;
    private static decoding_functions: DecodingFunction[] = [];
    private static fallback_functions: DecodingFunction[] = [];
    private static fileExtension: "js" | "ts" =
        process.env.NODE_ENV !== "test" ? "js" : "ts";

    public static initDecoder = (): void => {
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
        chain_names: (ChainName | `${ChainName}`)[],
        abi: Abi,
        decoding_function: DecodingFunction
    ): void => {
        const _chain_names = new Set<ChainName | `${ChainName}`>(chain_names);
        const [protocol, event_name] = event_id.split(":");
        const [topic0_hash] = encodeEventTopics({
            abi: abi,
            eventName: event_name,
        });
        this.decoding_functions.push(decoding_function);
        const decoding_function_index: number =
            this.decoding_functions.length - 1;
        Array.from(_chain_names).forEach((chain_name) => {
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
                    const lowercaseAddress = address.toLowerCase();
                    const lowercaseTopic0Hash = topic0_hash.toLowerCase();

                    this.decoders[chain_name] ??= {};
                    this.decoders[chain_name][lowercaseAddress] ??= {};
                    this.decoders[chain_name][lowercaseAddress][
                        lowercaseTopic0Hash
                    ] = decoding_function_index;
                }
            );
        });
    };

    public static fallback = (
        event_name: string,
        abi: Abi,
        decoding_function: DecodingFunction
    ): void => {
        const [topic0_hash] = encodeEventTopics({
            abi: abi,
            eventName: event_name,
        });
        const lowercaseTopic0Hash = topic0_hash.toLowerCase();
        this.fallback_functions.push(decoding_function);
        const fallback_function_index: number =
            this.fallback_functions.length - 1;
        this.fallbacks[lowercaseTopic0Hash] = fallback_function_index;
    };

    public static native = (native_decoder: NativeDecodingFunction): void => {
        this.native_decoder = native_decoder;
    };

    public static decode = async (
        chain_name: ChainName,
        tx: Transaction,
        goldrush_client: GoldRushClient,
        options: QueryOptions
    ): Promise<EventType[]> => {
        let events: (EventType | null)[] = [];
        if (tx.value) {
            const nativeEvent = this.native_decoder(tx, options);
            events.push(nativeEvent);
        }
        const logChunks = chunkify(tx.log_events ?? [], 100);
        for (const logChunk of logChunks) {
            const decodedChunk = await Promise.all(
                logChunk.map((log_event) => {
                    const {
                        raw_log_topics,
                        sender_address,
                        sender_factory_address,
                    } = log_event;

                    if (!raw_log_topics || !raw_log_topics[0]) {
                        return null;
                    }

                    const [topic0_hash] = raw_log_topics;

                    const lowercaseSenderAddress =
                        sender_address?.toLowerCase();
                    const lowercaseSenderFactoryAddress =
                        sender_factory_address?.toLowerCase();
                    const lowercaseTopic0Hash = topic0_hash.toLowerCase();

                    const decoding_index: number | null = lowercaseSenderAddress
                        ? this.decoders[chain_name]?.[lowercaseSenderAddress]?.[
                              lowercaseTopic0Hash
                          ]
                        : lowercaseSenderFactoryAddress
                          ? this.decoders[chain_name]?.[
                                lowercaseSenderFactoryAddress
                            ]?.[lowercaseTopic0Hash]
                          : null;

                    const fallback_index: number | null =
                        this.fallbacks[lowercaseTopic0Hash] ?? null;

                    if (decoding_index === null && fallback_index === null) {
                        return null;
                    }

                    const logFunction =
                        this.decoding_functions[decoding_index as number] ||
                        this.fallback_functions[fallback_index as number] ||
                        null;

                    if (!logFunction) {
                        return null;
                    }

                    return logFunction(
                        log_event,
                        tx,
                        chain_name,
                        goldrush_client,
                        options
                    );
                })
            );
            events = [...events, ...decodedChunk];
        }
        return events.filter(Boolean) as EventType[];
    };
}
