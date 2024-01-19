import { readdirSync } from "fs";
import { join } from "path";
import {
    CovalentClient,
    type Chain,
    type LogEvent,
} from "@covalenthq/client-sdk";
import {
    type Config,
    type DecodingFunction,
    type Decoders,
    type EventType,
} from "./decoder.types";
import { encodeEventTopics, type Abi } from "viem";

export class Decoder {
    private static configs: Config[] = [];
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
                    .default as Config[];
                configs.forEach((config) => {
                    this.configs.push(config);
                });
                require(join(protocolPath, decodersFile));
            }
        }

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

        console.info(`Created ${this.configs.length} configs successfully!`);
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
        const config = this.configs.find(
            ({ network, protocol_name }) =>
                networks.includes(network) && protocol_name === protocol
        );
        if (!config) {
            throw Error(`config for ${protocol} does not exist`);
        }
        this.decoders[config.network] ??= {};
        this.decoders[config.network][config.address] ??= {};
        this.decoders[config.network][config.address][topic0] =
            decoding_function;
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
