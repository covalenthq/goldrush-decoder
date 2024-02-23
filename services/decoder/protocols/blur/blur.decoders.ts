import { GoldRushDecoder } from "../../decoder";
import {
    type EventDetails,
    type EventNFTs,
    type EventTokens,
    type EventType,
} from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ABI from "./abis/blur.abi.json";
import { TimestampParser } from "../../../../utils/functions";
import { prettifyCurrency } from "@covalenthq/client-sdk";

GoldRushDecoder.on(
    "blur:OrdersMatched",
    ["eth-mainnet"],
    ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { block_signed_at, raw_log_data, raw_log_topics } = log_event;

        enum SIDE {
            "BUY" = 0,
            "SELL" = 1,
        }

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "OrdersMatched",
        }) as {
            eventName: "OrdersMatched";
            args: {
                maker: string;
                taker: string;
                sell: {
                    trader: string;
                    side: SIDE;
                    matchingPolicy: string;
                    collection: string;
                    tokenId: bigint;
                    amount: bigint;
                    paymentToken: string;
                    price: bigint;
                    listingTime: bigint;
                    expirationTime: bigint;
                    fees: {
                        rate: number;
                        recipient: string;
                    }[];
                    salt: bigint;
                    extraParams: string;
                };
                sellHash: string;
                buy: {
                    trader: string;
                    side: SIDE;
                    matchingPolicy: string;
                    collection: string;
                    tokenId: bigint;
                    amount: bigint;
                    paymentToken: string;
                    price: bigint;
                    listingTime: bigint;
                    expirationTime: bigint;
                    fees: {
                        rate: number;
                        recipient: string;
                    }[];
                    salt: bigint;
                    extraParams: string;
                };
                buyHash: string;
            }
        };

        const tokens: EventTokens = [];
        const nfts: EventNFTs = [];
        const details: EventDetails = [
            {
                heading: "Maker",
                value: decoded.maker,
                type: "address",
            },
            {
                heading: "Taker",
                value: decoded.taker,
                type: "address",
            },
            {
                heading: "Sell Hash",
                value: decoded.sellHash,
                type: "address",
            },
            {
                heading: "Buy Hash",
                value: decoded.buyHash,
                type: "address",
            },
        ];

        const date = TimestampParser(block_signed_at, "YYYY-MM-DD");
        const { data: tokenPriceData } = await covalent_client.PricingService.getTokenPrices(
            chain_name,
            "USD",
            decoded.sell.collection || decoded.buy.collection,
            {
                from: date,
                to: date,
            }
        );
        tokens.push({
            heading: `Matched to ${decoded.buy.trader}`,
            value: decoded.sell.amount.toString() || decoded.buy.amount.toString(),
            decimals:
                tokenPriceData?.[0]?.items?.[0]?.contract_metadata
                    ?.contract_decimals ?? 18,
            pretty_quote: prettifyCurrency(
                tokenPriceData?.[0]?.items?.[0]?.price *
                (Number(decoded.sell.amount.toString() || decoded.buy.amount.toString()) /
                    Math.pow(
                        10,
                        tokenPriceData?.[0]?.items?.[0]?.contract_metadata
                            ?.contract_decimals ?? 18
                    ))
            ),
            ticker_symbol:
                tokenPriceData?.[0]?.items?.[0]?.contract_metadata
                    ?.contract_ticker_symbol,
            ticker_logo:
                tokenPriceData?.[0]?.items?.[0]?.contract_metadata?.logo_url,
        });

        const { data } =
            await covalent_client.NftService.getNftMetadataForGivenTokenIdForContract(
                chain_name,
                decoded.sell.collection || decoded.buy.collection,
                decoded.sell.tokenId.toString() || decoded.buy.tokenId.toString(),
                {
                    withUncached: true,
                }
            );
        nfts.push({
            heading: `Matched to ${decoded.buy.trader}`,
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

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "OrdersMatched",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: log_event.sender_name as string,
            },
            details: details,
            nfts: nfts,
            tokens: tokens,
        };
    }
);
