import { GoldRushDecoder } from "../../decoder";
import type { EventDetails, EventTokens } from "../../decoder.types";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import FactoryABI from "./abis/uniswap-v3.factory.abi.json";
import PairABI from "./abis/uniswap-v3.pair.abi.json";
import PositionManagerABI from "./abis/uniswap-v3.NonfungiblePositionManager.abi.json";
import { TimestampParser } from "../../../../utils/functions";

GoldRushDecoder.on(
    "uniswap-v3:PoolCreated",
    ["eth-mainnet"],
    FactoryABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: FactoryABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "PoolCreated",
        }) as {
            eventName: "PoolCreated";
            args: {
                token0: string;
                token1: string;
                fee: bigint;
                tickSpacing: bigint;
                pool: string;
            };
        };

        const details: EventDetails = [
            {
                heading: "token0",
                value: decoded.token0,
                type: "address",
            },
            {
                heading: "token1",
                value: decoded.token0,
                type: "address",
            },
            {
                heading: "fee",
                value:
                    new Intl.NumberFormat().format(Number(decoded.fee) / 1e4) +
                    "%",
                type: "text",
            },
            {
                heading: "tickSpacing",
                value: decoded.tickSpacing.toString(),
                type: "text",
            },
            {
                heading: "pool",
                value: decoded.pool,
                type: "address",
            },
        ];

        const date = TimestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: Token0 } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.token0,
                {
                    from: date,
                    to: date,
                }
            );

        const { data: Token1 } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.token1,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                heading: "Token 0 Information",
                value: "0",
                decimals: Token0?.[0]?.contract_decimals,
                ticker_symbol: Token0?.[0].contract_ticker_symbol,
                ticker_logo: Token0?.[0]?.logo_url,
                pretty_quote: Token0?.[0]?.prices?.[0]?.pretty_price,
            },
            {
                heading: "Token 1 Information",
                value: "0",
                decimals: Token1?.[0]?.contract_decimals,
                ticker_symbol: Token1?.[0].contract_ticker_symbol,
                ticker_logo: Token1?.[0]?.logo_url,
                pretty_quote: Token1?.[0]?.prices?.[0]?.pretty_price,
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Pool Created",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Uniswap V3",
            },
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:Burn",
    ["eth-mainnet"],
    PairABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: PairABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Burn",
        }) as {
            eventName: "Burn";
            args: {
                owner: string;
                tickLower: bigint;
                tickUpper: bigint;
                amount: bigint;
                amount0: bigint;
                amount1: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "owner",
                value: decoded.owner,
                type: "address",
            },
            {
                heading: "tickLower",
                value: decoded.tickLower.toString(),
                type: "text",
            },
            {
                heading: "tickUpper",
                value: decoded.tickUpper.toString(),
                type: "text",
            },
            {
                heading: "amount",
                value: decoded.amount.toString(),
                type: "text",
            },
            {
                heading: "amount0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "amount1",
                value: decoded.amount1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Burn",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Uniswap V3",
            },
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:Mint",
    ["eth-mainnet"],
    PairABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: PairABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Mint",
        }) as {
            eventName: "Mint";
            args: {
                sender: string;
                owner: string;
                tickLower: bigint;
                tickUpper: bigint;
                amount: bigint;
                amount0: bigint;
                amount1: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "sender",
                value: decoded.sender,
                type: "address",
            },
            {
                heading: "owner",
                value: decoded.owner,
                type: "address",
            },
            {
                heading: "tickLower",
                value: decoded.tickLower.toString(),
                type: "text",
            },
            {
                heading: "tickUpper",
                value: decoded.tickUpper.toString(),
                type: "text",
            },
            {
                heading: "amount",
                value: decoded.amount.toString(),
                type: "text",
            },
            {
                heading: "amount0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "amount1",
                value: decoded.amount1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Mint",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Uniswap V3",
            },
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:Swap",
    ["eth-mainnet"],
    PairABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: PairABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Swap",
        }) as {
            eventName: "Swap";
            args: {
                sender: string;
                recipient: string;
                amount0: bigint;
                amount1: bigint;
                sqrtPriceX96: bigint;
                liquidity: bigint;
                tick: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "sender",
                value: decoded.sender,
                type: "address",
            },
            {
                heading: "recipient",
                value: decoded.recipient,
                type: "address",
            },
            {
                heading: "amount0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "amount1",
                value: decoded.amount1.toString(),
                type: "text",
            },
            {
                heading: "sqrtPriceX96",
                value: decoded.sqrtPriceX96.toString(),
                type: "text",
            },
            {
                heading: "liquidity",
                value: decoded.liquidity.toString(),
                type: "text",
            },
            {
                heading: "tick",
                value: decoded.tick.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Swap",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Uniswap V3",
            },
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:Collect",
    ["eth-mainnet"],
    PairABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: PairABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Collect",
        }) as {
            eventName: "Collect";
            args: {
                owner: string;
                recipient: string;
                tickLower: bigint;
                tickUpper: bigint;
                amount0: bigint;
                amount1: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "owner",
                value: decoded.owner,
                type: "address",
            },
            {
                heading: "recipient",
                value: decoded.recipient,
                type: "address",
            },
            {
                heading: "tickLower",
                value: decoded.tickLower.toString(),
                type: "text",
            },
            {
                heading: "tickUpper",
                value: decoded.tickUpper.toString(),
                type: "text",
            },
            {
                heading: "amount0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "amount1",
                value: decoded.amount1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Collect Fees",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Uniswap V3",
            },
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:Flash",
    ["eth-mainnet"],
    PairABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: PairABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Flash",
        }) as {
            eventName: "Flash";
            args: {
                sender: string;
                recipient: string;
                amount0: bigint;
                amount1: bigint;
                paid0: bigint;
                paid1: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "sender",
                value: decoded.sender,
                type: "address",
            },
            {
                heading: "recipient",
                value: decoded.recipient,
                type: "address",
            },
            {
                heading: "amount0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "amount1",
                value: decoded.amount1.toString(),
                type: "text",
            },
            {
                heading: "paid0",
                value: decoded.paid0.toString(),
                type: "text",
            },
            {
                heading: "paid1",
                value: decoded.paid1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Flash Loan",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Uniswap V3",
            },
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:DecreaseLiquidity",
    ["eth-mainnet"],
    PositionManagerABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: PositionManagerABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "DecreaseLiquidity",
        }) as {
            eventName: "DecreaseLiquidity";
            args: {
                tokenId: bigint;
                liquidity: bigint;
                amount0: bigint;
                amount1: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "tokenId",
                value: decoded.tokenId.toString(),
                type: "text",
            },
            {
                heading: "liquidity",
                value: decoded.liquidity.toString(),
                type: "text",
            },
            {
                heading: "amount0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "amount1",
                value: decoded.amount1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Decrease Liquidity",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Uniswap V3",
            },
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:IncreaseLiquidity",
    ["eth-mainnet"],
    PositionManagerABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: PositionManagerABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "IncreaseLiquidity",
        }) as {
            eventName: "IncreaseLiquidity";
            args: {
                tokenId: bigint;
                liquidity: bigint;
                amount0: bigint;
                amount1: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "tokenId",
                value: decoded.tokenId.toString(),
                type: "text",
            },
            {
                heading: "liquidity",
                value: decoded.liquidity.toString(),
                type: "text",
            },
            {
                heading: "amount0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "amount1",
                value: decoded.amount1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Increase Liquidity",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Uniswap V3",
            },
            details,
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v3:Collect",
    ["eth-mainnet"],
    PositionManagerABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: PositionManagerABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Collect",
        }) as {
            eventName: "Collect";
            args: {
                tokenId: bigint;
                recipient: string;
                amount0: bigint;
                amount1: bigint;
            };
        };

        const details: EventDetails = [
            {
                heading: "tokenId",
                value: decoded.tokenId.toString(),
                type: "text",
            },
            {
                heading: "recipient",
                value: decoded.recipient,
                type: "address",
            },
            {
                heading: "amount0",
                value: decoded.amount0.toString(),
                type: "text",
            },
            {
                heading: "amount1",
                value: decoded.amount1.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Collect",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Uniswap V3",
            },
            details,
        };
    }
);
