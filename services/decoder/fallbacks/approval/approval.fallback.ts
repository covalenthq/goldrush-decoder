import { GoldRushDecoder } from "../../decoder";
import { type EventDetails, type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ERC20ABI from "./abis/approval-erc20.abi.json";
import ERC721ABI from "./abis/approval-erc721.abi.json";
import { currencyToNumber, timestampParser } from "../../../../utils/functions";
import { prettifyCurrency } from "@covalenthq/client-sdk";

GoldRushDecoder.fallback(
    "Approval",
    ERC20ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType | null> => {
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

        let decoded:
            | {
                  owner: string;
                  spender: string;
                  value: bigint;
                  tokenId?: never;
              }
            | {
                  owner: string;
                  spender: string;
                  tokenId: bigint;
                  value?: never;
              };

        try {
            const { args } = decodeEventLog({
                abi: ERC20ABI,
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
            decoded = args;
        } catch (error) {
            const { args } = decodeEventLog({
                abi: ERC721ABI,
                topics: raw_log_topics as [],
                data: raw_log_data as `0x${string}`,
                eventName: "Approval",
            }) as {
                eventName: "Approval";
                args: {
                    owner: string;
                    spender: string;
                    tokenId: bigint;
                };
            };
            decoded = args;
        }

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

        const parsedData: EventType = {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Approval",
            protocol: {
                logo: sender_logo_url as string,
                name: sender_name as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details: details,
        };

        if (decoded.value) {
            const unlimitedValue: boolean =
                decoded.value.toString() ===
                "115792089237316195423570985008687907853269984665640564039457584007913129639935";

            if (unlimitedValue) {
                details.push({
                    heading: "Value",
                    value: "Unlimited",
                    type: "text",
                });
            } else {
                const date = timestampParser(block_signed_at, "YYYY-MM-DD");
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

                const pretty_quote = prettifyCurrency(
                    data?.[0]?.items?.[0]?.price *
                        (Number(decoded.value) /
                            Math.pow(
                                10,
                                data?.[0]?.items?.[0]?.contract_metadata
                                    ?.contract_decimals ?? 18
                            ))
                );

                if (currencyToNumber(pretty_quote) < options.min_usd!) {
                    return null;
                }

                parsedData.tokens = [
                    {
                        heading: "Value",
                        value: decoded.value.toString(),
                        ticker_symbol: sender_contract_ticker_symbol,
                        ticker_logo: sender_logo_url,
                        decimals: sender_contract_decimals ?? 18,
                        pretty_quote: pretty_quote,
                    },
                ];
            }
        } else if (decoded.tokenId) {
            const { data } =
                await covalent_client.NftService.getNftMetadataForGivenTokenIdForContract(
                    chain_name,
                    sender_address,
                    decoded.tokenId.toString(),
                    {
                        withUncached: true,
                    }
                );

            parsedData.nfts = [
                {
                    heading: "NFT Transferred",
                    collection_address: data?.items?.[0]?.contract_address,
                    collection_name:
                        data?.items?.[0]?.nft_data?.external_data?.name || null,
                    token_identifier:
                        data?.items?.[0]?.nft_data?.token_id?.toString() ||
                        null,
                    images: {
                        "1024":
                            data?.items?.[0]?.nft_data?.external_data
                                ?.image_1024 || null,
                        "512":
                            data?.items?.[0]?.nft_data?.external_data
                                ?.image_512 || null,
                        "256":
                            data?.items?.[0]?.nft_data?.external_data
                                ?.image_256 || null,
                        default:
                            data?.items?.[0]?.nft_data?.external_data?.image ||
                            null,
                    },
                },
            ];
        }

        return parsedData;
    }
);
