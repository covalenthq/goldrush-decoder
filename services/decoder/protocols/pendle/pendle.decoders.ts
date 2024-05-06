import { GoldRushDecoder } from "../../decoder";
import { EventDetails, EventTokens, type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ROUTER_V3_ABI from "./abis/pendle-router-v3.abi.json";
import VEPENDLE_ABI from "./abis/vePendle.abi.json";
import { timestampParser } from "../../../../utils/functions";
import { prettifyCurrency } from "@covalenthq/client-sdk";
const PT_TOKEN_ADDRESS = "0xc69Ad9baB1dEE23F4605a82b3354F8E40d1E5966";
const SY_TOKEN_ADDRESS = "0xAC0047886a985071476a1186bE89222659970d65";
const YT_TOKEN_ADDRESS = "0xfb35Fd0095dD1096b1Ca49AD44d8C5812A201677";
const PENDLE_TOKEN_ADDRESS = "0x808507121B80c02388fAd14726482e061B8da827";

GoldRushDecoder.on(
    "pendle:SwapPtAndToken",
    ["eth-mainnet"],
    ROUTER_V3_ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ROUTER_V3_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "SwapPtAndToken",
        }) as {
            eventName: "SwapPtAndToken";
            args: {
                caller: string;
                market: string;
                token: string;
                receiver: string;
                netPtToAccount: bigint;
                netTokenToAccount: bigint;
                netSyInterm: bigint;
            };
        };

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

        const { data: PtTokenData } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                PT_TOKEN_ADDRESS,
                {
                    from: date,
                    to: date,
                }
            );

        const { data: SyTokenData } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                SY_TOKEN_ADDRESS,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                decimals: TokenData?.[0]?.contract_decimals,
                heading: "Token",
                value: String(TokenData?.[0].prices?.[0]?.price),
                pretty_quote: prettifyCurrency(
                    TokenData?.[0]?.prices?.[0]?.price
                ),
                ticker_logo: TokenData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: TokenData?.[0]?.contract_ticker_symbol,
            },
            {
                decimals: TokenData?.[0]?.contract_decimals,
                heading: "Net Token to Account",
                value: String(decoded.netTokenToAccount),
                pretty_quote: prettifyCurrency(
                    TokenData?.[0]?.prices?.[0]?.price *
                        (Number(decoded.netTokenToAccount) /
                            Math.pow(
                                10,
                                TokenData?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: TokenData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: TokenData?.[0]?.contract_ticker_symbol,
            },
            {
                decimals: PtTokenData?.[0]?.contract_decimals,
                heading: "Net Pt to Account",
                value: String(decoded.netPtToAccount),
                pretty_quote: prettifyCurrency(
                    PtTokenData?.[0]?.prices?.[0]?.price *
                        (Number(decoded.netPtToAccount) /
                            Math.pow(
                                10,
                                PtTokenData?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: PtTokenData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: PtTokenData?.[0]?.contract_ticker_symbol,
            },
            {
                decimals: SyTokenData?.[0]?.contract_decimals,
                heading: "Net Sy Intermediary",
                value: String(decoded.netSyInterm),
                pretty_quote: prettifyCurrency(
                    SyTokenData?.[0]?.prices?.[0]?.price *
                        (Number(decoded.netSyInterm) /
                            Math.pow(
                                10,
                                SyTokenData?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: SyTokenData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: SyTokenData?.[0]?.contract_ticker_symbol,
            },
        ];

        const details: EventDetails = [
            {
                heading: "Caller",
                value: decoded.caller,
                type: "address",
            },
            {
                heading: "Market",
                value: decoded.market,
                type: "address",
            },
            {
                heading: "Receiver",
                value: decoded.receiver,
                type: "address",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "SwapPtAndToken",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details,
            tokens,
            ...(options.raw_logs ? { raw_log: log_event } : {}),
        };
    }
);

GoldRushDecoder.on(
    "pendle:SwapYtAndSy",
    ["eth-mainnet"],
    ROUTER_V3_ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ROUTER_V3_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "SwapYtAndSy",
        }) as {
            eventName: "SwapYtAndSy";
            args: {
                caller: string;
                market: string;
                receiver: string;
                netYtToAccount: bigint;
                netSyToAccount: bigint;
            };
        };

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: YtTokenData } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                YT_TOKEN_ADDRESS,
                {
                    from: date,
                    to: date,
                }
            );

        const { data: SyTokenData } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                SY_TOKEN_ADDRESS,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                decimals: YtTokenData?.[0]?.contract_decimals,
                heading: "Net Yt to Account",
                value: String(decoded.netYtToAccount),
                pretty_quote: prettifyCurrency(
                    YtTokenData?.[0]?.prices?.[0]?.price *
                        (Number(decoded.netYtToAccount) /
                            Math.pow(
                                10,
                                YtTokenData?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: YtTokenData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: YtTokenData?.[0]?.contract_ticker_symbol,
            },
            {
                decimals: SyTokenData?.[0]?.contract_decimals,
                heading: "Net Sy to Account",
                value: String(decoded.netSyToAccount),
                pretty_quote: prettifyCurrency(
                    SyTokenData?.[0]?.prices?.[0]?.price *
                        (Number(decoded.netSyToAccount) /
                            Math.pow(
                                10,
                                SyTokenData?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: SyTokenData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: SyTokenData?.[0]?.contract_ticker_symbol,
            },
        ];

        const details: EventDetails = [
            {
                heading: "Caller",
                value: decoded.caller,
                type: "address",
            },
            {
                heading: "Market",
                value: decoded.market,
                type: "address",
            },
            {
                heading: "Receiver",
                value: decoded.receiver,
                type: "address",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "SwapYtAndSy",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details,
            tokens,
            ...(options.raw_logs ? { raw_log: log_event } : {}),
        };
    }
);

GoldRushDecoder.on(
    "pendle:SwapYtAndToken",
    ["eth-mainnet"],
    ROUTER_V3_ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ROUTER_V3_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "SwapYtAndToken",
        }) as {
            eventName: "SwapYtAndToken";
            args: {
                caller: string;
                market: string;
                token: string;
                receiver: string;
                netYtToAccount: bigint;
                netTokenToAccount: bigint;
                netSyInterm: bigint;
            };
        };

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

        const { data: YtTokenData } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                YT_TOKEN_ADDRESS,
                {
                    from: date,
                    to: date,
                }
            );

        const { data: SyTokenData } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                SY_TOKEN_ADDRESS,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                decimals: TokenData?.[0]?.contract_decimals,
                heading: "Token",
                value: String(TokenData?.[0].prices?.[0]?.price),
                pretty_quote: prettifyCurrency(
                    TokenData?.[0]?.prices?.[0]?.price
                ),
                ticker_logo: TokenData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: TokenData?.[0]?.contract_ticker_symbol,
            },
            {
                decimals: TokenData?.[0]?.contract_decimals,
                heading: "Net Token to Account",
                value: String(decoded.netTokenToAccount),
                pretty_quote: prettifyCurrency(
                    TokenData?.[0]?.prices?.[0]?.price *
                        (Number(decoded.netTokenToAccount) /
                            Math.pow(
                                10,
                                TokenData?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: TokenData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: TokenData?.[0]?.contract_ticker_symbol,
            },
            {
                decimals: YtTokenData?.[0]?.contract_decimals,
                heading: "Net Yt to Account",
                value: String(decoded.netYtToAccount),
                pretty_quote: prettifyCurrency(
                    YtTokenData?.[0]?.prices?.[0]?.price *
                        (Number(decoded.netYtToAccount) /
                            Math.pow(
                                10,
                                YtTokenData?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: YtTokenData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: YtTokenData?.[0]?.contract_ticker_symbol,
            },
            {
                decimals: SyTokenData?.[0]?.contract_decimals,
                heading: "Net Sy Intermediary",
                value: String(decoded.netSyInterm),
                pretty_quote: prettifyCurrency(
                    SyTokenData?.[0]?.prices?.[0]?.price *
                        (Number(decoded.netSyInterm) /
                            Math.pow(
                                10,
                                SyTokenData?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: SyTokenData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: SyTokenData?.[0]?.contract_ticker_symbol,
            },
        ];

        const details: EventDetails = [
            {
                heading: "Caller",
                value: decoded.caller,
                type: "address",
            },
            {
                heading: "Market",
                value: decoded.market,
                type: "address",
            },
            {
                heading: "Receiver",
                value: decoded.receiver,
                type: "address",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "SwapYtAndToken",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details,
            tokens,
            ...(options.raw_logs ? { raw_log: log_event } : {}),
        };
    }
);

GoldRushDecoder.on(
    "pendle:NewLockPosition",
    ["eth-mainnet"],
    VEPENDLE_ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: VEPENDLE_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "NewLockPosition",
        }) as {
            eventName: "NewLockPosition";
            args: {
                user: string;
                amount: bigint;
                expiry: bigint;
            };
        };

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: PendleTokenData } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                PENDLE_TOKEN_ADDRESS,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                decimals: PendleTokenData?.[0]?.contract_decimals,
                heading: "Amount",
                value: String(decoded.amount),
                pretty_quote: prettifyCurrency(
                    PendleTokenData?.[0]?.prices?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                PendleTokenData?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: PendleTokenData?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: PendleTokenData?.[0]?.contract_ticker_symbol,
            },
        ];

        const details: EventDetails = [
            {
                heading: "User",
                value: decoded.user,
                type: "address",
            },
            {
                heading: "Expiry",
                value: timestampParser(new Date(Number(decoded.expiry) * 1000), "descriptive"),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "NewLockPosition",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details,
            tokens,
            ...(options.raw_logs ? { raw_log: log_event } : {}),
        };
    }
);

GoldRushDecoder.on(
    "pendle:BroadcastUserPosition",
    ["eth-mainnet"],
    VEPENDLE_ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: VEPENDLE_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "BroadcastUserPosition",
        }) as {
            eventName: "BroadcastUserPosition";
            args: {
                user: string;
                chainIds: Array<bigint>;
            };
        };

        const details: EventDetails = [
            {
                heading: "User",
                value: decoded.user,
                type: "address",
            },
            {
                heading: "Chain IDs",
                value: decoded.chainIds.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "BroadcastUserPosition",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details,
            ...(options.raw_logs ? { raw_log: log_event } : {}),
        };
    }
);

GoldRushDecoder.on(
    "pendle:BroadcastTotalSupply",
    ["eth-mainnet"],
    VEPENDLE_ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: VEPENDLE_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "BroadcastTotalSupply",
        }) as {
            eventName: "BroadcastTotalSupply";
            args: {
                newTotalSupply: {
                    bias: bigint;
                    slope: bigint;
                };
                chainIds: Array<bigint>;
            };
        };

        const details: EventDetails = [
            {
                heading: "New Total Supply Bias",
                value: decoded.newTotalSupply.bias.toString(),
                type: "text",
            },
            {
                heading: "New Total Supply Slope",
                value: decoded.newTotalSupply.slope.toString(),
                type: "text",
            },
            {
                heading: "Chain IDs",
                value: decoded.chainIds.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "BroadcastTotalSupply",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details,
            ...(options.raw_logs ? { raw_log: log_event } : {}),
        };
    }
);
