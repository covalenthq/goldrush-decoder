import { GoldRushDecoder } from "../../decoder";
import type { EventDetails } from "../../decoder.types";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import PetABI from "./abis/defi-kingdoms.pets.abi.json";
import HERO_AUCTION_ABI from "./abis/defi-kingdoms.hero-auction.abi.json";
import { TimestampParser } from "../../../../utils/functions";

GoldRushDecoder.on(
    "defi-kingdoms:PetFed",
    ["defi-kingdoms-mainnet"],
    PetABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
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

        const details: EventDetails = [
            {
                heading: "Fed By",
                value: decoded.fedBy,
                type: "address",
            },
            {
                heading: "Pet ID",
                value: decoded.petId.toString(),
                type: "text",
            },
            {
                heading: "Food Type",
                value: decoded.foodType.toString(),
                type: "text",
            },
            {
                heading: "Hungry At",
                value: TimestampParser(
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
            details,
        };
    }
);

GoldRushDecoder.on(
    "defi-kingdoms:AuctionCreated",
    ["defi-kingdoms-mainnet"],
    HERO_AUCTION_ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
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
                heading: "Starting Price",
                value: decoded.startingPrice.toString(),
                type: "text",
            },
            {
                heading: "Ending Price",
                value: decoded.endingPrice.toString(),
                type: "text",
            },
            {
                heading: "Duration",
                value: decoded.duration.toString(),
                type: "text",
            },
            {
                heading: "Winner",
                value: decoded.winner.toString(),
                type: "address",
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
            details,
        };
    }
);

GoldRushDecoder.on(
    "defi-kingdoms:AuctionCancelled",
    ["defi-kingdoms-mainnet"],
    HERO_AUCTION_ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
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
            details,
        };
    }
);

GoldRushDecoder.on(
    "defi-kingdoms:AuctionSuccessful",
    ["defi-kingdoms-mainnet"],
    HERO_AUCTION_ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
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
                heading: "Total Price",
                value: decoded.totalPrice.toString(),
                type: "text",
            },
            {
                heading: "Winner",
                value: decoded.winner.toString(),
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
            details,
        };
    }
);
