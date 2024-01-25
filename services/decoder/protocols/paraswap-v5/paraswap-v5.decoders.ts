import { Decoder } from "../../decoder";
import {
    type EventTokens,
    type EventDetails,
    type EventType,
} from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import SimpleSwapABI from "./abis/paraswap-v5.simple-swap.abi.json";
import { calculatePrettyBalance } from "@covalenthq/client-sdk";

Decoder.on(
    "paraswap-v5:SwappedV3",
    ["eth-mainnet"],
    SimpleSwapABI as Abi,
    async (log, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log;

        const { args: decoded } = decodeEventLog({
            abi: SimpleSwapABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "SwappedV3",
        }) as {
            eventName: "SwappedV3";
            args: {
                beneficiary: string;
                srcToken: string;
                destToken: string;
                uuid: string;
                partner: string;
                feePercent: bigint;
                initiator: string;
                srcAmount: bigint;
                receivedAmount: bigint;
                expectedAmount: bigint;
            };
        };

        console.log(decoded);

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
                title: "UUID",
                value: decoded.uuid,
            },
            {
                title: "Beneficiary",
                value: decoded.beneficiary,
            },
            {
                title: "Initiator",
                value: decoded.initiator,
            },
            {
                title: "Expected Amount",
                value: calculatePrettyBalance(
                    decoded.expectedAmount,
                    destToken?.[0]?.contract_decimals ?? 0
                ),
            },
        ];

        const tokens: EventTokens = [
            {
                decimals: srcToken?.[0]?.contract_decimals ?? 0,
                heading: "Input",
                pretty: calculatePrettyBalance(
                    decoded.srcAmount,
                    srcToken?.[0]?.contract_decimals ?? 0
                ),
                ticker_logo: srcToken?.[0]?.logo_url ?? null,
                ticker_symbol: srcToken?.[0]?.contract_ticker_symbol ?? null,
                value: decoded.srcAmount.toString(),
            },
            {
                decimals: destToken?.[0]?.contract_decimals ?? 0,
                heading: "Output",
                pretty: calculatePrettyBalance(
                    decoded.receivedAmount,
                    destToken?.[0]?.contract_decimals ?? 0
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
                logo: log.sender_logo_url as string,
                name: log.sender_name as string,
            },
            details: details,
            tokens: tokens,
        };
    }
);
