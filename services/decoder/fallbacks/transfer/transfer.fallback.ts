import { currencyToNumber } from "../../../../utils/functions";
import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { type EventDetails, type EventType } from "../../decoder.types";
import { transferERC20ABI } from "./abis/transfer-erc20.abi";
import { transferERC721ABI } from "./abis/transfer-erc721.abi";
import { prettifyCurrency, timestampParser } from "@covalenthq/client-sdk";
import { decodeEventLog, type Abi } from "viem";

GoldRushDecoder.fallback(
    "Transfer",
    transferERC20ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType | null> => {
        const {
            block_signed_at,
            raw_log_data,
            raw_log_topics,
            sender_address,
            sender_name,
            sender_logo_url,
        } = log_event;

        let decoded:
            | {
                  from: string;
                  to: string;
                  value: bigint;
                  tokenId?: never;
              }
            | {
                  from: string;
                  to: string;
                  tokenId: bigint;
                  value?: never;
              };

        try {
            const { args } = decodeEventLog({
                abi: transferERC20ABI,
                topics: raw_log_topics as [],
                data: raw_log_data as `0x${string}`,
                eventName: "Transfer",
            });
            decoded = args;
        } catch (error) {
            const { args } = decodeEventLog({
                abi: transferERC721ABI,
                topics: raw_log_topics as [],
                data: raw_log_data as `0x${string}`,
                eventName: "Transfer",
            });
            decoded = args;
        }

        const details: EventDetails = [
            {
                heading: "From",
                value: decoded.from,
                type: "address",
            },
            {
                heading: "To",
                value: decoded.to,
                type: "address",
            },
        ];

        const parsedData: EventType = {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.TOKEN,
            name: "Transfer",
            protocol: {
                logo: sender_logo_url,
                name: sender_name,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details: details,
        };

        if (decoded.value && sender_address && block_signed_at) {
            const date = timestampParser(block_signed_at, "YYYY-MM-DD");
            const { data } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    sender_address,
                    {
                        from: date,
                        to: date,
                    }
                );

            if (data?.[0]?.items?.[0]?.price) {
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
                        decimals: data?.[0]?.contract_decimals ?? 18,
                        heading: "Token Amount",
                        pretty_quote: pretty_quote,
                        ticker_logo:
                            data?.[0]?.logo_urls?.token_logo_url || null,
                        ticker_symbol: data?.[0]?.contract_ticker_symbol,
                        value: decoded.value.toString(),
                    },
                ];
            }
        } else if (decoded.tokenId && sender_address) {
            const { data } =
                await goldrush_client.NftService.getNftMetadataForGivenTokenIdForContract(
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
                    collection_address:
                        data?.items?.[0]?.contract_address || null,
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
