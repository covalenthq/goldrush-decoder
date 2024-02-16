import { GoldRushDecoder } from "../../decoder";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ABI from "./abis/transfer.abi.json";
import { TimestampParser } from "../../../../utils/functions";
import { prettifyCurrency } from "@covalenthq/client-sdk";

GoldRushDecoder.fallback(
    "Transfer",
    ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Transfer",
        }) as {
            eventName: "Transfer";
            args: {
                from: string;
                to: string;
                value: bigint;
            };
        };

        const date = TimestampParser(log_event.block_signed_at, "YYYY-MM-DD");
        const { data } = await covalent_client.PricingService.getTokenPrices(
            chain_name,
            "USD",
            log_event.sender_address,
            {
                from: date,
                to: date,
            }
        );

        const pretty_quote =
            data?.[0]?.items?.[0]?.price *
            (Number(decoded.value) /
                Math.pow(
                    10,
                    data?.[0]?.items?.[0]?.contract_metadata
                        ?.contract_decimals ?? 18
                ));

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Transfer",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details: [
                {
                    title: "From",
                    value: decoded.from,
                    type: "address",
                },
                {
                    title: "To",
                    value: decoded.to,
                    type: "address",
                },
            ],
            tokens: [
                {
                    decimals:
                        data?.[0]?.items?.[0]?.contract_metadata
                            ?.contract_decimals ?? 18,
                    heading: "Token Amount",
                    pretty_quote: pretty_quote
                        ? prettifyCurrency(pretty_quote)
                        : "",
                    ticker_logo:
                        data?.[0]?.items?.[0]?.contract_metadata?.logo_url,
                    ticker_symbol:
                        data?.[0]?.items?.[0]?.contract_metadata
                            ?.contract_ticker_symbol,
                    value: decoded.value.toString(),
                },
            ],
        };
    }
);
