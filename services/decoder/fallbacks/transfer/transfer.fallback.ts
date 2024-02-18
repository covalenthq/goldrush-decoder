import { GoldRushDecoder } from "../../decoder";
import { type EventDetails, type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ERC20ABI from "./abis/transfer-erc20.abi.json";
import ERC721ABI from "./abis/transfer-erc721.abi.json";
import { TimestampParser } from "../../../../utils/functions";
import { prettifyCurrency } from "@covalenthq/client-sdk";

GoldRushDecoder.fallback(
    "Transfer",
    ERC20ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

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
                abi: ERC20ABI,
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
            decoded = args;
        } catch (error) {
            const { args } = decodeEventLog({
                abi: ERC721ABI,
                topics: raw_log_topics as [],
                data: raw_log_data as `0x${string}`,
                eventName: "Transfer",
            }) as {
                eventName: "Transfer";
                args: {
                    from: string;
                    to: string;
                    tokenId: bigint;
                };
            };
            decoded = args;
        }

        const details: EventDetails = [
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
        ];

        const parsedData: EventType = {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Transfer",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details: details,
        };

        if (decoded.value) {
            const date = TimestampParser(
                log_event.block_signed_at,
                "YYYY-MM-DD"
            );
            const { data } =
                await covalent_client.PricingService.getTokenPrices(
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

            parsedData.tokens = [
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
            ];
        } else if (decoded.tokenId) {
            const { data } =
                await covalent_client.NftService.getNftMetadataForGivenTokenIdForContract(
                    chain_name,
                    log_event.sender_address,
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
