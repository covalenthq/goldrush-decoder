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

export const FlashloanDecoder = GoldRushDecoder.on(
    "aave-v3:FlashLoan",
    ["eth-mainnet"],
    ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        enum INTEREST_RATE_MODE {
            "STABLE" = 1,
            "VARIABLE" = 2,
        }

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

        const details: EventDetails = [
            {
                title: "Target",
                value: decoded.target,
                type: "address",
            },
            {
                title: "Initiator",
                value: decoded.initiator,
                type: "address",
            },
            {
                title: "Asset",
                value: decoded.asset,
                type: "address",
            },
            {
                title: "Interest Rate Mode",
                value: INTEREST_RATE_MODE[decoded.interestRateMode],
                type: "text",
            },
            {
                title: "Premium",
                value: String(decoded.premium),
                type: "text",
            },
        ];

        const date = TimestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: FlashloanToken } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.asset,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                decimals: FlashloanToken?.[0].contract_decimals,
                heading: "FlashLoan Amount",
                pretty_quote: prettifyCurrency(
                    FlashloanToken?.[0]?.prices?.[0].price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                FlashloanToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: FlashloanToken?.[0].logo_url,
                ticker_symbol: FlashloanToken?.[0].contract_ticker_symbol,
                value: String(decoded.amount),
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "FlashLoan",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "AAVE-V3",
            },
            details,
            tokens,
        };
    }
);

export default FlashloanDecoder;
