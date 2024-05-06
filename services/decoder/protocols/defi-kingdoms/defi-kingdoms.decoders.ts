import { GoldRushDecoder } from "../../decoder";
import type { EventDetails, EventNFTs, EventTokens } from "../../decoder.types";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import PetABI from "./abis/defi-kingdoms.pets.abi.json";
import HERO_AUCTION_ABI from "./abis/defi-kingdoms.hero-auction.abi.json";
import { timestampParser, isNullAddress } from "../../../../utils/functions";
import { prettifyCurrency } from "@covalenthq/client-sdk";

GoldRushDecoder.on(
    "defi-kingdoms:PetFed",
    ["defi-kingdoms-mainnet"],
    PetABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: PetABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "PetFed",
        }) as {
            eventName: "PetFed";
            args: {
                fedBy: string;
                petId: bigint;
                foodType: bigint;
                hungryAt: bigint;
            };
        };

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: FoodToken } =
            await covalent_client.PricingService.getTokenPrices(
                "defi-kingdoms-mainnet",
                "USD",
                Number(decoded.foodType) == 1
                    ? "0x8Df3fFa5a677ba9737CE8Afcb8dd15Bd74085adD"
                    : "0xAcDa84fAb3d3cdB38078b04901a26c103C37E7F4",
                {
                    from: date,
                    to: date,
                }
            );

        const { data: PetNFT } =
            await covalent_client.NftService.getNftMetadataForGivenTokenIdForContract(
                chain_name,
                // * INFO: Hero NFT Contract Address
                "0x1990F87d6BC9D9385917E3EDa0A7674411C3Cd7F",
                decoded.petId.toString(),
                {
                    withUncached: true,
                }
            );
    
        const tokens: EventTokens = [
            {
                decimals: FoodToken?.[0]?.contract_decimals,
                heading: "Food Type",
                value: "1",
                pretty_quote: prettifyCurrency(
                    FoodToken?.[0]?.prices?.[0]?.price *
                        (Number(decoded.foodType) /
                            Math.pow(
                                10,
                                FoodToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: FoodToken?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: FoodToken?.[0]?.contract_ticker_symbol,
            },
        ];

        const nfts: EventNFTs = [
            {
                heading: `Pet ID: ${decoded.petId.toString()}`,
                collection_address: PetNFT?.items?.[0]?.contract_address,
                collection_name:
                    PetNFT?.items?.[0]?.nft_data?.external_data?.name || null,
                token_identifier: decoded.petId.toString(),
                images: {
                    default:
                        PetNFT?.items?.[0]?.nft_data?.external_data?.image ||
                        null,
                    256:
                        PetNFT?.items?.[0]?.nft_data?.external_data
                            ?.image_256 || null,
                    512:
                        PetNFT?.items?.[0]?.nft_data?.external_data
                            ?.image_512 || null,
                    1024:
                        PetNFT?.items?.[0]?.nft_data?.external_data
                            ?.image_1024 || null,
                },
            },
        ];

        const details: EventDetails = [
            {
                heading: "Fed By",
                value: decoded.fedBy,
                type: "address",
            },
            {
                heading: "Hungry At",
                value: timestampParser(
                    new Date(Number(decoded.hungryAt) * 1000),
                    "descriptive"
                ),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.GAMING,
            name: "Pet Fed",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "DeFi Kingdoms",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            nfts,
            tokens
        };
    }
);

GoldRushDecoder.on(
    "defi-kingdoms:AuctionCreated",
    ["defi-kingdoms-mainnet"],
    HERO_AUCTION_ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: HERO_AUCTION_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "AuctionCreated",
        }) as {
            eventName: "AuctionCreated";
            args: {
                auctionId: bigint;
                owner: string;
                tokenId: bigint;
                startingPrice: bigint;
                endingPrice: bigint;
                duration: bigint;
                winner: string;
            };
        };

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        // * INFO: Fetching Jewel Token Price from Avalanche Mainnet as it is a native token on Defi Kingdoms

        const { data: JewelToken } =
            await covalent_client.PricingService.getTokenPrices(
                "avalanche-mainnet",
                "USD",
                "0x997ddaa07d716995de90577c123db411584e5e46",
                {
                    from: date,
                    to: date,
                }
            );

        const { data: HeroNFT } =
            await covalent_client.NftService.getNftMetadataForGivenTokenIdForContract(
                chain_name,
                // * INFO: Hero NFT Contract Address
                "0xEb9B61B145D6489Be575D3603F4a704810e143dF",
                decoded.tokenId.toString(),
                {
                    withUncached: true,
                }
            );

        const nfts: EventNFTs = [
            {
                heading: `Auction Created`,
                collection_address: HeroNFT?.items?.[0]?.contract_address,
                collection_name:
                    HeroNFT?.items?.[0]?.nft_data?.external_data?.name || null,
                token_identifier: decoded.tokenId.toString(),
                images: {
                    default:
                        HeroNFT?.items?.[0]?.nft_data?.external_data?.image ||
                        null,
                    256:
                        HeroNFT?.items?.[0]?.nft_data?.external_data
                            ?.image_256 || null,
                    512:
                        HeroNFT?.items?.[0]?.nft_data?.external_data
                            ?.image_512 || null,
                    1024:
                        HeroNFT?.items?.[0]?.nft_data?.external_data
                            ?.image_1024 || null,
                },
            },
        ];

        const tokens: EventTokens = [
            {
                decimals: JewelToken?.[0]?.contract_decimals,
                heading: "Starting Price",
                value: String(decoded.startingPrice),
                pretty_quote: prettifyCurrency(
                    JewelToken?.[0]?.prices?.[0]?.price *
                        (Number(decoded.startingPrice) /
                            Math.pow(
                                10,
                                JewelToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: JewelToken?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: JewelToken?.[0]?.contract_ticker_symbol,
            },
            {
                decimals: JewelToken?.[0]?.contract_decimals,
                heading: "Ending Price",
                value: String(decoded.endingPrice),
                pretty_quote: prettifyCurrency(
                    JewelToken?.[0]?.prices?.[0]?.price *
                        (Number(decoded.endingPrice) /
                            Math.pow(
                                10,
                                JewelToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: JewelToken?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: JewelToken?.[0]?.contract_ticker_symbol,
            },
        ];

        const details: EventDetails = [
            {
                heading: "Auction ID",
                value: decoded.auctionId.toString(),
                type: "text",
            },
            {
                heading: "Owner",
                value: decoded.owner.toString(),
                type: "address",
            },
            {
                heading: "Token ID",
                value: decoded.tokenId.toString(),
                type: "text",
            },
            {
                heading: "Duration",
                value: decoded.duration.toString() + " seconds",
                type: "text",
            },
            {
                heading: "Winner",
                value: !isNullAddress(decoded.winner)
                    ? decoded.winner
                    : "No winner",
                type: !isNullAddress(decoded.winner) ? "address" : "text",
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.GAMING,
            name: "Auction Created",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "DeFi Kingdoms",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
            nfts,
        };
    }
);

GoldRushDecoder.on(
    "defi-kingdoms:AuctionCancelled",
    ["defi-kingdoms-mainnet"],
    HERO_AUCTION_ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: HERO_AUCTION_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "AuctionCancelled",
        }) as {
            eventName: "AuctionCancelled";
            args: {
                auctionId: bigint;
                tokenId: bigint;
            };
        };

        const { data: HeroNFT } =
            await covalent_client.NftService.getNftMetadataForGivenTokenIdForContract(
                chain_name,
                "0xEb9B61B145D6489Be575D3603F4a704810e143dF", // Hero NFT Contract Address
                decoded.tokenId.toString(),
                {
                    withUncached: true,
                }
            );

        const nfts: EventNFTs = [
            {
                heading: `Auction Cancelled`,
                collection_address: HeroNFT?.items?.[0]?.contract_address,
                collection_name:
                    HeroNFT?.items?.[0]?.nft_data?.external_data?.name || null,
                token_identifier: decoded.tokenId.toString(),
                images: {
                    default:
                        HeroNFT?.items?.[0]?.nft_data?.external_data?.image ||
                        null,
                    256:
                        HeroNFT?.items?.[0]?.nft_data?.external_data
                            ?.image_256 || null,
                    512:
                        HeroNFT?.items?.[0]?.nft_data?.external_data
                            ?.image_512 || null,
                    1024:
                        HeroNFT?.items?.[0]?.nft_data?.external_data
                            ?.image_1024 || null,
                },
            },
        ];

        const details: EventDetails = [
            {
                heading: "Auction ID",
                value: decoded.auctionId.toString(),
                type: "text",
            },
            {
                heading: "Token ID",
                value: decoded.tokenId.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.GAMING,
            name: "Auction Cancelled",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "DeFi Kingdoms",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            nfts,
        };
    }
);

GoldRushDecoder.on(
    "defi-kingdoms:AuctionSuccessful",
    ["defi-kingdoms-mainnet"],
    HERO_AUCTION_ABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: HERO_AUCTION_ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "AuctionSuccessful",
        }) as {
            eventName: "AuctionSuccessful";
            args: {
                auctionId: bigint;
                tokenId: bigint;
                totalPrice: bigint;
                winner: string;
            };
        };

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: JewelToken } =
            await covalent_client.PricingService.getTokenPrices(
                "avalanche-mainnet",
                "USD",
                "0x997ddaa07d716995de90577c123db411584e5e46",
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                decimals: JewelToken?.[0]?.contract_decimals,
                heading: "Total Price",
                value: String(decoded.totalPrice),
                pretty_quote: prettifyCurrency(
                    JewelToken?.[0]?.prices?.[0]?.price *
                        (Number(decoded.totalPrice) /
                            Math.pow(
                                10,
                                JewelToken?.[0]?.contract_decimals ?? 0
                            ))
                ),
                ticker_logo: JewelToken?.[0]?.logo_urls?.token_logo_url,
                ticker_symbol: JewelToken?.[0]?.contract_ticker_symbol,
            },
        ];

        const { data: HeroNFT } =
            await covalent_client.NftService.getNftMetadataForGivenTokenIdForContract(
                chain_name,
                "0xEb9B61B145D6489Be575D3603F4a704810e143dF", // Hero NFT Contract Address
                decoded.tokenId.toString(),
                {
                    withUncached: true,
                }
            );

        const nfts: EventNFTs = [
            {
                heading: `Auction Successful`,
                collection_address: HeroNFT?.items?.[0]?.contract_address,
                collection_name:
                    HeroNFT?.items?.[0]?.nft_data?.external_data?.name || null,
                token_identifier: decoded.tokenId.toString(),
                images: {
                    default:
                        HeroNFT?.items?.[0]?.nft_data?.external_data?.image ||
                        null,
                    256:
                        HeroNFT?.items?.[0]?.nft_data?.external_data
                            ?.image_256 || null,
                    512:
                        HeroNFT?.items?.[0]?.nft_data?.external_data
                            ?.image_512 || null,
                    1024:
                        HeroNFT?.items?.[0]?.nft_data?.external_data
                            ?.image_1024 || null,
                },
            },
        ];

        const details: EventDetails = [
            {
                heading: "Auction ID",
                value: decoded.auctionId.toString(),
                type: "text",
            },
            {
                heading: "Token ID",
                value: decoded.tokenId.toString(),
                type: "text",
            },
            {
                heading: "Winner",
                value: !isNullAddress(decoded.winner)
                    ? decoded.winner
                    : "No winner",
                type: "address",
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.GAMING,
            name: "Auction Successful",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "DeFi Kingdoms",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
            nfts,
        };
    }
);
