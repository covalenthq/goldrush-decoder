import { readdirSync } from "fs";
import { join } from "path";
import {
    CovalentClient,
    type Chain,
    type LogEvent,
} from "@covalenthq/client-sdk";
import {
    type Configs,
    type DecodingFunction,
    type Decoders,
    type DecodingFunctions,
    type EventType,
    type DecoderConfig,
} from "./decoder.types";
import { encodeEventTopics, type Abi } from "viem";

export class Decoder {
    private static configs: DecoderConfig = {};
    private static decoders: Decoders = {};
    private static decoding_functions: DecodingFunctions = [];

    public static initDecoder = () => {
        const directoryPath: string = join(__dirname, "/protocols");
        const protocols = readdirSync(directoryPath);
        let protocolsCount: number = 0;
        for (const protocol of protocols) {
            const protocolPath = join(directoryPath, protocol);
            const files = readdirSync(protocolPath);
            let configFile: string | null = null,
                decodersFile: string | null = null;
            files.forEach((file) => {
                const fileExtension =
                    process.env.NODE_ENV !== "test" ? "js" : "ts";
                if (file.endsWith(`.configs.${fileExtension}`)) {
                    configFile = file;
                }
                if (file.endsWith(`.decoders.${fileExtension}`)) {
                    decodersFile = file;
                }
            });
            if (configFile && decodersFile) {
                protocolsCount++;
                const configs = require(join(protocolPath, configFile))
                    .default as Configs;
                configs.forEach(
                    ({ address, is_factory, network, protocol_name }) => {
                        this.configs[network] ??= {};
                        this.configs[network][protocol_name] ??= {};
                        this.configs[network][protocol_name][address] = {
                            is_factory: is_factory,
                        };
                    }
                );
                require(join(protocolPath, decodersFile));
            }
        }

        const configsCount = Object.values(this.configs).reduce(
            (networkCount, network) => {
                return (
                    networkCount +
                    Object.values(network).reduce((addressCount, protocol) => {
                        return addressCount + Object.keys(protocol).length;
                    }, 0)
                );
            },
            0
        );

        const decodersCount = Object.keys(this.decoding_functions).length;

        console.info(
            `Created ${configsCount} configs and ${decodersCount} decoders for ${protocolsCount} protocols!`
        );
    };

    public static on = (
        event_id: string,
        networks: Chain[],
        abi: Abi,
        decoding_function: DecodingFunction
    ) => {
        const [protocol, event_name] = event_id.split(":");
        const [topic0] = encodeEventTopics({
            abi: abi,
            eventName: event_name,
        });
        this.decoding_functions.push(decoding_function);
        const decoding_function_index: number =
            this.decoding_functions.length - 1;
        networks.forEach((network) => {
            const configExists = this.configs[network]?.[protocol]
                ? true
                : false;
            if (!configExists) {
                throw Error(
                    `config for ${protocol} does not exist on the network ${network}`
                );
            }
            Object.keys(this.configs[network][protocol]).forEach((address) => {
                this.decoders[network] ??= {};
                this.decoders[network][address] ??= {};
                this.decoders[network][address][topic0] =
                    decoding_function_index;
            });
        });
    };

    public static decode = async (
        network: Chain,
        logs: LogEvent[],
        covalent_api_key: string
    ) => {
        try {
            const covalentClient = new CovalentClient(covalent_api_key);
            const events: EventType[] = [];
            for (const log of logs) {
                const {
                    raw_log_topics: [topic0_hash],
                    sender_address: contract_address,
                    // !ERROR: add factory_contract_address in the log_event(s)
                    // factory_contract_address,
                } = log;
                const function_index =
                    // !ERROR: add factory_contract_address in the log_event(s)
                    // factory_contract_address ||
                    this.decoders[network][contract_address]?.[topic0_hash];
                if (function_index !== undefined) {
                    const event = await this.decoding_functions[function_index](
                        log,
                        network,
                        covalentClient
                    );
                    events.push(event);
                }
            }
            return events;
        } catch (error) {
            console.error(error);
        }
    };
}
