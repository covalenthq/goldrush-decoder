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
    type EventType,
    type DecoderConfig,
} from "./decoder.types";
import { encodeEventTopics, type Abi } from "viem";

export class Decoder {
    private static configs: DecoderConfig = {};
    private static decoders: Decoders = {};

    public static initDecoder = () => {
        const directoryPath: string = join(__dirname, "/protocols");
        const protocols = readdirSync(directoryPath);
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
                const configs = require(join(protocolPath, configFile))
                    .default as Configs;
                configs.forEach(
                    ({ address, is_factory, network, protocol_name }) => {
                        this.configs[network] ??= {};
                        this.configs[network][protocol_name] = {
                            address: address,
                            is_factory: is_factory,
                        };
                    }
                );
                require(join(protocolPath, decodersFile));
            }
        }

        const configsCount = Object.values(this.configs).reduce(
            (acc, network) => {
                return acc + Object.keys(network).length;
            },
            0
        );

        const decodersCount = Object.values(this.decoders).reduce(
            (networkCount, network) => {
                return (
                    networkCount +
                    Object.values(network).reduce((addressCount, address) => {
                        return addressCount + Object.values(address).length;
                    }, 0)
                );
            },
            0
        );

        console.info(`Created ${configsCount} configs successfully!`);
        console.info(`Created ${decodersCount} decoders successfully!`);
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
        networks.forEach((network) => {
            const configExists = this.configs[network]?.[protocol]
                ? true
                : false;
            if (!configExists) {
                throw Error(
                    `config for ${protocol} does not exist on the network ${network}`
                );
            }
            this.decoders[network] ??= {};
            this.decoders[network][this.configs[network][protocol].address] ??=
                {};
            this.decoders[network][this.configs[network][protocol].address][
                topic0
            ] = decoding_function;
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
                const decoding_function =
                    // !ERROR: add factory_contract_address in the log_event(s)
                    // factory_contract_address ||
                    this.decoders[network][contract_address]?.[topic0_hash];
                if (decoding_function) {
                    const event = await decoding_function(
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
