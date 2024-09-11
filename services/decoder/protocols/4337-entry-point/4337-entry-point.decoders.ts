import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { type EventDetails, type EventType } from "../../decoder.types";
import { entryPointABI } from "./abis/entry-point.abi";
import { ChainName } from "@covalenthq/client-sdk";
import { decodeEventLog, type Abi } from "viem";

GoldRushDecoder.on(
    "4337-entry-point:UserOperationEvent",
    [ChainName.MATIC_MAINNET, ChainName.AVALANCHE_MAINNET],
    entryPointABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const {
            raw_log_data,
            raw_log_topics,
            sender_contract_decimals,
            sender_logo_url,
        } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: entryPointABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "UserOperationEvent",
        });

        const details: EventDetails = [
            {
                heading: "Paymaster",
                value: decoded.paymaster,
                type: "address",
            },
            {
                heading: "Sender",
                value: decoded.sender,
                type: "address",
            },
            {
                heading: "User Operation Hash",
                value: decoded.userOpHash,
                type: "address",
            },
        ];
        if (sender_contract_decimals) {
            details.push(
                {
                    heading: "Gas Cost",
                    value: (
                        decoded.actualGasCost /
                        BigInt(Math.pow(10, sender_contract_decimals))
                    ).toString(),
                    type: "text",
                },
                {
                    heading: "Gas Used",
                    value: (
                        decoded.actualGasUsed /
                        BigInt(Math.pow(10, sender_contract_decimals))
                    ).toString(),
                    type: "text",
                }
            );
        }

        return {
            action: DECODED_ACTION.ACCOUNT_ABSTRACTION,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "User Operation Event",
            protocol: {
                logo: sender_logo_url,
                name: "4337 Entry Point",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);
