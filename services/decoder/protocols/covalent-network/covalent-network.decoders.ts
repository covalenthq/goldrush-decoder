import { GoldRushDecoder } from "../../decoder";
import { type EventTokens, type EventType } from "../../decoder.types";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { decodeEventLog, type Abi } from "viem";
import OldBlockSpecimenProofABI from "./abis/old-block-specimen-proof.abi.json";
import NewBlockSpecimenProofABI from "./abis/new-block-specimen-proof.abi.json";
import OldOperationalStakingABI from "./abis/old-operational-staking.abi.json";
import NewOperationalStakingABI from "./abis/new-operational-staking.abi.json";
import { timestampParser } from "../../../../utils/functions";
import { prettifyCurrency } from "@covalenthq/client-sdk";

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
    "covalent-network:Unstaked",
    ["moonbeam-mainnet"],
    OldOperationalStakingABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { block_signed_at, raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: OldOperationalStakingABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Unstaked",
        }) as {
            eventName: "Unstaked";
            args: {
                validatorId: bigint;
                delegator: string;
                amount: bigint;
                unstakeId: bigint;
            };
        };

        const date = timestampParser(block_signed_at, "YYYY-MM-DD");
        const { data } = await covalent_client.PricingService.getTokenPrices(
            chain_name,
            "USD",
            "0xbe4c130aaff02ee7c723351b7d8c2b6da1d22ebd",
            {
                from: date,
                to: date,
            }
        );
        const tokens: EventTokens = [
            {
                heading: "Amount",
                value: decoded.amount.toString(),
                decimals: data?.[0]?.contract_decimals ?? 18,
                pretty_quote: prettifyCurrency(
                    data?.[0]?.items?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                data?.[0]?.items?.[0]?.contract_metadata
                                    ?.contract_decimals ?? 18
                            ))
                ),
                ticker_symbol: data?.[0]?.contract_ticker_symbol,
                ticker_logo: data?.[0]?.logo_urls?.token_logo_url,
            },
        ];

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "Unstaked",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Covalent Network",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details: [
                {
                    heading: "Delegator",
                    type: "address",
                    value: decoded.delegator,
                },
                {
                    heading: "Validator ID",
                    type: "text",
                    value: decoded.validatorId.toLocaleString(),
                },
                {
                    heading: "Unstake ID",
                    type: "text",
                    value: decoded.unstakeId.toLocaleString(),
                },
            ],
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "covalent-network:RewardRedeemed",
    ["moonbeam-mainnet"],
    OldOperationalStakingABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { block_signed_at, raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: OldOperationalStakingABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "RewardRedeemed",
        }) as {
            eventName: "RewardRedeemed";
            args: {
                validatorId: bigint;
                beneficiary: string;
                amount: bigint;
            };
        };

        const date = timestampParser(block_signed_at, "YYYY-MM-DD");
        const { data } = await covalent_client.PricingService.getTokenPrices(
            chain_name,
            "USD",
            "0xbe4c130aaff02ee7c723351b7d8c2b6da1d22ebd",
            {
                from: date,
                to: date,
            }
        );
        const tokens: EventTokens = [
            {
                heading: "Amount",
                value: decoded.amount.toString(),
                decimals: data?.[0]?.contract_decimals ?? 18,
                pretty_quote: prettifyCurrency(
                    data?.[0]?.items?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                data?.[0]?.items?.[0]?.contract_metadata
                                    ?.contract_decimals ?? 18
                            ))
                ),
                ticker_symbol: data?.[0]?.contract_ticker_symbol,
                ticker_logo: data?.[0]?.logo_urls?.token_logo_url,
            },
        ];

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "Reward Redeemed",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Covalent Network",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details: [
                {
                    heading: "Delegator",
                    type: "address",
                    value: decoded.beneficiary,
                },
                {
                    heading: "Validator ID",
                    type: "text",
                    value: decoded.validatorId.toLocaleString(),
                },
            ],
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "covalent-network:CommissionRewardRedeemed",
    ["moonbeam-mainnet"],
    OldOperationalStakingABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { block_signed_at, raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: OldOperationalStakingABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "CommissionRewardRedeemed",
        }) as {
            eventName: "CommissionRewardRedeemed";
            args: {
                validatorId: bigint;
                beneficiary: string;
                amount: bigint;
            };
        };

        const date = timestampParser(block_signed_at, "YYYY-MM-DD");
        const { data } = await covalent_client.PricingService.getTokenPrices(
            chain_name,
            "USD",
            "0xbe4c130aaff02ee7c723351b7d8c2b6da1d22ebd",
            {
                from: date,
                to: date,
            }
        );
        const tokens: EventTokens = [
            {
                heading: "Amount",
                value: decoded.amount.toString(),
                decimals: data?.[0]?.contract_decimals ?? 18,
                pretty_quote: prettifyCurrency(
                    data?.[0]?.items?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                data?.[0]?.items?.[0]?.contract_metadata
                                    ?.contract_decimals ?? 18
                            ))
                ),
                ticker_symbol: data?.[0]?.contract_ticker_symbol,
                ticker_logo: data?.[0]?.logo_urls?.token_logo_url,
            },
        ];

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "Commission Reward Redeemed",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Covalent Network",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details: [
                {
                    heading: "Delegator",
                    type: "address",
                    value: decoded.beneficiary,
                },
                {
                    heading: "Validator ID",
                    type: "text",
                    value: decoded.validatorId.toLocaleString(),
                },
            ],
            tokens,
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

GoldRushDecoder.on(
    "covalent-network:Staked",
    ["eth-mainnet"],
    NewOperationalStakingABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { block_signed_at, raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: NewOperationalStakingABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Staked",
        }) as {
            eventName: "Staked";
            args: {
                validatorId: bigint;
                delegator: string;
                amount: bigint;
            };
        };

        const date = timestampParser(block_signed_at, "YYYY-MM-DD");
        const { data } = await covalent_client.PricingService.getTokenPrices(
            chain_name,
            "USD",
            "0xd417144312dbf50465b1c641d016962017ef6240",
            {
                from: date,
                to: date,
            }
        );
        const tokens: EventTokens = [
            {
                heading: "Amount",
                value: decoded.amount.toString(),
                decimals: data?.[0]?.contract_decimals ?? 18,
                pretty_quote: prettifyCurrency(
                    data?.[0]?.items?.[0]?.price *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                data?.[0]?.items?.[0]?.contract_metadata
                                    ?.contract_decimals ?? 18
                            ))
                ),
                ticker_symbol: data?.[0]?.contract_ticker_symbol,
                ticker_logo: data?.[0]?.logo_urls?.token_logo_url,
            },
        ];

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "Staked",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Covalent Network",
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details: [
                {
                    heading: "Delegator",
                    type: "address",
                    value: decoded.delegator,
                },
                {
                    heading: "Validator ID",
                    type: "text",
                    value: decoded.validatorId.toLocaleString(),
                },
            ],
            tokens,
        };
    }
);
