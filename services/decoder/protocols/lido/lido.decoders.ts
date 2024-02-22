import { GoldRushDecoder } from "../../decoder";
import type { EventDetails, EventTokens } from "../../decoder.types";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ABI from "./abis/lido.steth.abi.json";
import { date } from "yup";

GoldRushDecoder.on(
    "lido:TransferShares",
    ["eth-mainnet"],
    ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "TransferShares",
        }) as {
            eventName: "TransferShares";
            args: {
                from: string;
                to: string;
                sharesValue: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "from",
                value: decoded.from,
                type: "address",
            },
            {
                heading: "to",
                value: decoded.to,
                type: "address",
            },
            {
                heading: "sharesValue",
                value: decoded.sharesValue.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Transfer Shares",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            details,
        };
    }
);

GoldRushDecoder.on(
    "lido:Submitted",
    ["eth-mainnet"],
    ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Submitted",
        }) as {
            eventName: "Submitted";
            args: {
                sender: string;
                amount: bigint;
                referral: string;
            };
        };

        const details: EventDetails = [
            {
                heading: "sender",
                value: decoded.sender,
                type: "address",
            },
            {
                heading: "to",
                value: decoded.amount.toString(),
                type: "text",
            },
            {
                heading: "referral",
                value: decoded.referral,
                type: "address",
            },
        ];

        const tokens: EventTokens = [
            {
                heading: "Tokens Staked",
                value: tx.value!.toString(),
                decimals: tx.gas_metadata.contract_decimals,
                ticker_symbol: tx.gas_metadata.contract_ticker_symbol,
                ticker_logo: tx.gas_metadata.logo_url,
                pretty_quote: tx.value_quote.toString(),
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Submitted",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "lido:TokenRebased",
    ["eth-mainnet"],
    ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "TokenRebased",
        }) as {
            eventName: "TokenRebased";
            args: {
                reportTimestamp: bigint;
                timeElapsed: bigint;
                preTotalShares: bigint;
                preTotalEther: bigint;
                postTotalShares: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "sender",
                value: decoded.sender,
                type: "address",
            },
            {
                heading: "to",
                value: decoded.amount.toString(),
                type: "text",
            },
            {
                heading: "referral",
                value: decoded.referral,
                type: "address",
            },
        ];

        const tokens: EventTokens = [
            {
                heading: "Tokens Staked",
                value: tx.value!.toString(),
                decimals: tx.gas_metadata.contract_decimals,
                ticker_symbol: tx.gas_metadata.contract_ticker_symbol,
                ticker_logo: tx.gas_metadata.logo_url,
                pretty_quote: tx.value_quote.toString(),
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Submitted",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            details,
            tokens,
        };
    }
);
