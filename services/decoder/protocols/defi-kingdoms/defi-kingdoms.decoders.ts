import { prettifyCurrency } from "@covalenthq/client-sdk";
import { decodeEventLog, type Abi } from "viem";
import { isNullAddress, timestampParser } from "../../../../utils/functions";
import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import type { EventDetails, EventNFTs, EventTokens } from "../../decoder.types";
import { type EventType } from "../../decoder.types";
import { heroAuctionABI } from "./abis/hero-auction.abi";
import { petsABI } from "./abis/pets.abi";

GoldRushDecoder.on(
    "defi-kingdoms:PetFed",
    ["defi-kingdoms-mainnet"],
    petsABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: petsABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "PetFed",
        });

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
                heading: "Food Type",
                value:
                    Number(decoded.foodType) === 1
                        ? "Premium Pet Treat"
                        : "Regular Pet Treat",
                type: "text",
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
        };
    }
);

GoldRushDecoder.on(
    "defi-kingdoms:AuctionCreated",
    ["defi-kingdoms-mainnet"],
    heroAuctionABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: heroAuctionABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "AuctionCreated",
        });

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
    heroAuctionABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: heroAuctionABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "AuctionCancelled",
        });

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
    heroAuctionABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: heroAuctionABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "AuctionSuccessful",
        });

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
