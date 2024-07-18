import { prettifyCurrency } from "@covalenthq/client-sdk";
import { decodeEventLog, type Abi } from "viem";
import { timestampParser } from "../../../../utils/functions";
import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import type { EventDetails, EventTokens } from "../../decoder.types";
import { type EventType } from "../../decoder.types";
import { eigenLayerStrategyManagerABI } from "./abis/eigen-layer-strategy-manager.abi";
import { restakeManagerABI } from "./abis/restake-manager.abi";

GoldRushDecoder.on(
    "renzo:ShareWithdrawalQueued",
    ["eth-mainnet"],
    eigenLayerStrategyManagerABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: eigenLayerStrategyManagerABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "ShareWithdrawalQueued",
        });

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
            action: DECODED_ACTION.WITHDRAW,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "ShareWithdrawalQueued",
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
    "renzo:WithdrawalQueued",
    ["eth-mainnet"],
    eigenLayerStrategyManagerABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: eigenLayerStrategyManagerABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "WithdrawalQueued",
        });

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
            action: DECODED_ACTION.WITHDRAW,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "WithdrawalQueued",
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
    "renzo:WithdrawalCompleted",
    ["eth-mainnet"],
    eigenLayerStrategyManagerABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: eigenLayerStrategyManagerABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "WithdrawalCompleted",
        });

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
            action: DECODED_ACTION.WITHDRAW,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "WithdrawalCompleted",
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
    "renzo:Deposit",
    ["eth-mainnet"],
    restakeManagerABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: restakeManagerABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Deposit",
        });

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

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

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
            action: DECODED_ACTION.DEPOSIT,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Deposit",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);
