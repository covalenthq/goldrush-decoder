import { GoldRushDecoder } from "../../decoder";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ABI from "./abis/4337-entry-point.abi.json";

GoldRushDecoder.on(
    "4337-entry-point:UserOperationEvent",
    ["matic-mainnet"],
    ABI as Abi,
    async (
        log,
        chain_name,
        covalent_client,
        tx_metadata
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_contract_decimals } = log;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "UserOperationEvent",
        }) as {
            eventName: "UserOperationEvent";
            args: {
                userOpHash: string;
                sender: string;
                paymaster: string;
                nonce: bigint;
                success: boolean;
                actualGasCost: bigint;
                actualGasUsed: bigint;
            };
        };

        return {
            action: DECODED_ACTION.ACCOUNT_ABSTRACTION,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "User Operation Event",
            protocol: {
                logo: log.sender_logo_url as string,
                name: "4337 Entry Point",
            },
            details: [
                {
                    title: "Gas Cost",
                    value: (
                        decoded.actualGasCost /
                        BigInt(Math.pow(10, sender_contract_decimals))
                    ).toString(),
                    type: "text",
                },
                {
                    title: "Gas Used",
                    value: (
                        decoded.actualGasUsed /
                        BigInt(Math.pow(10, sender_contract_decimals))
                    ).toString(),
                    type: "text",
                },
                {
                    title: "Paymaster",
                    value: decoded.paymaster,
                    type: "address",
                },
                {
                    title: "Sender",
                    value: decoded.sender,
                    type: "address",
                },
                {
                    title: "User Operation Hash",
                    value: decoded.userOpHash,
                    type: "address",
                },
            ],
        };
    }
);
