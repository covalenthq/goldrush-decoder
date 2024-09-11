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
import { blurExchangeABI } from "./abis/blur-exchange.abi";
import { prettifyCurrency } from "@covalenthq/client-sdk";
import { decodeEventLog, type Abi } from "viem";

GoldRushDecoder.on(
    "blur:OrdersMatched",
    ["eth-mainnet"],
    blurExchangeABI as Abi,
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
            sender_name,
        } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: blurExchangeABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "OrdersMatched",
        });

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
            {
                heading: "Sell Fees Rate",
                value: decoded.sell.fees[0].rate.toLocaleString(),
                type: "text",
            },
            {
                heading: "Sell Fees Recipient",
                value: decoded.sell.fees[0].recipient,
                type: "address",
            },
            {
                heading: "Expiration Time",
                value: timestampParser(
                    new Date(Number(decoded.sell.expirationTime) * 1000),
                    "descriptive"
                ),
                type: "text",
            },
            {
                heading: "Listing Time",
                value: timestampParser(
                    new Date(Number(decoded.sell.listingTime) * 1000),
                    "descriptive"
                ),
                type: "text",
            },
            {
                heading: "Extra Params",
                value: decoded.sell.extraParams,
                type: "text",
            },
            {
                heading: "Matching Policy",
                value: decoded.sell.matchingPolicy,
                type: "address",
            },
            {
                heading: "Sell Salt",
                value: decoded.sell.salt.toLocaleString(),
                type: "text",
            },
            {
                heading: "Buy Salt",
                value: decoded.buy.salt.toLocaleString(),
                type: "text",
            },
        ];

        const date = timestampParser(block_signed_at, "YYYY-MM-DD");
        const { data: tokenPriceData } =
            await goldrush_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                decoded.sell.collection,
                {
                    from: date,
                    to: date,
                }
            );
        if (tokenPriceData?.[0]?.items?.[0]?.price) {
            tokens.push({
                heading: `Match Amount`,
                value: decoded.sell.amount.toString(),
                decimals: tokenPriceData?.[0]?.contract_decimals ?? 18,
                pretty_quote: prettifyCurrency(
                    tokenPriceData?.[0]?.items?.[0]?.price *
                        (Number(decoded.sell.amount) /
                            Math.pow(
                                10,
                                tokenPriceData?.[0]?.items?.[0]
                                    ?.contract_metadata?.contract_decimals ?? 18
                            ))
                ),
                ticker_symbol:
                    tokenPriceData?.[0]?.contract_ticker_symbol || null,
                ticker_logo:
                    tokenPriceData?.[0]?.logo_urls?.token_logo_url || null,
            });
        }

        const { data } =
            await goldrush_client.NftService.getNftMetadataForGivenTokenIdForContract(
                chain_name,
                decoded.sell.collection,
                decoded.sell.tokenId.toString(),
                {
                    withUncached: true,
                }
            );
        nfts.push({
            heading: `Matched to ${decoded.buy.trader}`,
            collection_address: data?.items?.[0]?.contract_address || null,
            collection_name:
                data?.items?.[0]?.nft_data?.external_data?.name || null,
            token_identifier:
                data?.items?.[0]?.nft_data?.token_id?.toString() || null,
            images: {
                "1024":
                    data?.items?.[0]?.nft_data?.external_data?.image_1024 ||
                    null,
                "512":
                    data?.items?.[0]?.nft_data?.external_data?.image_512 ||
                    null,
                "256":
                    data?.items?.[0]?.nft_data?.external_data?.image_256 ||
                    null,
                default:
                    data?.items?.[0]?.nft_data?.external_data?.image || null,
            },
        });

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Orders Matched",
            protocol: {
                logo: sender_logo_url,
                name: sender_name,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details: details,
            nfts: nfts,
            tokens: tokens,
        };
    }
);
