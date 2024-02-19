import { prettifyCurrency, type Token } from "@covalenthq/client-sdk";
import { type Abi, decodeEventLog } from "viem";
import { GoldRushDecoder } from "../../decoder";
import { TimestampParser } from "../../../../utils/functions";
import { type EventType } from "../../decoder.types";
import PairABI from "./abis/uniswap-v2.pair.abi.json";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";

GoldRushDecoder.on(
    "uniswap-v2:Swap",
    ["eth-mainnet"],
    PairABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const {
            sender_address: exchange_contract,
            block_signed_at,
            raw_log_data,
            raw_log_topics,
        } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: PairABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Swap",
        }) as {
            eventName: "Swap";
            args: {
                sender: string;
                amount0In: bigint;
                amount1In: bigint;
                amount0Out: bigint;
                amount1Out: bigint;
                to: string;
            };
        };

        let inputToken: Token | null = null,
            outputToken: Token | null = null,
            inputValue: bigint = BigInt(0),
            outputValue: bigint = BigInt(0),
            inputDecimals: number = 0,
            outputDecimals: number = 0;

        const prices: number[] = [];

        const { data } = await covalent_client.XykService.getPoolByAddress(
            chain_name,
            "uniswap_v2",
            exchange_contract
        );
        const tokens = data?.items?.[0];
        if (tokens) {
            const { token_0, token_1 } = tokens;
            if (decoded.amount0In) {
                [inputToken, outputToken, inputValue, outputValue] = [
                    token_0,
                    token_1,
                    decoded.amount0In,
                    decoded.amount1Out,
                ];
            } else {
                [inputToken, outputToken, inputValue, outputValue] = [
                    token_1,
                    token_0,
                    decoded.amount1In,
                    decoded.amount0Out,
                ];
            }

            inputDecimals = +inputToken.contract_decimals;
            outputDecimals = +outputToken.contract_decimals;

            const date = TimestampParser(block_signed_at, "YYYY-MM-DD");
            const pricesData = await Promise.all(
                [inputToken, outputToken].map(
                    ({ contract_address: token_address }) =>
                        covalent_client.PricingService.getTokenPrices(
                            chain_name,
                            "USD",
                            token_address,
                            {
                                from: date,
                                to: date,
                            }
                        )
                )
            );
            pricesData.forEach(({ data }) => {
                const price = data?.[0]?.items;
                if (price?.[0]?.price) {
                    prices.push(price[0].price);
                } else {
                    prices.push(1);
                }
            });
        }

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Swap",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details: [
                {
                    heading: "Sender",
                    type: "address",
                    value: decoded.sender,
                },
                {
                    heading: "To",
                    type: "address",
                    value: decoded.to,
                },
            ],
            tokens: [
                {
                    ticker_logo: inputToken?.logo_url ?? null,
                    ticker_symbol: inputToken?.contract_ticker_symbol ?? null,
                    value: inputValue.toString(),
                    decimals: inputDecimals,
                    pretty_quote: prettifyCurrency(
                        inputToken?.quote_rate ??
                            0 *
                                (Number(inputValue) /
                                    Math.pow(10, inputDecimals))
                    ),
                    heading: "Input",
                },
                {
                    ticker_logo: outputToken?.logo_url ?? null,
                    ticker_symbol: outputToken?.contract_ticker_symbol ?? null,
                    value: outputValue.toString(),
                    decimals: outputDecimals,
                    pretty_quote: prettifyCurrency(
                        outputToken?.quote_rate ??
                            0 *
                                (Number(outputValue) /
                                    Math.pow(10, outputDecimals))
                    ),
                    heading: "Output",
                },
            ],
        };
    }
);

GoldRushDecoder.on(
    "uniswap-v2:Mint",
    ["eth-mainnet"],
    PairABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const {
            sender_address: exchange_contract,
            raw_log_data,
            raw_log_topics,
        } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: PairABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Mint",
        }) as {
            eventName: "Mint";
            args: {
                sender: string;
                amount0: bigint;
                amount1: bigint;
            };
        };

        let token0: Token | null = null,
            token1: Token | null = null,
            value0: bigint = BigInt(0),
            value1: bigint = BigInt(0);

        const { data } = await covalent_client.XykService.getPoolByAddress(
            chain_name,
            "uniswap_v2",
            exchange_contract
        );
        const { token_0, token_1 } = data?.items?.[0];
        if (token_0 && token_1) {
            [token0, token1, value0, value1] = [
                token_0,
                token_1,
                decoded.amount0,
                decoded.amount1,
            ];
        }

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Mint",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details: [
                {
                    heading: "Sender",
                    type: "address",
                    value: decoded.sender,
                },
            ],
            tokens: [
                {
                    ticker_logo: token0?.logo_url ?? null,
                    ticker_symbol: token0?.contract_ticker_symbol ?? null,
                    value: value0.toString(),
                    decimals: +(token0?.contract_decimals ?? 18),
                    pretty_quote: prettifyCurrency(
                        token0?.quote_rate ??
                            0 *
                                (Number(value0) /
                                    Math.pow(
                                        10,
                                        +(token0?.contract_decimals ?? 18)
                                    ))
                    ),
                    heading: "Input",
                },
                {
                    ticker_logo: token1?.logo_url ?? null,
                    ticker_symbol: token1?.contract_ticker_symbol ?? null,
                    value: value1.toString(),
                    decimals: +(token1?.contract_decimals ?? 18),
                    pretty_quote: prettifyCurrency(
                        token1?.quote_rate ??
                            0 *
                                (Number(value1) /
                                    Math.pow(
                                        10,
                                        +(token1?.contract_decimals ?? 18)
                                    ))
                    ),
                    heading: "Output",
                },
            ],
        };
    }
);
