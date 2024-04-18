import { GoldRushDecoder } from "../../decoder";
import { EventDetails, type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import PORTAL_BRIDGE_ABI from "./abis/wormhole-portal-bridge.abi.json";
import ETH_CORE_ABI from "./abis/wormhole-eth-core.abi.json";

GoldRushDecoder.on(
    "wormhole:TransferRedeemed",
    ["eth-mainnet"],
    PORTAL_BRIDGE_ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: PORTAL_BRIDGE_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "TransferRedeemed",
        }) as {
            eventName: "TransferRedeemed";
            args: {
                emitterChainId: string;
                emitterAddress: string;
                sequence: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "Emitter Chain ID",
                value: decoded.emitterChainId,
                type: "text",
            },
            {
                heading: "Emitter Address",
                value: decoded.emitterAddress,
                type: "text",
            },
            {
                heading: "Sequence",
                value: decoded.sequence.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.RECEIVED_BRIDGE,
            category: DECODED_EVENT_CATEGORY.BRIDGE,
            name: "TransferRedeemed",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details,
        };
    }
);

GoldRushDecoder.on(
    "wormhole:LogMessagePublished",
    ["eth-mainnet"],
    ETH_CORE_ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ETH_CORE_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "LogMessagePublished",
        }) as {
            eventName: "LogMessagePublished";
            args: {
                sender: string;
                consistencyLevel: bigint;
                sequence: bigint;
                nonce: bigint;
                payload: string;
            };
        };

        const details: EventDetails = [
            {
                heading: "Sender",
                value: decoded.sender,
                type: "text",
            },
            {
                heading: "Consistency Level",
                value: decoded.consistencyLevel.toString(),
                type: "text",
            },
            {
                heading: "Sequence",
                value: decoded.sequence.toString(),
                type: "text",
            },
            {
                heading: "Nonce",
                value: decoded.nonce.toString(),
                type: "text",
            },
            {
                heading: "Payload",
                value: decoded.payload,
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.BRIDGE,
            name: "LogMessagePublished",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details,
        };
    }
);
