import { timestampParser } from "../../../../utils/functions";
import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import type { EventDetails, EventTokens, EventType } from "../../decoder.types";
import { aaveV3ABI } from "./abis/aave-v3.abi";
import { prettifyCurrency } from "@covalenthq/client-sdk";
import { decodeEventLog, type Abi } from "viem";

enum INTEREST_RATE_MODE {
    "None" = 0,
    "Stable" = 1,
    "Variable" = 2,
}

GoldRushDecoder.on(
    "aave-v3:Borrow",
    [
        "eth-mainnet",
        "avalanche-mainnet",
        "arbitrum-mainnet",
        "optimism-mainnet",
        "matic-mainnet",
        "metis-mainnet",
        "base-mainnet",
        "bsc-mainnet",
    ],
    aaveV3ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: aaveV3ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Borrow",
        });

        const details: EventDetails = [
            {
                heading: "Reserve",
                value: decoded.reserve,
                type: "address",
            },
            {
                heading: "User",
                value: decoded.user,
                type: "address",
            },
            {
                heading: "On Behalf Of",
                value: decoded.onBehalfOf,
                type: "address",
            },
            {
                heading: "Borrow Rate",
                value:
                    new Intl.NumberFormat().format(
                        (Number(decoded.borrowRate) / 1e27) * 100
                    ) + " %",
                type: "text",
            },
            {
                heading: "Interest Rate Mode",
                value: INTEREST_RATE_MODE[decoded.interestRateMode],
                type: "text",
            },
            {
                heading: "Referral Code",
                value: String(decoded.referralCode),
                type: "text",
            },
        ];

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: BorrowToken } =
            await goldrush_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.reserve,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [];
        if (BorrowToken?.[0]?.items?.[0]?.price) {
            tokens.push({
                decimals: BorrowToken?.[0]?.contract_decimals || null,
                heading: "Borrow Amount",
                pretty_quote: prettifyCurrency(
                    BorrowToken?.[0]?.items?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                BorrowToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo:
                    BorrowToken?.[0]?.logo_urls?.token_logo_url || null,
                ticker_symbol: BorrowToken?.[0]?.contract_ticker_symbol || null,
                value: String(decoded.amount),
            });
        }

        return {
            action: DECODED_ACTION.BORROW,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Borrow",
            protocol: {
                logo: sender_logo_url,
                name: "Aave V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "aave-v3:Supply",
    [
        "eth-mainnet",
        "avalanche-mainnet",
        "arbitrum-mainnet",
        "optimism-mainnet",
        "matic-mainnet",
        "metis-mainnet",
        "base-mainnet",
        "bsc-mainnet",
    ],
    aaveV3ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: aaveV3ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Supply",
        });

        const details: EventDetails = [
            {
                heading: "Reserve",
                value: decoded.reserve,
                type: "address",
            },
            {
                heading: "User",
                value: decoded.user,
                type: "address",
            },
            {
                heading: "On Behalf Of",
                value: decoded.onBehalfOf,
                type: "address",
            },
            {
                heading: "Referral Code",
                value: String(decoded.referralCode),
                type: "text",
            },
        ];

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: SupplyToken } =
            await goldrush_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.reserve,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [];
        if (SupplyToken?.[0]?.items?.[0]?.price) {
            tokens.push({
                decimals: SupplyToken?.[0]?.contract_decimals || null,
                heading: "Supply Amount",
                pretty_quote: prettifyCurrency(
                    SupplyToken?.[0]?.items?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                SupplyToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo:
                    SupplyToken?.[0]?.logo_urls?.token_logo_url || null,
                ticker_symbol: SupplyToken?.[0]?.contract_ticker_symbol || null,
                value: String(decoded.amount),
            });
        }

        return {
            action: DECODED_ACTION.DEPOSIT,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Supply",
            protocol: {
                logo: sender_logo_url,
                name: "Aave V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "aave-v3:Repay",
    [
        "eth-mainnet",
        "avalanche-mainnet",
        "arbitrum-mainnet",
        "optimism-mainnet",
        "matic-mainnet",
        "metis-mainnet",
        "base-mainnet",
        "bsc-mainnet",
    ],
    aaveV3ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: aaveV3ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Repay",
        });

        const details: EventDetails = [
            {
                heading: "Reserve",
                value: decoded.reserve,
                type: "address",
            },
            {
                heading: "User",
                value: decoded.user,
                type: "address",
            },
            {
                heading: "Repayer",
                value: decoded.repayer,
                type: "address",
            },
            {
                heading: "Use A Tokens",
                value: decoded.useATokens ? "Yes" : "No",
                type: "text",
            },
        ];

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: RepayToken } =
            await goldrush_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.reserve,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [];
        if (RepayToken?.[0]?.items?.[0]?.price) {
            tokens.push({
                decimals: RepayToken?.[0]?.contract_decimals || null,
                heading: "Repay Amount",
                pretty_quote: prettifyCurrency(
                    RepayToken?.[0]?.items?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                RepayToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: RepayToken?.[0]?.logo_urls?.token_logo_url || null,
                ticker_symbol: RepayToken?.[0]?.contract_ticker_symbol || null,
                value: String(decoded.amount),
            });
        }

        return {
            action: DECODED_ACTION.REPAY,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Repay",
            protocol: {
                logo: sender_logo_url,
                name: "Aave V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "aave-v3:Withdraw",
    [
        "eth-mainnet",
        "avalanche-mainnet",
        "arbitrum-mainnet",
        "optimism-mainnet",
        "matic-mainnet",
        "metis-mainnet",
        "base-mainnet",
        "bsc-mainnet",
    ],
    aaveV3ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: aaveV3ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Withdraw",
        });

        const details: EventDetails = [
            {
                heading: "Reserve",
                value: decoded.reserve,
                type: "address",
            },
            {
                heading: "User",
                value: decoded.user,
                type: "address",
            },
            {
                heading: "To",
                value: decoded.to,
                type: "address",
            },
        ];

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: RepayToken } =
            await goldrush_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.reserve,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [];
        if (RepayToken?.[0]?.items?.[0]?.price) {
            tokens.push({
                decimals: RepayToken?.[0]?.contract_decimals || null,
                heading: "Withdraw Amount",
                pretty_quote: prettifyCurrency(
                    RepayToken?.[0]?.items?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                RepayToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: RepayToken?.[0]?.logo_urls?.token_logo_url || null,
                ticker_symbol: RepayToken?.[0]?.contract_ticker_symbol || null,
                value: String(decoded.amount),
            });
        }

        return {
            action: DECODED_ACTION.WITHDRAW,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Withdraw",
            protocol: {
                logo: sender_logo_url,
                name: "Aave V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "aave-v3:FlashLoan",
    [
        "eth-mainnet",
        "avalanche-mainnet",
        "arbitrum-mainnet",
        "optimism-mainnet",
        "matic-mainnet",
        "metis-mainnet",
        "base-mainnet",
        "bsc-mainnet",
    ],
    aaveV3ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: aaveV3ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "FlashLoan",
        });

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: FlashLoanToken } =
            await goldrush_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.asset,
                {
                    from: date,
                    to: date,
                }
            );

        const details: EventDetails = [
            {
                heading: "Target",
                value: decoded.target,
                type: "address",
            },
            {
                heading: "Initiator",
                value: decoded.initiator,
                type: "address",
            },
            {
                heading: "Asset",
                value: decoded.asset,
                type: "address",
            },
            {
                heading: "Interest Rate Mode",
                value: INTEREST_RATE_MODE[decoded.interestRateMode],
                type: "text",
            },
        ];

        const tokens: EventTokens = [];
        if (FlashLoanToken?.[0]?.items?.[0]?.price) {
            tokens.push(
                {
                    decimals: FlashLoanToken?.[0]?.contract_decimals || null,
                    heading: "Flash Loan Amount",
                    pretty_quote: prettifyCurrency(
                        FlashLoanToken?.[0]?.items?.[0]?.price *
                            (Number(decoded.amount) /
                                Math.pow(
                                    10,
                                    FlashLoanToken?.[0]?.contract_decimals ?? 0
                                ))
                    ),
                    ticker_logo:
                        FlashLoanToken?.[0]?.logo_urls?.token_logo_url || null,
                    ticker_symbol:
                        FlashLoanToken?.[0]?.contract_ticker_symbol || null,
                    value: String(decoded.amount),
                },
                {
                    decimals: FlashLoanToken?.[0]?.contract_decimals || null,
                    heading: "Flash Loan Premium",
                    pretty_quote: prettifyCurrency(
                        FlashLoanToken?.[0]?.items?.[0]?.price *
                            (Number(decoded.premium) /
                                Math.pow(
                                    10,
                                    FlashLoanToken?.[0]?.contract_decimals ?? 0
                                ))
                    ),
                    ticker_logo:
                        FlashLoanToken?.[0]?.logo_urls?.token_logo_url || null,
                    ticker_symbol:
                        FlashLoanToken?.[0]?.contract_ticker_symbol || null,
                    value: String(decoded.premium),
                }
            );
        }

        return {
            action: DECODED_ACTION.FLASHLOAN,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Flash Loan",
            protocol: {
                logo: sender_logo_url,
                name: "Aave V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "aave-v3:LiquidationCall",
    [
        "eth-mainnet",
        "avalanche-mainnet",
        "arbitrum-mainnet",
        "optimism-mainnet",
        "matic-mainnet",
        "metis-mainnet",
        "base-mainnet",
        "bsc-mainnet",
    ],
    aaveV3ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: aaveV3ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "LiquidationCall",
        });

        const details: EventDetails = [
            {
                heading: "Collateral Asset",
                value: decoded.collateralAsset,
                type: "address",
            },
            {
                heading: "Debt Asset",
                value: decoded.debtAsset,
                type: "address",
            },
            {
                heading: "User",
                value: decoded.user,
                type: "address",
            },
            {
                heading: "Liquidator",
                value: decoded.liquidator,
                type: "address",
            },
            {
                heading: "Receive A Token",
                value: decoded.receiveAToken ? "Yes" : "No",
                type: "text",
            },
        ];

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const [{ data: collateralToken }, { data: debtToken }] =
            await Promise.all([
                goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    decoded.collateralAsset,
                    {
                        from: date,
                        to: date,
                    }
                ),
                goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    decoded.debtAsset,
                    {
                        from: date,
                        to: date,
                    }
                ),
            ]);

        const tokens: EventTokens = [];
        if (collateralToken?.[0]?.items?.[0]?.price) {
            tokens.push({
                decimals: collateralToken?.[0]?.contract_decimals || null,
                heading: "Collateral Amount",
                pretty_quote: prettifyCurrency(
                    collateralToken?.[0]?.items?.[0]?.price *
                        (Number(decoded.liquidatedCollateralAmount) /
                            Math.pow(
                                10,
                                collateralToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo:
                    collateralToken?.[0]?.logo_urls?.token_logo_url || null,
                ticker_symbol:
                    collateralToken?.[0]?.contract_ticker_symbol || null,
                value: String(decoded.liquidatedCollateralAmount),
            });
        }
        if (debtToken?.[0]?.items?.[0]?.price) {
            tokens.push({
                decimals: debtToken?.[0]?.contract_decimals || null,
                heading: "Debt Amount",
                pretty_quote: prettifyCurrency(
                    debtToken?.[0]?.items?.[0]?.price *
                        (Number(decoded.debtToCover) /
                            Math.pow(
                                10,
                                debtToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: debtToken?.[0]?.logo_urls?.token_logo_url || null,
                ticker_symbol: debtToken?.[0]?.contract_ticker_symbol || null,
                value: String(decoded.debtToCover),
            });
        }

        return {
            action: DECODED_ACTION.LIQUIDATE,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Liquidation Call",
            protocol: {
                logo: sender_logo_url,
                name: "Aave V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);
