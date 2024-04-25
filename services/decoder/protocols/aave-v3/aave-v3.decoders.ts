import { GoldRushDecoder } from "../../decoder";
import type { EventDetails, EventTokens, EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ABI from "./abis/aave-v3.abi.json";
import { prettifyCurrency } from "@covalenthq/client-sdk";
import { TimestampParser } from "../../../../utils/functions";

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
    ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Borrow",
        }) as {
            eventName: "Borrow";
            args: {
                reserve: string;
                user: string;
                onBehalfOf: string;
                amount: bigint;
                interestRateMode: INTEREST_RATE_MODE;
                borrowRate: bigint;
                referralCode: bigint;
            };
        };

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
                heading: "Referal Code",
                value: String(decoded.referralCode),
                type: "text",
            },
        ];

        const date = TimestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: BorrowToken } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.reserve,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                decimals: BorrowToken?.[0]?.contract_decimals,
                heading: "Borrow Amount",
                pretty_quote: prettifyCurrency(
                    BorrowToken?.[0]?.prices?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                BorrowToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: BorrowToken?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: BorrowToken?.[0]?.contract_ticker_symbol,
                value: String(decoded.amount),
            },
        ];

        return {
            action: DECODED_ACTION.BORROW,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Borrow",
            protocol: {
                logo: log_event.sender_logo_url as string,
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
    ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "FlashLoan",
        }) as {
            eventName: "FlashLoan";
            args: {
                target: string;
                initiator: string;
                asset: string;
                amount: bigint;
                interestRateMode: INTEREST_RATE_MODE;
                premium: bigint;
                referralCode: bigint;
            };
        };

        const date = TimestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: FlashLoanToken } =
            await covalent_client.PricingService.getTokenPrices(
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

        const tokens: EventTokens = [
            {
                decimals: FlashLoanToken?.[0]?.contract_decimals,
                heading: "Flash Loan Amount",
                pretty_quote: prettifyCurrency(
                    FlashLoanToken?.[0]?.prices?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                FlashLoanToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: FlashLoanToken?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: FlashLoanToken?.[0]?.contract_ticker_symbol,
                value: String(decoded.amount),
            },
            {
                decimals: FlashLoanToken?.[0]?.contract_decimals,
                heading: "Flash Loan Premium",
                pretty_quote: prettifyCurrency(
                    FlashLoanToken?.[0]?.prices?.[0]?.price *
                        (Number(decoded.premium) /
                            Math.pow(
                                10,
                                FlashLoanToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: FlashLoanToken?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: FlashLoanToken?.[0]?.contract_ticker_symbol,
                value: String(decoded.premium),
            },
        ];

        return {
            action: DECODED_ACTION.FLASHLOAN,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Flash Loan",
            protocol: {
                logo: log_event.sender_logo_url as string,
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
    ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "LiquidationCall",
        }) as {
            eventName: "LiquidationCall";
            args: {
                collateralAsset: string;
                debtAsset: string;
                user: string;
                debtToCover: bigint;
                liquidatedCollateralAmount: bigint;
                liquidator: string;
                receiveAToken: boolean;
            };
        };

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

        const date = TimestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const [{ data: collateralToken }, { data: debtToken }] =
            await Promise.all([
                covalent_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    decoded.collateralAsset,
                    { from: date, to: date }
                ),
                covalent_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    decoded.debtAsset,
                    { from: date, to: date }
                ),
            ]);

        const tokens: EventTokens = [
            {
                decimals: collateralToken?.[0]?.contract_decimals,
                heading: "Collateral Amount",
                pretty_quote: prettifyCurrency(
                    collateralToken?.[0]?.prices?.[0]?.price *
                        (Number(decoded.liquidatedCollateralAmount) /
                            Math.pow(
                                10,
                                collateralToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: collateralToken?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: collateralToken?.[0]?.contract_ticker_symbol,
                value: String(decoded.liquidatedCollateralAmount),
            },
            {
                decimals: debtToken?.[0]?.contract_decimals,
                heading: "Debt Amount",
                pretty_quote: prettifyCurrency(
                    debtToken?.[0]?.prices?.[0]?.price *
                        (Number(decoded.debtToCover) /
                            Math.pow(
                                10,
                                debtToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: debtToken?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: debtToken?.[0]?.contract_ticker_symbol,
                value: String(decoded.debtToCover),
            },
        ];

        return {
            action: DECODED_ACTION.LIQUIDATE,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Liquidation Call",
            protocol: {
                logo: log_event.sender_logo_url as string,
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
    ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Repay",
        }) as {
            eventName: "Repay";
            args: {
                reserve: string;
                user: string;
                repayer: string;
                amount: bigint;
                useATokens: boolean;
            };
        };

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

        const date = TimestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: RepayToken } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.reserve,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                decimals: RepayToken?.[0]?.contract_decimals,
                heading: "Repay Amount",
                pretty_quote: prettifyCurrency(
                    RepayToken?.[0]?.prices?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                RepayToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: RepayToken?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: RepayToken?.[0]?.contract_ticker_symbol,
                value: String(decoded.amount),
            },
        ];

        return {
            action: DECODED_ACTION.REPAY,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Repay",
            protocol: {
                logo: log_event.sender_logo_url as string,
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
    ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Supply",
        }) as {
            eventName: "Supply";
            args: {
                reserve: string;
                user: string;
                onBehalfOf: string;
                amount: bigint;
                referralCode: bigint;
            };
        };

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
                heading: "Referal Code",
                value: String(decoded.referralCode),
                type: "text",
            },
        ];

        const date = TimestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: SupplyToken } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.reserve,
                { from: date, to: date }
            );

        const tokens: EventTokens = [
            {
                decimals: SupplyToken?.[0]?.contract_decimals,
                heading: "Supply Amount",
                pretty_quote: prettifyCurrency(
                    SupplyToken?.[0]?.prices?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                SupplyToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: SupplyToken?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: SupplyToken?.[0]?.contract_ticker_symbol,
                value: String(decoded.amount),
            },
        ];

        return {
            action: DECODED_ACTION.DEPOSIT,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Supply",
            protocol: {
                logo: log_event.sender_logo_url as string,
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
    ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Withdraw",
        }) as {
            eventName: "Withdraw";
            args: {
                reserve: string;
                user: string;
                to: string;
                amount: bigint;
            };
        };

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

        const date = TimestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: RepayToken } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.reserve,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                decimals: RepayToken?.[0]?.contract_decimals,
                heading: "Withdraw Amount",
                pretty_quote: prettifyCurrency(
                    RepayToken?.[0]?.prices?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                RepayToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: RepayToken?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: RepayToken?.[0]?.contract_ticker_symbol,
                value: String(decoded.amount),
            },
        ];

        return {
            action: DECODED_ACTION.WITHDRAW,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Withdraw",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Aave V3",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);
