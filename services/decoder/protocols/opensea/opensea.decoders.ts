import { timestampParser } from "../../../../utils/functions";
import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import {
    type EventDetails,
    type EventNFTs,
    type EventTokens,
    type EventType,
} from "../../decoder.types";
import { seaport11ABI } from "./abis/seaport-1.1.abi";
import { prettifyCurrency } from "@covalenthq/client-sdk";
import { decodeEventLog, type Abi } from "viem";

GoldRushDecoder.on(
    "opensea:OrderFulfilled",
    ["eth-mainnet", "matic-mainnet"],
    seaport11ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const {
            block_signed_at,
            raw_log_data,
            raw_log_topics,
            sender_logo_url,
        } = log_event;

        enum ITEM_TYPE {
            "NATIVE" = 0,
            "ERC20" = 1,
            "ERC721" = 2,
            "ERC1155" = 3,
            "ERC721_WITH_CRITERIA" = 4,
            "ERC1155_WITH_CRITERIA" = 5,
        }

        const { args: decoded } = decodeEventLog({
            abi: seaport11ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "OrderFulfilled",
        });

        const tokens: EventTokens = [];
        const nfts: EventNFTs = [];
        const details: EventDetails = [
            {
                heading: "Offerer",
                value: decoded.offerer,
                type: "address",
            },
            {
                heading: "Recipient",
                value: decoded.recipient,
                type: "address",
            },
            {
                heading: "Order Hash",
                value: decoded.orderHash,
                type: "address",
            },
        ];

        const parseItem = async (
            itemType: ITEM_TYPE,
            token: string,
            identifier: bigint,
            amount: bigint,
            recipient?: string
        ) => {
            switch (itemType) {
                case ITEM_TYPE.NATIVE:
                case ITEM_TYPE.ERC20: {
                    const date = timestampParser(block_signed_at, "YYYY-MM-DD");
                    const { data } =
                        await goldrush_client.PricingService.getTokenPrices(
                            chain_name,
                            "USD",
                            token,
                            {
                                from: date,
                                to: date,
                            }
                        );
                    if (data?.[0]?.items?.[0]?.price) {
                        tokens.push({
                            heading: recipient
                                ? `Sent to ${recipient}`
                                : `Offered to ${decoded.recipient}`,
                            value: amount.toString(),
                            decimals: data?.[0]?.contract_decimals ?? 18,
                            pretty_quote: prettifyCurrency(
                                data?.[0]?.items?.[0]?.price *
                                    (Number(amount) /
                                        Math.pow(
                                            10,
                                            data?.[0]?.items?.[0]
                                                ?.contract_metadata
                                                ?.contract_decimals ?? 18
                                        ))
                            ),
                            ticker_symbol:
                                data?.[0]?.contract_ticker_symbol || null,
                            ticker_logo:
                                data?.[0]?.logo_urls?.token_logo_url || null,
                        });
                    }
                    break;
                }
                case ITEM_TYPE.ERC721: {
                    const { data } =
                        await goldrush_client.NftService.getNftMetadataForGivenTokenIdForContract(
                            chain_name,
                            token,
                            identifier.toString(),
                            {
                                withUncached: true,
                            }
                        );
                    nfts.push({
                        heading: recipient
                            ? `Sent to ${recipient}`
                            : `Offered to ${decoded.recipient}`,
                        collection_address:
                            data?.items?.[0]?.contract_address || null,
                        collection_name:
                            data?.items?.[0]?.nft_data?.external_data?.name ||
                            null,
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
                                data?.items?.[0]?.nft_data?.external_data
                                    ?.image || null,
                        },
                    });
                    break;
                }
            }
        };

        for (const { itemType, token, identifier, amount } of decoded.offer) {
            await parseItem(itemType, token, identifier, amount);
        }
        for (const {
            itemType,
            token,
            identifier,
            amount,
            recipient,
        } of decoded.consideration) {
            await parseItem(itemType, token, identifier, amount, recipient);
        }

        return {
            action: DECODED_ACTION.SALE,
            category: DECODED_EVENT_CATEGORY.NFT,
            name: "Basic Order Fulfilled",
            protocol: {
                logo: sender_logo_url,
                name: "Opensea",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details: details,
            nfts: nfts,
            tokens: tokens,
        };
    }
);
