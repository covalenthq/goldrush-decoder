import { GoldRushDecoder } from "../../decoder";
import {
    type EventDetails,
    type EventTokens,
    type EventType,
} from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ABI from "./abis/approval.abi.json";
import { TimestampParser } from "../../../../utils/functions";
import { prettifyCurrency } from "@covalenthq/client-sdk";

GoldRushDecoder.fallback(
    "Approval",
    ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const {
            block_signed_at,
            raw_log_data,
            raw_log_topics,
            sender_address,
            sender_logo_url,
            sender_name,
            sender_contract_ticker_symbol,
            sender_contract_decimals,
        } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Approval",
        }) as {
            eventName: "Approval";
            args: {
                owner: string;
                spender: string;
                value: bigint;
            };
        };

        const unlimitedValue: boolean =
            decoded.value.toString() ===
            "115792089237316195423570985008687907853269984665640564039457584007913129639935";

        const tokens: EventTokens = [];
        const details: EventDetails = [
            {
                heading: "Owner",
                value: decoded.owner,
                type: "address",
            },
            {
                heading: "Spender",
                value: decoded.spender,
                type: "address",
            },
        ];

        if (unlimitedValue) {
            details.push({
                heading: "Value",
                value: "Unlimited",
                type: "text",
            });
        } else {
            const date = TimestampParser(block_signed_at, "YYYY-MM-DD");
            const { data } =
                await covalent_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    sender_address,
                    {
                        from: date,
                        to: date,
                    }
                );

            tokens.push({
                heading: "Value",
                value: decoded.value.toString(),
                ticker_symbol: sender_contract_ticker_symbol,
                ticker_logo: sender_logo_url,
                decimals: sender_contract_decimals ?? 18,
                pretty_quote: prettifyCurrency(
                    data?.[0]?.items?.[0]?.price *
                        (Number(decoded.value) /
                            Math.pow(
                                10,
                                data?.[0]?.items?.[0]?.contract_metadata
                                    ?.contract_decimals ?? 18
                            ))
                ),
            });
        }

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Approval",
            protocol: {
                logo: sender_logo_url as string,
                name: sender_name as string,
            },
            details: details,
            tokens: tokens,
        };
    }
);