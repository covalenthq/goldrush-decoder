import { GoldRushDecoder } from "../../decoder";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import OldBlockSpecimenProofABI from "./abis/old-block-specimen-proof.abi.json";
import NewBlockSpecimenProofABI from "./abis/new-block-specimen-proof.abi.json";

GoldRushDecoder.on(
    "covalent-network:BlockSpecimenProductionProofSubmitted",
    ["moonbeam-mainnet"],
    OldBlockSpecimenProofABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: OldBlockSpecimenProofABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "BlockSpecimenProductionProofSubmitted",
        }) as {
            eventName: "BlockSpecimenProductionProofSubmitted";
            args: {
                chainId: bigint;
                blockHeight: bigint;
                blockHash: string;
                specimenHash: string;
                storageURL: string;
                submittedStake: bigint;
            };
        };

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "Block Specimen Production Proof Submitted",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Covalent Network",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details: [
                {
                    heading: "Specimen Hash",
                    value: decoded.specimenHash,
                    type: "address",
                },
                {
                    heading: "Storage URL",
                    value: decoded.storageURL,
                    type: "text",
                },
                {
                    heading: "Submitted Stake",
                    value: (
                        decoded.submittedStake / BigInt(Math.pow(10, 18))
                    ).toString(),
                    type: "text",
                },
            ],
        };
    }
);

GoldRushDecoder.on(
    "covalent-network:BlockSpecimenProductionProofSubmitted",
    ["moonbeam-mainnet"],
    NewBlockSpecimenProofABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: NewBlockSpecimenProofABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "BlockSpecimenProductionProofSubmitted",
        }) as {
            eventName: "BlockSpecimenProductionProofSubmitted";
            args: {
                chainId: bigint;
                blockHeight: bigint;
                blockHash: string;
                specimenHash: string;
                storageURL: string;
            };
        };

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "Block Specimen Production Proof Submitted",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Covalent Network",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details: [
                {
                    heading: "Specimen Hash",
                    value: decoded.specimenHash,
                    type: "address",
                },
                {
                    heading: "Storage URL",
                    value: decoded.storageURL,
                    type: "text",
                },
            ],
        };
    }
);
