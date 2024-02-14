import { GoldRushDecoder } from "../../../decoder";
import type {
    EventDetails,
    EventTokens,
    EventType,
} from "../../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ABI from "./../abis/aave-v3.abi.json";
import { prettifyCurrency } from "@covalenthq/client-sdk";
import { TimestampParser } from "../../../../../utils/functions";

export const LiquidationDecoder = GoldRushDecoder.on(
    "aave-v3:LiquidationCall",
    ["eth-mainnet"],
    ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
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
                title: "Collateral Asset",
                value: decoded.collateralAsset,
                type: "address",
            },
            {
                title: "Debt Asset",
                value: decoded.debtAsset,
                type: "address",
            },
            {
                title: "user",
                value: decoded.user,
                type: "address",
            },
            {
                title: "Liquidator",
                value: decoded.liquidator,
                type: "address",
            },
            {
                title: "Receive A Token",
                value: String(decoded.receiveAToken),
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
                decimals: collateralToken?.[0].contract_decimals,
                heading: "Collateral Amount",
                pretty_quote: prettifyCurrency(
                    collateralToken?.[0]?.prices?.[0].price *
                        (Number(decoded.liquidatedCollateralAmount) /
                            Math.pow(
                                10,
                                collateralToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: collateralToken?.[0].logo_url,
                ticker_symbol: collateralToken?.[0].contract_ticker_symbol,
                value: String(decoded.liquidatedCollateralAmount),
            },
            {
                decimals: debtToken?.[0].contract_decimals,
                heading: "Debt Amount",
                pretty_quote: prettifyCurrency(
                    debtToken?.[0]?.prices?.[0].price *
                        (Number(decoded.debtToCover) /
                            Math.pow(
                                10,
                                debtToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: debtToken?.[0].logo_url,
                ticker_symbol: debtToken?.[0].contract_ticker_symbol,
                value: String(decoded.debtToCover),
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "LiquidationCall",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "AAVE-V3",
            },
            details,
            tokens,
        };
    }
);

export default LiquidationDecoder;
