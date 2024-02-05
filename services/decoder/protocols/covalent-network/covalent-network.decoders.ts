import { Decoder } from "../../decoder";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import TransparentUpgradeableProxyABI from "./abis/transparent-upgradeable-proxy.abi.json";

Decoder.on(
    "covalent-network:BlockSpecimenProductionProofSubmitted",
    ["moonbeam-mainnet"],
    TransparentUpgradeableProxyABI as Abi,
    async (log, chain_name, covalent_client): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log;

        const { args: decoded } = decodeEventLog({
            abi: TransparentUpgradeableProxyABI,
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
                logo: log.sender_logo_url as string,
                name: "Covalent Network",
            },
            details: [
                {
                    title: "Specimen Hash",
                    value: decoded.specimenHash,
                    type: "text",
                },
                {
                    title: "Storage URL",
                    value: decoded.storageURL,
                    type: "text",
                },
                {
                    title: "Submitted Stake",
                    value: (
                        decoded.submittedStake / BigInt(Math.pow(10, 18))
                    ).toString(),
                    type: "text",
                },
            ],
        };
    }
);
