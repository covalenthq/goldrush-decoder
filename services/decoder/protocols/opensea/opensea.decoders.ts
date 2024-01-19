import { Decoder } from "../../decoder";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import Seaport from "./abis/seaport-1.1.abi.json";
import { TimestampParser } from "../../../../utils/functions";

Decoder.on(
    "opensea:OrderFulfilled",
    ["eth-mainnet"],
    Seaport as Abi,
    async (log, chain_name, covalent_client): Promise<EventType> => {
        const { block_signed_at, raw_log_data, raw_log_topics } = log;

        enum ITEM_TYPE {
            "NATIVE" = 0,
            "ERC20" = 1,
            "ERC721" = 2,
            "ERC1155" = 3,
            "ERC721_WITH_CRITERIA" = 4,
            "ERC1155_WITH_CRITERIA" = 5,
        }

        const { args: decoded } = decodeEventLog({
            abi: Seaport,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "OrderFulfilled",
        }) as {
            eventName: "OrderFulfilled";
            args: {
                offerer: string;
                zone: string;
                orderHash: string;
                recipient: string;
                offer: {
                    itemType: ITEM_TYPE;
                    token: string;
                    identifier: bigint;
                    amount: bigint;
                }[];
                consideration: {
                    itemType: ITEM_TYPE;
                    token: string;
                    identifier: bigint;
                    amount: bigint;
                    recipient: string;
                }[];
            };
        };

        const tokens: EventType["tokens"] = [];
        const nfts: EventType["nfts"] = [];

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
                    const date = TimestampParser(block_signed_at, "YYYY-MM-DD");
                    const { data } =
                        await covalent_client.PricingService.getTokenPrices(
                            chain_name,
                            "USD",
                            token,
                            {
                                from: date,
                                to: date,
                            }
                        );
                    tokens.push({
                        heading: recipient ? `Sent to ${recipient}` : "Offered",
                        value: amount.toString(),
                        decimals:
                            data?.[0]?.items?.[0]?.contract_metadata
                                ?.contract_decimals ?? 18,
                        pretty: data?.[0]?.items?.[0]?.pretty_price,
                        ticker_symbol:
                            data?.[0]?.items?.[0]?.contract_metadata
                                ?.contract_ticker_symbol,
                        ticker_logo:
                            data?.[0]?.items?.[0]?.contract_metadata?.logo_url,
                    });
                    break;
                }
                case ITEM_TYPE.ERC721: {
                    const { data } =
                        await covalent_client.NftService.getNftMetadataForGivenTokenIdForContract(
                            chain_name,
                            token,
                            identifier.toString(),
                            {
                                withUncached: true,
                            }
                        );
                    nfts.push({
                        heading: recipient ? `Sent to ${recipient}` : "Offered",
                        collection_address: data?.items?.[0]?.contract_address,
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
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Basic Order Fulfilled",
            protocol: {
                logo: log.sender_logo_url as string,
                name: log.sender_name as string,
            },
            nfts: nfts,
            tokens: tokens,
        };
    }
);
