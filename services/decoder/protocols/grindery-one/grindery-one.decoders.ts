import { Decoder } from "../../decoder";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ABI from "./abis/grindery-one.abi.json";

Decoder.on(
    "grindery-one:Transfer",
    ["matic-mainnet"],
    ABI as Abi,
    async (log, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_contract_decimals } = log;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Transfer",
        }) as {
            eventName: "Transfer";
            args: {
                from: string;
                to: string;
                value: bigint;
            };
        };

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Transfer",
            protocol: {
                logo: log.sender_logo_url as string,
                name: log.sender_name as string,
            },
            details: [
                {
                    title: "From",
                    value: decoded.from,
                    type: "address",
                },
                {
                    title: "To",
                    value: decoded.to,
                    type: "address",
                },
                {
                    title: "Value",
                    value: (
                        decoded.value /
                        BigInt(Math.pow(10, sender_contract_decimals))
                    ).toString(),
                    type: "text",
                },
            ],
        };
    }
);
