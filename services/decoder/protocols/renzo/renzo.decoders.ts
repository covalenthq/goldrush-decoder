import { GoldRushDecoder } from "../../decoder";
import type { EventDetails, EventTokens } from "../../decoder.types";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import STRATEGY_MANAGER_ABI from "./abis/renzo.eigen-layer-strategy-manager.json";
import RESTAKE_STRATEGY_ABI from "./abis/renzo.restake-manager-abi.json";
import { TimestampParser } from "../../../../utils/functions";
import { prettifyCurrency } from "@covalenthq/client-sdk";

GoldRushDecoder.on(
    "renzo:ShareWithdrawalQueued",
    ["eth-mainnet"],
    STRATEGY_MANAGER_ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: STRATEGY_MANAGER_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "ShareWithdrawalQueued",
        }) as {
            eventName: "ShareWithdrawalQueued";
            args: {
                depositor: string;
                nonce: bigint;
                strategy: string;
                shares: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "Depositor",
                value: decoded.depositor,
                type: "address",
            },
            {
                heading: "Nonce",
                value: decoded.nonce.toString(),
                type: "text",
            },
            {
                heading: "Strategy",
                value: decoded.strategy,
                type: "address",
            },
            {
                heading: "Shares",
                value: decoded.shares.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.WITHDRAWAL,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "ShareWithdrawalQueued",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details,
        };
    }
);

GoldRushDecoder.on(
    "renzo:WithdrawalQueued",
    ["eth-mainnet"],
    STRATEGY_MANAGER_ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: STRATEGY_MANAGER_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "WithdrawalQueued",
        }) as {
            eventName: "WithdrawalQueued";
            args: {
                depositor: string;
                nonce: bigint;
                withdrawer: string;
                delegatedAddress: string;
                withdrawalRoot: string;
            };
        };

        const details: EventDetails = [
            {
                heading: "Depositor",
                value: decoded.depositor,
                type: "address",
            },
            {
                heading: "Nonce",
                value: decoded.nonce.toString(),
                type: "text",
            },
            {
                heading: "Withdrawer",
                value: decoded.withdrawer,
                type: "address",
            },
            {
                heading: "Delegated Address",
                value: decoded.delegatedAddress,
                type: "address",
            },
            {
                heading: "Withdrawal Root",
                value: decoded.withdrawalRoot,
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.WITHDRAWAL,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "WithdrawalQueued",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details,
        };
    }
);

GoldRushDecoder.on(
    "renzo:WithdrawalCompleted",
    ["eth-mainnet"],
    STRATEGY_MANAGER_ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: STRATEGY_MANAGER_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "WithdrawalCompleted",
        }) as {
            eventName: "WithdrawalCompleted";
            args: {
                depositor: string;
                nonce: bigint;
                withdrawer: string;
                withdrawalRoot: string;
            };
        };

        const details: EventDetails = [
            {
                heading: "Depositor",
                value: decoded.depositor,
                type: "address",
            },
            {
                heading: "Nonce",
                value: decoded.nonce.toString(),
                type: "text",
            },
            {
                heading: "Withdrawer",
                value: decoded.withdrawer,
                type: "address",
            },
            {
                heading: "Withdrawal Root",
                value: decoded.withdrawalRoot,
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.WITHDRAWAL,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "WithdrawalCompleted",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details,
        };
    }
);

GoldRushDecoder.on(
    "renzo:Deposit",
    ["eth-mainnet"],
    RESTAKE_STRATEGY_ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: RESTAKE_STRATEGY_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Deposit",
        }) as {
            eventName: "Deposit";
            args: {
                depositor: string;
                token: string;
                amount: bigint;
                ezETHMinted: bigint;
                referralId: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "Depositor",
                value: decoded.depositor,
                type: "address",
            },
            {
                heading: "Token",
                value: decoded.token,
                type: "address",
            },
            {
                heading: "Referral ID",
                value: decoded.referralId.toString(),
                type: "text",
            },
        ];

        const date = TimestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: TokenData } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.token,
                {
                    from: date,
                    to: date,
                }
            );

        const { data: ezETHData } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                "0xbf5495Efe5DB9ce00f80364C8B423567e58d2110",
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                decimals: TokenData?.[0]?.contract_decimals,
                heading: "Deposit Amount",
                value: String(decoded.amount),
                pretty_quote: prettifyCurrency(
                    TokenData?.[0]?.prices?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                TokenData?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: TokenData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: TokenData?.[0]?.contract_ticker_symbol,
            },
            {
                decimals: ezETHData?.[0]?.contract_decimals,
                heading: "ezETH Minted",
                value: String(decoded.ezETHMinted),
                pretty_quote: prettifyCurrency(
                    ezETHData?.[0]?.prices?.[0]?.price *
                        (Number(decoded.ezETHMinted) /
                            Math.pow(
                                10,
                                ezETHData?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: ezETHData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: ezETHData?.[0]?.contract_ticker_symbol,
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Deposit",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details,
            tokens,
        };
    }
);
