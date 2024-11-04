import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import type { EventDetails, EventTokens } from "../../decoder.types";
import { type EventType } from "../../decoder.types";
import { pendleRouterV3ABI } from "./abis/pendle-router-v3.abi";
import { vePendleABI } from "./abis/ve-pendle.abi";
import { prettifyCurrency, timestampParser } from "@covalenthq/client-sdk";
import { decodeEventLog, type Abi } from "viem";

const PT_TOKEN_ADDRESS = "0xc69Ad9baB1dEE23F4605a82b3354F8E40d1E5966";
const SY_TOKEN_ADDRESS = "0xAC0047886a985071476a1186bE89222659970d65";
const YT_TOKEN_ADDRESS = "0xfb35Fd0095dD1096b1Ca49AD44d8C5812A201677";
const PENDLE_TOKEN_ADDRESS = "0x808507121B80c02388fAd14726482e061B8da827";

GoldRushDecoder.on(
    "pendle:SwapPtAndToken",
    ["eth-mainnet"],
    pendleRouterV3ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url, sender_name } =
            log_event;

        const { args: decoded } = decodeEventLog({
            abi: pendleRouterV3ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "SwapPtAndToken",
        });

        const tokens: EventTokens = [];

        if (tx.block_signed_at) {
            const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

            const { data: tokenData } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    decoded.token,
                    {
                        from: date,
                        to: date,
                    }
                );

            const { data: PtTokenData } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    PT_TOKEN_ADDRESS,
                    {
                        from: date,
                        to: date,
                    }
                );

            const { data: SyTokenData } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    SY_TOKEN_ADDRESS,
                    {
                        from: date,
                        to: date,
                    }
                );

            if (tokenData?.[0]?.items?.[0]?.price) {
                tokens.push(
                    {
                        decimals: tokenData?.[0]?.contract_decimals || null,
                        heading: "Token",
                        value: String(tokenData?.[0].items?.[0]?.price),
                        pretty_quote: prettifyCurrency(
                            tokenData?.[0]?.items?.[0]?.price
                        ),
                        ticker_logo:
                            tokenData?.[0]?.logo_urls?.token_logo_url || null,
                        ticker_symbol:
                            tokenData?.[0]?.contract_ticker_symbol || null,
                    },
                    {
                        decimals: tokenData?.[0]?.contract_decimals || null,
                        heading: "Net Token to Account",
                        value: String(decoded.netTokenToAccount),
                        pretty_quote: prettifyCurrency(
                            tokenData?.[0]?.items?.[0]?.price *
                                (Number(decoded.netTokenToAccount) /
                                    Math.pow(
                                        10,
                                        tokenData?.[0]?.contract_decimals ?? 0
                                    ))
                        ),
                        ticker_logo:
                            tokenData?.[0]?.logo_urls?.token_logo_url || null,
                        ticker_symbol:
                            tokenData?.[0]?.contract_ticker_symbol || null,
                    }
                );
            }
            if (PtTokenData?.[0]?.items?.[0]?.price) {
                tokens.push({
                    decimals: PtTokenData?.[0]?.contract_decimals || null,
                    heading: "Net Pt to Account",
                    value: String(decoded.netPtToAccount),
                    pretty_quote: prettifyCurrency(
                        PtTokenData?.[0]?.items?.[0]?.price *
                            (Number(decoded.netPtToAccount) /
                                Math.pow(
                                    10,
                                    PtTokenData?.[0]?.contract_decimals ?? 0
                                ))
                    ),
                    ticker_logo:
                        PtTokenData?.[0]?.logo_urls?.token_logo_url || null,
                    ticker_symbol:
                        PtTokenData?.[0]?.contract_ticker_symbol || null,
                });
            }
            if (SyTokenData?.[0]?.items?.[0]?.price) {
                tokens.push({
                    decimals: SyTokenData?.[0]?.contract_decimals || null,
                    heading: "Net Sy Intermediary",
                    value: String(decoded.netSyInterm),
                    pretty_quote: prettifyCurrency(
                        SyTokenData?.[0]?.items?.[0]?.price *
                            (Number(decoded.netSyInterm) /
                                Math.pow(
                                    10,
                                    SyTokenData?.[0]?.contract_decimals ?? 0
                                ))
                    ),
                    ticker_logo:
                        SyTokenData?.[0]?.logo_urls?.token_logo_url || null,
                    ticker_symbol:
                        SyTokenData?.[0]?.contract_ticker_symbol || null,
                });
            }
        }

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
                logo: sender_logo_url,
                name: sender_name,
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
    pendleRouterV3ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url, sender_name } =
            log_event;

        const { args: decoded } = decodeEventLog({
            abi: pendleRouterV3ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "SwapYtAndSy",
        });

        const tokens: EventTokens = [];

        if (tx.block_signed_at) {
            const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

            const { data: YtTokenData } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    YT_TOKEN_ADDRESS,
                    {
                        from: date,
                        to: date,
                    }
                );

            const { data: SyTokenData } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    SY_TOKEN_ADDRESS,
                    {
                        from: date,
                        to: date,
                    }
                );

            if (YtTokenData?.[0]?.items?.[0]?.price) {
                tokens.push({
                    decimals: YtTokenData?.[0]?.contract_decimals || null,
                    heading: "Net Yt to Account",
                    value: String(decoded.netYtToAccount),
                    pretty_quote: prettifyCurrency(
                        YtTokenData?.[0]?.items?.[0]?.price *
                            (Number(decoded.netYtToAccount) /
                                Math.pow(
                                    10,
                                    YtTokenData?.[0]?.contract_decimals ?? 0
                                ))
                    ),
                    ticker_logo:
                        YtTokenData?.[0]?.logo_urls?.token_logo_url || null,
                    ticker_symbol:
                        YtTokenData?.[0]?.contract_ticker_symbol || null,
                });
            }
            if (SyTokenData?.[0]?.items?.[0]?.price) {
                tokens.push({
                    decimals: SyTokenData?.[0]?.contract_decimals || null,
                    heading: "Net Sy to Account",
                    value: String(decoded.netSyToAccount),
                    pretty_quote: prettifyCurrency(
                        SyTokenData?.[0]?.items?.[0]?.price *
                            (Number(decoded.netSyToAccount) /
                                Math.pow(
                                    10,
                                    SyTokenData?.[0]?.contract_decimals ?? 0
                                ))
                    ),
                    ticker_logo:
                        SyTokenData?.[0]?.logo_urls?.token_logo_url || null,
                    ticker_symbol:
                        SyTokenData?.[0]?.contract_ticker_symbol || null,
                });
            }
        }

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
                logo: sender_logo_url,
                name: sender_name,
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
    pendleRouterV3ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url, sender_name } =
            log_event;

        const { args: decoded } = decodeEventLog({
            abi: pendleRouterV3ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "SwapYtAndToken",
        });

        const tokens: EventTokens = [];

        if (tx.block_signed_at) {
            const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

            const { data: TokenData } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    decoded.token,
                    {
                        from: date,
                        to: date,
                    }
                );

            const { data: YtTokenData } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    YT_TOKEN_ADDRESS,
                    {
                        from: date,
                        to: date,
                    }
                );

            const { data: SyTokenData } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    SY_TOKEN_ADDRESS,
                    {
                        from: date,
                        to: date,
                    }
                );

            if (TokenData?.[0]?.items?.[0]?.price) {
                tokens.push(
                    {
                        decimals: TokenData?.[0]?.contract_decimals || null,
                        heading: "Token",
                        value: String(TokenData?.[0].items?.[0]?.price),
                        pretty_quote: prettifyCurrency(
                            TokenData?.[0]?.items?.[0]?.price
                        ),
                        ticker_logo:
                            TokenData?.[0]?.logo_urls?.token_logo_url || null,
                        ticker_symbol:
                            TokenData?.[0]?.contract_ticker_symbol || null,
                    },
                    {
                        decimals: TokenData?.[0]?.contract_decimals || null,
                        heading: "Net Token to Account",
                        value: String(decoded.netTokenToAccount),
                        pretty_quote: prettifyCurrency(
                            TokenData?.[0]?.items?.[0]?.price *
                                (Number(decoded.netTokenToAccount) /
                                    Math.pow(
                                        10,
                                        TokenData?.[0]?.contract_decimals ?? 0
                                    ))
                        ),
                        ticker_logo:
                            TokenData?.[0]?.logo_urls?.token_logo_url || null,
                        ticker_symbol:
                            TokenData?.[0]?.contract_ticker_symbol || null,
                    }
                );
            }
            if (YtTokenData?.[0]?.items?.[0]?.price) {
                tokens.push({
                    decimals: YtTokenData?.[0]?.contract_decimals || null,
                    heading: "Net Yt to Account",
                    value: String(decoded.netYtToAccount),
                    pretty_quote: prettifyCurrency(
                        YtTokenData?.[0]?.items?.[0]?.price *
                            (Number(decoded.netYtToAccount) /
                                Math.pow(
                                    10,
                                    YtTokenData?.[0]?.contract_decimals ?? 0
                                ))
                    ),
                    ticker_logo:
                        YtTokenData?.[0]?.logo_urls?.token_logo_url || null,
                    ticker_symbol:
                        YtTokenData?.[0]?.contract_ticker_symbol || null,
                });
            }
            if (SyTokenData?.[0]?.items?.[0]?.price) {
                tokens.push({
                    decimals: SyTokenData?.[0]?.contract_decimals || null,
                    heading: "Net Sy Intermediary",
                    value: String(decoded.netSyInterm),
                    pretty_quote: prettifyCurrency(
                        SyTokenData?.[0]?.items?.[0]?.price *
                            (Number(decoded.netSyInterm) /
                                Math.pow(
                                    10,
                                    SyTokenData?.[0]?.contract_decimals ?? 0
                                ))
                    ),
                    ticker_logo:
                        SyTokenData?.[0]?.logo_urls?.token_logo_url || null,
                    ticker_symbol:
                        SyTokenData?.[0]?.contract_ticker_symbol || null,
                });
            }
        }

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
                logo: sender_logo_url,
                name: sender_name,
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
    vePendleABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url, sender_name } =
            log_event;

        const { args: decoded } = decodeEventLog({
            abi: vePendleABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "NewLockPosition",
        });

        const tokens: EventTokens = [];

        if (tx.block_signed_at) {
            const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

            const { data: pendleTokenData } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    PENDLE_TOKEN_ADDRESS,
                    {
                        from: date,
                        to: date,
                    }
                );

            if (pendleTokenData?.[0]?.items?.[0]?.price) {
                tokens.push({
                    decimals: pendleTokenData?.[0]?.contract_decimals || null,
                    heading: "Amount",
                    value: String(decoded.amount),
                    pretty_quote: prettifyCurrency(
                        pendleTokenData?.[0]?.items?.[0]?.price *
                            (Number(decoded.amount) /
                                Math.pow(
                                    10,
                                    pendleTokenData?.[0]?.contract_decimals ?? 0
                                ))
                    ),
                    ticker_logo:
                        pendleTokenData?.[0]?.logo_urls?.token_logo_url || null,
                    ticker_symbol:
                        pendleTokenData?.[0]?.contract_ticker_symbol || null,
                });
            }
        }

        const details: EventDetails = [
            {
                heading: "User",
                value: decoded.user,
                type: "address",
            },
            {
                heading: "Expiry",
                value: timestampParser(
                    new Date(Number(decoded.expiry) * 1000),
                    "descriptive"
                ),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "NewLockPosition",
            protocol: {
                logo: sender_logo_url,
                name: sender_name,
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
    vePendleABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url, sender_name } =
            log_event;

        const { args: decoded } = decodeEventLog({
            abi: vePendleABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "BroadcastUserPosition",
        });

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
                logo: sender_logo_url,
                name: sender_name,
            },
            details,
            ...(options.raw_logs ? { raw_log: log_event } : {}),
        };
    }
);

GoldRushDecoder.on(
    "pendle:BroadcastTotalSupply",
    ["eth-mainnet"],
    vePendleABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url, sender_name } =
            log_event;

        const { args: decoded } = decodeEventLog({
            abi: vePendleABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "BroadcastTotalSupply",
        });

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
                logo: sender_logo_url,
                name: sender_name,
            },
            details,
            ...(options.raw_logs ? { raw_log: log_event } : {}),
        };
    }
);
