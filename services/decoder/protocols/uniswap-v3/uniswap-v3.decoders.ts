import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import type { EventDetails, EventTokens } from "../../decoder.types";
import { type EventType } from "../../decoder.types";
import { factoryABI } from "./abis/factory.abi";
import { nonFungiblePositionManagerABI } from "./abis/non-fungible-position-manager.abi";
import { pairABI } from "./abis/pair.abi";
import { timestampParser } from "@covalenthq/client-sdk";
import { decodeEventLog, type Abi } from "viem";

GoldRushDecoder.on(
    "uniswap-v3:PoolCreated",
    ["eth-mainnet"],
    factoryABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: factoryABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "PoolCreated",
        });

        const details: EventDetails = [
            {
                heading: "Token 0",
                value: decoded.token0,
                type: "address",
            },
            {
                heading: "Token 1",
                value: decoded.token1,
                type: "address",
            },
            {
                heading: "Fee",
                value:
                    new Intl.NumberFormat().format(Number(decoded.fee) / 1e4) +
                    "%",
                type: "text",
            },
            {
                heading: "Tick Spacing",
                value: decoded.tickSpacing.toString(),
                type: "text",
            },
            {
                heading: "Pool",
                value: decoded.pool,
                type: "address",
            },
        ];

        const tokens: EventTokens = [];

        if (tx.block_signed_at) {
            const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

            const { data: Token0 } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    decoded.token0,
                    {
                        from: date,
                        to: date,
                    }
                );

            tokens.push({
                heading: "Token 0 Information",
                value: "0",
                decimals: Token0?.[0]?.contract_decimals || null,
                ticker_symbol: Token0?.[0]?.contract_ticker_symbol || null,
                ticker_logo: Token0?.[0]?.logo_urls?.token_logo_url || null,
                pretty_quote: Token0?.[0]?.items?.[0]?.pretty_price || null,
            });

            const { data: Token1 } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    decoded.token1,
                    {
                        from: date,
                        to: date,
                    }
                );

            tokens.push({
                heading: "Token 1 Information",
                value: "0",
                decimals: Token1?.[0]?.contract_decimals || null,
                ticker_symbol: Token1?.[0]?.contract_ticker_symbol || null,
                ticker_logo: Token1?.[0]?.logo_urls?.token_logo_url || null,
                pretty_quote: Token1?.[0]?.items?.[0]?.pretty_price || null,
            });
        }

        return {
            action: DECODED_ACTION.CREATE,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Pool Created",
            protocol: {
                logo: sender_logo_url,
                name: "Uniswap V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:Burn",
    ["eth-mainnet"],
    pairABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: pairABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Burn",
        });

        const details: EventDetails = [
            {
                heading: "Owner",
                value: decoded.owner,
                type: "address",
            },
            {
                heading: "Tick Lower",
                value: decoded.tickLower.toString(),
                type: "text",
            },
            {
                heading: "Tick Upper",
                value: decoded.tickUpper.toString(),
                type: "text",
            },
            {
                heading: "Amount",
                value: decoded.amount.toString(),
                type: "text",
            },
            {
                heading: "Amount 0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "Amount 1",
                value: decoded.amount1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.REMOVE_LIQUIDITY,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Burn",
            protocol: {
                logo: sender_logo_url,
                name: "Uniswap V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:Mint",
    ["eth-mainnet"],
    pairABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: pairABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Mint",
        });

        const details: EventDetails = [
            {
                heading: "Sender",
                value: decoded.sender,
                type: "address",
            },
            {
                heading: "Owner",
                value: decoded.owner,
                type: "address",
            },
            {
                heading: "Tick Lower",
                value: decoded.tickLower.toString(),
                type: "text",
            },
            {
                heading: "Tick Upper",
                value: decoded.tickUpper.toString(),
                type: "text",
            },
            {
                heading: "Amount",
                value: decoded.amount.toString(),
                type: "text",
            },
            {
                heading: "Amount 0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "Amount 1",
                value: decoded.amount1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.MINT,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Mint",
            protocol: {
                logo: sender_logo_url,
                name: "Uniswap V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:Swap",
    ["eth-mainnet"],
    pairABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: pairABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Swap",
        });

        const details: EventDetails = [
            {
                heading: "Sender",
                value: decoded.sender,
                type: "address",
            },
            {
                heading: "Recipient",
                value: decoded.recipient,
                type: "address",
            },
            {
                heading: "Amount 0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "Amount 1",
                value: decoded.amount1.toString(),
                type: "text",
            },
            {
                heading: "sqrtPriceX96",
                value: decoded.sqrtPriceX96.toString(),
                type: "text",
            },
            {
                heading: "Liquidity",
                value: decoded.liquidity.toString(),
                type: "text",
            },
            {
                heading: "Tick",
                value: decoded.tick.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Swap",
            protocol: {
                logo: sender_logo_url,
                name: "Uniswap V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:Collect",
    ["eth-mainnet"],
    pairABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: pairABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Collect",
        });

        const details: EventDetails = [
            {
                heading: "Owner",
                value: decoded.owner,
                type: "address",
            },
            {
                heading: "Recipient",
                value: decoded.recipient,
                type: "address",
            },
            {
                heading: "Tick Lower",
                value: decoded.tickLower.toString(),
                type: "text",
            },
            {
                heading: "Tick Upper",
                value: decoded.tickUpper.toString(),
                type: "text",
            },
            {
                heading: "Amount 0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "Amount 1",
                value: decoded.amount1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.CLAIM_REWARDS,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Collect Fees",
            protocol: {
                logo: sender_logo_url,
                name: "Uniswap V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:Flash",
    ["eth-mainnet"],
    pairABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: pairABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Flash",
        });

        const details: EventDetails = [
            {
                heading: "Sender",
                value: decoded.sender,
                type: "address",
            },
            {
                heading: "Recipient",
                value: decoded.recipient,
                type: "address",
            },
            {
                heading: "Amount 0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "Amount 1",
                value: decoded.amount1.toString(),
                type: "text",
            },
            {
                heading: "Paid 0",
                value: decoded.paid0.toString(),
                type: "text",
            },
            {
                heading: "Paid 1",
                value: decoded.paid1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.FLASHLOAN,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Flash Loan",
            protocol: {
                logo: sender_logo_url,
                name: "Uniswap V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:DecreaseLiquidity",
    ["eth-mainnet"],
    nonFungiblePositionManagerABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: nonFungiblePositionManagerABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "DecreaseLiquidity",
        });

        const details: EventDetails = [
            {
                heading: "Token ID",
                value: decoded.tokenId.toString(),
                type: "text",
            },
            {
                heading: "Liquidity",
                value: decoded.liquidity.toString(),
                type: "text",
            },
            {
                heading: "Amount 0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "Amount 1",
                value: decoded.amount1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.REMOVE_LIQUIDITY,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Decrease Liquidity",
            protocol: {
                logo: sender_logo_url,
                name: "Uniswap V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:IncreaseLiquidity",
    ["eth-mainnet"],
    nonFungiblePositionManagerABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: nonFungiblePositionManagerABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "IncreaseLiquidity",
        });

        const details: EventDetails = [
            {
                heading: "Token ID",
                value: decoded.tokenId.toString(),
                type: "text",
            },
            {
                heading: "Liquidity",
                value: decoded.liquidity.toString(),
                type: "text",
            },
            {
                heading: "Amount 0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "Amount 1",
                value: decoded.amount1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.ADD_LIQUIDITY,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Increase Liquidity",
            protocol: {
                logo: sender_logo_url,
                name: "Uniswap V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:Collect",
    ["eth-mainnet"],
    nonFungiblePositionManagerABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: nonFungiblePositionManagerABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Collect",
        });

        const details: EventDetails = [
            {
                heading: "Token ID",
                value: decoded.tokenId.toString(),
                type: "text",
            },
            {
                heading: "Recipient",
                value: decoded.recipient,
                type: "address",
            },
            {
                heading: "Amount 0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "Amount 1",
                value: decoded.amount1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.CLAIM_REWARDS,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Collect",
            protocol: {
                logo: sender_logo_url,
                name: "Uniswap V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);
