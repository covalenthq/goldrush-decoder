import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import { type EventTokens, type EventType } from "../../decoder.types";
import { newBlockSpecimenProofABI } from "./abis/new-block-specimen-proof.abi";
import { newOperationalStakingABI } from "./abis/new-operational-staking.abi";
import { oldBlockSpecimenProofABI } from "./abis/old-block-specimen-proof.abi";
import { oldOperationalStakingABI } from "./abis/old-operational-staking.abi";
import { prettifyCurrency, timestampParser } from "@covalenthq/client-sdk";
import { decodeEventLog, type Abi } from "viem";

GoldRushDecoder.on(
    "covalent-network:BlockSpecimenProductionProofSubmitted",
    ["moonbeam-mainnet"],
    oldBlockSpecimenProofABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: oldBlockSpecimenProofABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "BlockSpecimenProductionProofSubmitted",
        });

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "Block Specimen Production Proof Submitted",
            protocol: {
                logo: sender_logo_url,
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
    oldOperationalStakingABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const {
            block_signed_at,
            raw_log_data,
            raw_log_topics,
            sender_logo_url,
        } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: oldOperationalStakingABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Unstaked",
        });

        const tokens: EventTokens = [];

        if (block_signed_at) {
            const date = timestampParser(block_signed_at, "YYYY-MM-DD");
            const { data } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    "0xbe4c130aaff02ee7c723351b7d8c2b6da1d22ebd",
                    {
                        from: date,
                        to: date,
                    }
                );
            if (data?.[0]?.items?.[0]?.price) {
                tokens.push({
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
                    ticker_symbol: data?.[0]?.contract_ticker_symbol || null,
                    ticker_logo: data?.[0]?.logo_urls?.token_logo_url || null,
                });
            }
        }

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "Unstaked",
            protocol: {
                logo: sender_logo_url,
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
    oldOperationalStakingABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const {
            block_signed_at,
            raw_log_data,
            raw_log_topics,
            sender_logo_url,
        } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: oldOperationalStakingABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "RewardRedeemed",
        });

        const tokens: EventTokens = [];

        if (block_signed_at) {
            const date = timestampParser(block_signed_at, "YYYY-MM-DD");
            const { data } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    "0xbe4c130aaff02ee7c723351b7d8c2b6da1d22ebd",
                    {
                        from: date,
                        to: date,
                    }
                );
            if (data?.[0]?.items?.[0]?.price) {
                tokens.push({
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
                    ticker_symbol: data?.[0]?.contract_ticker_symbol || null,
                    ticker_logo: data?.[0]?.logo_urls?.token_logo_url || null,
                });
            }
        }

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "Reward Redeemed",
            protocol: {
                logo: sender_logo_url,
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
    oldOperationalStakingABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const {
            block_signed_at,
            raw_log_data,
            raw_log_topics,
            sender_logo_url,
        } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: oldOperationalStakingABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "CommissionRewardRedeemed",
        });

        const tokens: EventTokens = [];

        if (block_signed_at) {
            const date = timestampParser(block_signed_at, "YYYY-MM-DD");
            const { data } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    "0xbe4c130aaff02ee7c723351b7d8c2b6da1d22ebd",
                    {
                        from: date,
                        to: date,
                    }
                );
            if (data?.[0]?.items?.[0]?.price) {
                tokens.push({
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
                    ticker_symbol: data?.[0]?.contract_ticker_symbol || null,
                    ticker_logo: data?.[0]?.logo_urls?.token_logo_url || null,
                });
            }
        }

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "Commission Reward Redeemed",
            protocol: {
                logo: sender_logo_url,
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
    newBlockSpecimenProofABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics, sender_logo_url } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: newBlockSpecimenProofABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "BlockSpecimenProductionProofSubmitted",
        });

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "Block Specimen Production Proof Submitted",
            protocol: {
                logo: sender_logo_url,
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
    newOperationalStakingABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        goldrush_client,
        options
    ): Promise<EventType> => {
        const {
            block_signed_at,
            raw_log_data,
            raw_log_topics,
            sender_logo_url,
        } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: newOperationalStakingABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Staked",
        });

        const tokens: EventTokens = [];

        if (block_signed_at) {
            const date = timestampParser(block_signed_at, "YYYY-MM-DD");
            const { data } =
                await goldrush_client.PricingService.getTokenPrices(
                    chain_name,
                    "USD",
                    "0xd417144312dbf50465b1c641d016962017ef6240",
                    {
                        from: date,
                        to: date,
                    }
                );
            if (data?.[0]?.items?.[0]?.price) {
                tokens.push({
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
                    ticker_symbol: data?.[0]?.contract_ticker_symbol || null,
                    ticker_logo: data?.[0]?.logo_urls?.token_logo_url || null,
                });
            }
        }

        return {
            action: DECODED_ACTION.APPROVAL,
            category: DECODED_EVENT_CATEGORY.OTHERS,
            name: "Staked",
            protocol: {
                logo: sender_logo_url,
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
