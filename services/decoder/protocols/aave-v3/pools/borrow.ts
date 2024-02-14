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

export const BorrowDecoder = GoldRushDecoder.on(
    "aave-v3:Borrow",
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
                referalCode: bigint;
            };
        };

        const details: EventDetails = [
            {
                title: "Reserve",
                value: decoded.reserve,
                type: "address",
            },
            {
                title: "User",
                value: decoded.user,
                type: "address",
            },
            {
                title: "On Behalf Of",
                value: decoded.onBehalfOf,
                type: "address",
            },
            {
                title: "Borrow Rate",
                value: String(decoded.borrowRate),
                type: "text",
            },
            {
                title: "Interest Rate Mode",
                value: INTEREST_RATE_MODE[decoded.interestRateMode],
                type: "text",
            },
            {
                title: "Referal Code",
                value: String(decoded.referalCode),
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
                decimals: BorrowToken?.[0].contract_decimals,
                heading: "Borrow Amount",
                pretty_quote: prettifyCurrency(
                    BorrowToken?.[0]?.prices?.[0].price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                BorrowToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: BorrowToken?.[0].logo_url,
                ticker_symbol: BorrowToken?.[0].contract_ticker_symbol,
                value: String(decoded.amount),
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Borrow",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "AAVE-V3",
            },
            details,
            tokens,
        };
    }
);

export default BorrowDecoder;
