import { timestampParser } from "../../../../utils/functions";
import { GoldRushDecoder } from "../../decoder";
import {
    DECODED_ACTION,
    DECODED_EVENT_CATEGORY,
} from "../../decoder.constants";
import type { EventDetails, EventTokens } from "../../decoder.types";
import { type EventType } from "../../decoder.types";
import { stethABI } from "./abis/steth.abi";
import { withdrawalQueueABI } from "./abis/withdrawal-queue.abi";
import { prettifyCurrency } from "@covalenthq/client-sdk";
import { decodeEventLog, type Abi } from "viem";

GoldRushDecoder.on(
    "lido:TransferShares",
    ["eth-mainnet"],
    stethABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: stethABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "TransferShares",
        });

        const details: EventDetails = [
            {
                heading: "From",
                value: decoded.from,
                type: "address",
            },
            {
                heading: "To",
                value: decoded.to,
                type: "address",
            },
            {
                heading: "Shares Value",
                value: decoded.sharesValue.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Transfer Shares",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);

GoldRushDecoder.on(
    "lido:Submitted",
    ["eth-mainnet"],
    stethABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: stethABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "Submitted",
        });

        const details: EventDetails = [
            {
                heading: "Sender",
                value: decoded.sender,
                type: "address",
            },
            {
                heading: "Referral",
                value: decoded.referral,
                type: "address",
            },
        ];

        const tokens: EventTokens = [
            {
                heading: "Tokens Staked",
                value: decoded.amount.toString(),
                decimals: tx?.gas_metadata?.contract_decimals,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol,
                ticker_logo: tx?.gas_metadata?.logo_url,
                pretty_quote: prettifyCurrency(
                    tx?.gas_quote_rate *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                tx?.gas_metadata?.contract_decimals ?? 18
                            ))
                ),
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Submitted",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "lido:TokenRebased",
    ["eth-mainnet"],
    stethABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: stethABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "TokenRebased",
        });

        const details: EventDetails = [
            {
                heading: "Time Stamp",
                value: timestampParser(
                    new Date(Number(decoded.reportTimestamp) * 1000),
                    "descriptive"
                ),
                type: "text",
            },
            {
                heading: "Time Elapsed (Seconds)",
                value: decoded.timeElapsed.toString(),
                type: "text",
            },
            {
                heading: "Pre-Total Shares",
                value: decoded.preTotalShares.toString(),
                type: "text",
            },
            {
                heading: "Post-Total Shares",
                value: decoded.postTotalShares.toString(),
                type: "text",
            },
            {
                heading: "Shares Minted As Fees",
                value: decoded.postTotalShares.toString(),
                type: "text",
            },
        ];

        const tokens: EventTokens = [
            {
                heading: "Pre-Total Ether",
                value: decoded.preTotalEther.toString(),
                decimals: tx?.gas_metadata?.contract_decimals,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol,
                ticker_logo: tx?.gas_metadata?.logo_url,
                pretty_quote: prettifyCurrency(
                    (tx?.gas_quote_rate ?? 0) *
                        (Number(decoded.preTotalEther) /
                            Math.pow(
                                10,
                                +(tx?.gas_metadata?.contract_decimals ?? 18)
                            ))
                ),
            },
            {
                heading: "Post-Total Ether",
                value: decoded.postTotalEther.toString(),
                decimals: tx?.gas_metadata?.contract_decimals,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol,
                ticker_logo: tx?.gas_metadata?.logo_url,
                pretty_quote: prettifyCurrency(
                    (tx?.gas_quote_rate ?? 0) *
                        (Number(decoded.postTotalEther) /
                            Math.pow(
                                10,
                                +(tx?.gas_metadata?.contract_decimals ?? 18)
                            ))
                ),
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Token Rebased",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "lido:SharesBurnt",
    ["eth-mainnet"],
    stethABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: stethABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "SharesBurnt",
        });

        const details: EventDetails = [
            {
                heading: "Account",
                value: decoded.account,
                type: "address",
            },
            {
                heading: "Shares Amount",
                value: decoded.sharesAmount.toString(),
                type: "text",
            },
        ];

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: StakingToken } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                log_event.sender_address,
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                heading: "Pre-Rebase Token Amount",
                value: decoded.preRebaseTokenAmount.toString(),
                decimals: StakingToken?.[0]?.contract_decimals,
                ticker_symbol: StakingToken?.[0]?.contract_ticker_symbol,
                ticker_logo: StakingToken?.[0]?.logo_urls?.token_logo_url,
                pretty_quote: prettifyCurrency(
                    (StakingToken?.[0]?.prices?.[0]?.price ?? 0) *
                        (Number(decoded.preRebaseTokenAmount) /
                            Math.pow(
                                10,
                                +(StakingToken?.[0]?.contract_decimals ?? 18)
                            ))
                ),
            },
            {
                heading: "Post-Rebase Token Amount",
                value: decoded.postRebaseTokenAmount.toString(),
                decimals: StakingToken?.[0]?.contract_decimals,
                ticker_symbol: StakingToken?.[0]?.contract_ticker_symbol,
                ticker_logo: StakingToken?.[0]?.logo_urls?.token_logo_url,
                pretty_quote: prettifyCurrency(
                    (StakingToken?.[0]?.prices?.[0]?.price ?? 0) *
                        (Number(decoded.postRebaseTokenAmount) /
                            Math.pow(
                                10,
                                +(StakingToken?.[0]?.contract_decimals ?? 18)
                            ))
                ),
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Shares Burnt",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "lido:ETHDistributed",
    ["eth-mainnet"],
    stethABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: stethABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "ETHDistributed",
        });

        const details: EventDetails = [
            {
                heading: "Time Stamp",
                value: timestampParser(
                    new Date(Number(decoded.reportTimestamp) * 1000),
                    "descriptive"
                ),
                type: "text",
            },
        ];

        const tokens: EventTokens = [
            {
                heading: "Pre-CL Balance",
                value: decoded.preCLBalance.toString(),
                decimals: tx?.gas_metadata?.contract_decimals,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol,
                ticker_logo: tx?.gas_metadata?.logo_url,
                pretty_quote: prettifyCurrency(
                    (tx?.gas_quote_rate ?? 0) *
                        (Number(decoded.preCLBalance) /
                            Math.pow(
                                10,
                                +(tx?.gas_metadata?.contract_decimals ?? 18)
                            ))
                ),
            },
            {
                heading: "Post-CL Balance",
                value: decoded.postCLBalance.toString(),
                decimals: tx?.gas_metadata?.contract_decimals,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol,
                ticker_logo: tx?.gas_metadata?.logo_url,
                pretty_quote: prettifyCurrency(
                    (tx?.gas_quote_rate ?? 0) *
                        (Number(decoded.postCLBalance) /
                            Math.pow(
                                10,
                                +(tx?.gas_metadata?.contract_decimals ?? 18)
                            ))
                ),
            },
            {
                heading: "Withdrawals Withdrawn",
                value: decoded.withdrawalsWithdrawn.toString(),
                decimals: tx?.gas_metadata?.contract_decimals,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol,
                ticker_logo: tx?.gas_metadata?.logo_url,
                pretty_quote: prettifyCurrency(
                    (tx?.gas_quote_rate ?? 0) *
                        (Number(decoded.withdrawalsWithdrawn) /
                            Math.pow(
                                10,
                                +(tx?.gas_metadata?.contract_decimals ?? 18)
                            ))
                ),
            },
            {
                heading: "Execution Layer Rewards",
                value: decoded.executionLayerRewardsWithdrawn.toString(),
                decimals: tx?.gas_metadata?.contract_decimals,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol,
                ticker_logo: tx?.gas_metadata?.logo_url,
                pretty_quote: prettifyCurrency(
                    (tx?.gas_quote_rate ?? 0) *
                        (Number(decoded.executionLayerRewardsWithdrawn) /
                            Math.pow(
                                10,
                                +(tx?.gas_metadata?.contract_decimals ?? 18)
                            ))
                ),
            },
            {
                heading: "Post-Buffered Ether",
                value: decoded.postBufferedEther.toString(),
                decimals: tx?.gas_metadata?.contract_decimals,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol,
                ticker_logo: tx?.gas_metadata?.logo_url,
                pretty_quote: prettifyCurrency(
                    (tx?.gas_quote_rate ?? 0) *
                        (Number(decoded.postBufferedEther) /
                            Math.pow(
                                10,
                                +(tx?.gas_metadata?.contract_decimals ?? 18)
                            ))
                ),
            },
        ];

        return {
            action: DECODED_ACTION.WITHDRAW,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "ETH Distributed",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "lido:WithdrawalsReceived",
    ["eth-mainnet"],
    stethABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: stethABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "WithdrawalsReceived",
        });

        const tokens: EventTokens = [
            {
                heading: "Withdrawals Withdrawn",
                value: decoded.amount.toString(),
                decimals: tx?.gas_metadata?.contract_decimals,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol,
                ticker_logo: tx?.gas_metadata?.logo_url,
                pretty_quote: prettifyCurrency(
                    (tx?.gas_quote_rate ?? 0) *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                +(tx?.gas_metadata?.contract_decimals ?? 18)
                            ))
                ),
            },
        ];

        return {
            action: DECODED_ACTION.WITHDRAW,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Withdrawals Received",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "lido:ELRewardsReceived",
    ["eth-mainnet"],
    stethABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: stethABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "ELRewardsReceived",
        });

        const tokens: EventTokens = [
            {
                heading: "Rewards Received",
                value: decoded.amount.toString(),
                decimals: tx?.gas_metadata?.contract_decimals,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol,
                ticker_logo: tx?.gas_metadata?.logo_url,
                pretty_quote: prettifyCurrency(
                    (tx?.gas_quote_rate ?? 0) *
                        (Number(decoded.amount) /
                            Math.pow(
                                10,
                                +(tx?.gas_metadata?.contract_decimals ?? 18)
                            ))
                ),
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "EL Rewards Received",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "lido:CLValidatorsUpdated",
    ["eth-mainnet"],
    stethABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: stethABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "CLValidatorsUpdated",
        });

        const details: EventDetails = [
            {
                heading: "Pre-CL Validators",
                value: decoded.preCLValidators.toString(),
                type: "text",
            },
            {
                heading: "Post-CL Validators",
                value: decoded.postCLValidators.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.TRANSFERRED,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "CL Validators Updated",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);

GoldRushDecoder.on(
    "lido:WithdrawalRequested",
    ["eth-mainnet"],
    withdrawalQueueABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: withdrawalQueueABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "WithdrawalRequested",
        });

        const details: EventDetails = [
            {
                heading: "Request ID",
                value: decoded.requestId.toString(),
                type: "text",
            },
            {
                heading: "Requestor",
                value: decoded.requestor,
                type: "address",
            },
            {
                heading: "Owner",
                value: decoded.owner,
                type: "address",
            },
            {
                heading: "Amount Of Shares",
                value: decoded.amountOfShares.toString(),
                type: "text",
            },
        ];

        const date = timestampParser(tx.block_signed_at, "YYYY-MM-DD");

        const { data: StakingToken } =
            await covalent_client.PricingService.getTokenPrices(
                chain_name,
                "USD",
                "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84",
                {
                    from: date,
                    to: date,
                }
            );

        const tokens: EventTokens = [
            {
                heading: "Amount Of stETH",
                value: decoded.amountOfStETH.toString(),
                decimals: StakingToken?.[0]?.contract_decimals,
                ticker_symbol: StakingToken?.[0]?.contract_ticker_symbol,
                ticker_logo: StakingToken?.[0]?.logo_urls?.token_logo_url,
                pretty_quote: prettifyCurrency(
                    (StakingToken?.[0]?.prices?.[0]?.price ?? 0) *
                        (Number(decoded.amountOfStETH) /
                            Math.pow(
                                10,
                                +(StakingToken?.[0]?.contract_decimals ?? 18)
                            ))
                ),
            },
        ];

        return {
            action: DECODED_ACTION.WITHDRAW,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Withdrawal Requested",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "lido:WithdrawalClaimed",
    ["eth-mainnet"],
    withdrawalQueueABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: withdrawalQueueABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "WithdrawalClaimed",
        });

        const details: EventDetails = [
            {
                heading: "Request ID",
                value: decoded.requestId.toString(),
                type: "text",
            },
            {
                heading: "Owner",
                value: decoded.owner,
                type: "address",
            },
            {
                heading: "Requestor",
                value: decoded.receiver,
                type: "address",
            },
        ];

        const tokens: EventTokens = [
            {
                heading: "Amount Of ETH",
                value: decoded.amountOfETH.toString(),
                decimals: tx?.gas_metadata?.contract_decimals,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol,
                ticker_logo: tx?.gas_metadata?.logo_url,
                pretty_quote: prettifyCurrency(
                    (tx?.gas_quote_rate ?? 0) *
                        (Number(decoded.amountOfETH) /
                            Math.pow(
                                10,
                                +(tx?.gas_metadata?.contract_decimals ?? 18)
                            ))
                ),
            },
        ];

        return {
            action: DECODED_ACTION.WITHDRAW,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Withdrawal Claimed",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);

GoldRushDecoder.on(
    "lido:BatchMetadataUpdate",
    ["eth-mainnet"],
    withdrawalQueueABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: withdrawalQueueABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "BatchMetadataUpdate",
        });

        const details: EventDetails = [
            {
                heading: "From Token ID",
                value: decoded._fromTokenId.toString(),
                type: "text",
            },
            {
                heading: "To Token ID",
                value: decoded._toTokenId.toString(),
                type: "text",
            },
        ];

        return {
            action: DECODED_ACTION.UPDATE,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Batch Metadata Update",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
        };
    }
);

GoldRushDecoder.on(
    "lido:WithdrawalsFinalized",
    ["eth-mainnet"],
    withdrawalQueueABI as Abi,
    async (
        log_event,
        tx,
        chain_name,
        covalent_client,
        options
    ): Promise<EventType> => {
        const { raw_log_data, raw_log_topics } = log_event;

        const { args: decoded } = decodeEventLog({
            abi: withdrawalQueueABI,
            topics: raw_log_topics as [],
            data: raw_log_data as `0x${string}`,
            eventName: "WithdrawalsFinalized",
        });

        const details: EventDetails = [
            {
                heading: "From",
                value: decoded.from.toString(),
                type: "text",
            },
            {
                heading: "To",
                value: decoded.to.toString(),
                type: "text",
            },
            {
                heading: "Shares To Burn",
                value: decoded.sharesToBurn.toString(),
                type: "text",
            },
            {
                heading: "Timestamp",
                value: timestampParser(
                    new Date(Number(decoded.timestamp) * 1000),
                    "descriptive"
                ),
                type: "text",
            },
        ];

        const tokens: EventTokens = [
            {
                heading: "Amount Of ETH Locked",
                value: decoded.amountOfETHLocked.toString(),
                decimals: tx?.gas_metadata?.contract_decimals,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol,
                ticker_logo: tx?.gas_metadata?.logo_url,
                pretty_quote: prettifyCurrency(
                    (tx?.gas_quote_rate ?? 0) *
                        (Number(decoded.amountOfETHLocked) /
                            Math.pow(
                                10,
                                +(tx?.gas_metadata?.contract_decimals ?? 18)
                            ))
                ),
            },
        ];

        return {
            action: DECODED_ACTION.WITHDRAW,
            category: DECODED_EVENT_CATEGORY.STAKING,
            name: "Withdrawals Finalized",
            protocol: {
                logo: log_event.sender_logo_url as string,
                name: "Lido" as string,
            },
            ...(options.raw_logs ? { raw_log: log_event } : {}),
            details,
            tokens,
        };
    }
);
