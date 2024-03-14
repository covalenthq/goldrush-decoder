import { GoldRushDecoder } from "../../decoder";
import type { EventDetails } from "../../decoder.types";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import PetABI from "./abis/defi-kingdoms.pets.abi.json";
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
