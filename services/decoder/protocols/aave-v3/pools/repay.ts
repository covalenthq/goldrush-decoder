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

export const RepayDecoder = GoldRushDecoder.on(
    "aave-v3:Repay",
    ["eth-mainnet"],
    ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
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
                title: "Repayer",
                value: decoded.repayer,
                type: "address",
            },
            {
                title: "Use A Tokens",
                value: String(decoded.useATokens),
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
                decimals: RepayToken?.[0].contract_decimals,
                heading: "Repay Amount",
                pretty_quote: prettifyCurrency(
                    RepayToken?.[0]?.prices?.[0].price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                RepayToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: RepayToken?.[0].logo_url,
                ticker_symbol: RepayToken?.[0].contract_ticker_symbol,
                value: String(decoded.amount),
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.LENDING,
            name: "Repay",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "AAVE-V3",
            },
            details,
            tokens,
        };
    }
);

export default RepayDecoder;
