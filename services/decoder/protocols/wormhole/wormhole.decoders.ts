import { decodeEventLog, type Abi } from "viem";
import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import type { EventDetails } from "../../decoder.types";
import { type EventType } from "../../decoder.types";
import { bridgeImplementationABI } from "./abis/bridge-implementation.abi";
import { wormholeImplementationABI } from "./abis/wormhole-implementation.abi";

GoldRushDecoder.on(
    "wormhole:TransferRedeemed",
    [
        "eth-mainnet",
        "arbitrum-mainnet",
        "bsc-mainnet",
        "matic-mainnet",
        "avalanche-mainnet",
        "emerald-paratime-mainnet",
        "aurora-mainnet",
        "celo-mainnet",
        "moonbeam-mainnet",
        "optimism-mainnet",
        "base-mainnet",
    ],
    bridgeImplementationABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: bridgeImplementationABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "TransferRedeemed",
        });

        const details: EventDetails = [
            {
                heading: "Emitter Chain ID",
                value: decoded.emitterChainId.toLocaleString(),
                type: "text",
            },
            {
                heading: "Emitter Address",
                value: decoded.emitterAddress,
                type: "address",
            },
            {
                heading: "Sequence",
                value: decoded.sequence.toLocaleString(),
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
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);

GoldRushDecoder.on(
    "wormhole:LogMessagePublished",
    [
        "eth-mainnet",
        "arbitrum-mainnet",
        "bsc-mainnet",
        "matic-mainnet",
        "avalanche-mainnet",
        "emerald-paratime-mainnet",
        "aurora-mainnet",
        "celo-mainnet",
        "moonbeam-mainnet",
        "optimism-mainnet",
        "base-mainnet",
        "gnosis-mainnet",
    ],
    wormholeImplementationABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: wormholeImplementationABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "LogMessagePublished",
        });

        const details: EventDetails = [
            {
                heading: "Sender",
                value: decoded.sender,
                type: "address",
            },
            {
                heading: "Consistency Level",
                value: decoded.consistencyLevel.toLocaleString(),
                type: "text",
            },
            {
                heading: "Sequence",
                value: decoded.sequence.toLocaleString(),
                type: "text",
            },
            {
                heading: "Nonce",
                value: decoded.nonce.toLocaleString(),
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
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);
