import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import {
    type EventDetails,
    type EventTokens,
    type EventType,
} from "../../decoder.types";
import { simpleSwapABI } from "./abis/simple-swap.abi";
import {
    calculatePrettyBalance,
    prettifyCurrency,
} from "@covalenthq/client-sdk";
import { decodeEventLog, type Abi } from "viem";

GoldRushDecoder.on(
    "paraswap-v5:SwappedV3",
    ["eth-mainnet", "matic-mainnet", "avalanche-mainnet"],
    simpleSwapABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: simpleSwapABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "SwappedV3",
        });

        const [{ data: srcToken }, { data: destToken }] = await Promise.all(
            [decoded.srcToken, decoded.destToken].map((address) => {
                return covalent_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    address
                );
            })
        );

        const details: EventDetails = [
            {
                heading: "UUID",
                value: decoded.uuid,
                type: "address",
            },
            {
                heading: "Beneficiary",
                value: decoded.beneficiary,
                type: "address",
            },
            {
                heading: "Initiator",
                value: decoded.initiator,
                type: "address",
            },
            {
                heading: "Expected Amount",
                value: calculatePrettyBalance(
                    decoded.expectedAmount,
                    destToken?.[0]?.contract_decimals ?? 0
                ),
                type: "text",
            },
        ];

        const tokens: EventTokens = [
            {
                decimals: srcToken?.[0]?.contract_decimals ?? 0,
                heading: "Input",
                pretty_quote: prettifyCurrency(
                    srcToken?.[0]?.prices?.[0].price *
                        (Number(decoded.srcAmount) /
                            Math.pow(10, srcToken?.[0]?.contract_decimals ?? 0))
                ),
                ticker_logo: srcToken?.[0]?.logo_url ?? null,
                ticker_symbol: srcToken?.[0]?.contract_ticker_symbol ?? null,
                value: decoded.srcAmount.toString(),
            },
            {
                decimals: destToken?.[0]?.contract_decimals ?? 0,
                heading: "Output",
                pretty_quote: prettifyCurrency(
                    destToken?.[0]?.prices?.[0].price *
                        (Number(decoded.receivedAmount) /
                            Math.pow(
                                10,
                                destToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: destToken?.[0]?.logo_url ?? null,
                ticker_symbol: destToken?.[0]?.contract_ticker_symbol ?? null,
                value: decoded.receivedAmount.toString(),
            },
        ];

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Swap V3",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Paraswap V5",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details: details,
            tokens: tokens,
        };
    }
);
