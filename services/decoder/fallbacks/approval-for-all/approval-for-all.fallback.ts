import { decodeEventLog, type Abi } from "viem";
import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { type EventType } from "../../decoder.types";
import { approvalForAllABI } from "./abis/approval-for-all.abi";

GoldRushDecoder.fallback(
    "ApprovalForAll",
    approvalForAllABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url, sender_name } =
            log_event;

        const { args: decoded } = decodeEventLog({
            abi: approvalForAllABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "ApprovalForAll",
        });

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Approval For All",
            protocol: {
                logo: sender_logo_url as string,
                name: sender_name as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
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
