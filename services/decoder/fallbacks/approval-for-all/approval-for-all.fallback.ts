import { GoldRushDecoder } from "../../decoder";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import ABI from "./abis/approval-for-all.abi.json";

GoldRushDecoder.fallback(
    "ApprovalForAll",
    ABI as Abi,
    async (log_event, tx, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url, sender_name } =
            log_event;

        const { args: decoded } = decodeEventLog({
            abi: ABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "ApprovalForAll",
        }) as {
            eventName: "ApprovalForAll";
            args: {
                owner: string;
                operator: string;
                approved: boolean;
            };
        };

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Approval For All",
            protocol: {
                logo: sender_logo_url as string,
                name: sender_name as string,
            },
            details: [
                {
                    heading: "Owner",
                    value: decoded.owner,
                    type: "address",
                },
                {
                    heading: "Operator",
                    value: decoded.operator,
                    type: "address",
                },
                {
                    heading: "Approved",
                    value: decoded.approved ? "Yes" : "No",
                    type: "text",
                },
            ],
        };
    }
);
