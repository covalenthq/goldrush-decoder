import { GoldRushDecoder } from "../../decoder";
import { type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import SourceZorbABI from "./abis/source-zorb.abi.json";
import { type Abi, decodeEventLog } from "viem";

GoldRushDecoder.on(
    "source-zorb:Transfer",
    ["zora-mainnet"],
    SourceZorbABI as Abi,
    async (log, chain_name, covalent_client, tx): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_address } = log;

        const { args: decoded } = decodeEventLog({
            abi: SourceZorbABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Transfer",
        }) as {
            eventName: "Transfer";
            args: {
                from: string;
                to: string;
                tokenId: bigint;
            };
        };

        const { data } =
            await covalent_client.NftService.getNftMetadataForGivenTokenIdForContract(
                chain_name,
                sender_address,
                decoded.tokenId.toString()
            );

        return {
            action: DECODED_ACTION.SWAPPED,
            category: DECODED_EVENT_CATEGORY.DEX,
            name: "Transfer",
            protocol: {
                logo: log.sender_logo_url as string,
                name: "SOURCE ZORB",
            },
            nfts: [
                {
                    heading: `Transferred to ${decoded.to}`,
                    collection_address: sender_address,
                    collection_name: "Source Zorb",
                    token_identifier: decoded.tokenId.toString(),
                    images: {
                        default:
                            data?.items?.[0]?.nft_data?.external_data?.image ||
                            null,
                        256:
                            data?.items?.[0]?.nft_data?.external_data
                                ?.image_256 || null,
                        512:
                            data?.items?.[0]?.nft_data?.external_data
                                ?.image_512 || null,
                        1024:
                            data?.items?.[0]?.nft_data?.external_data
                                ?.image_1024 || null,
                    },
                },
            ],
        };
    }
);
