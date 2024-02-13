import { GoldRushDecoder } from "../../services";
import {
    CovalentClient,
    type Chain,
    type LogEvent,
} from "@covalenthq/client-sdk";
import { type TransactionMetadata } from "../../services/decoder/decoder.types";

export const fetchTxDataFromHash = async (
    network: Chain,
    tx_hash: string,
    covalentApiKey: string
): Promise<{
    log_events: LogEvent[];
    metadata: TransactionMetadata;
}> => {
    const covalentClient = new CovalentClient(covalentApiKey);
    const { data, error_code, error_message } =
        await covalentClient.TransactionService.getTransaction(
            network,
            tx_hash,
            {
                noLogs: false,
                quoteCurrency: "USD",
                withDex: false,
                withLending: false,
                withNftSales: false,
                withSafe: false,
            }
        );
    const tx = data?.items?.[0];
    if (tx) {
        const {
            log_events,
            dex_details,
            nft_sale_details,
            lending_details,
            safe_details,
            ...metadata
        } = tx;
        return {
            log_events: log_events,
            metadata: metadata,
        };
    } else {
        throw {
            errorCode: error_code,
            message: error_message,
        };
    }
};

export const fetchEventsFromLogs = async (
    network: Chain,
    logs: LogEvent[],
    metadata: TransactionMetadata,
    covalentApiKey: string
) => {
    const events = await GoldRushDecoder.decode(
        network,
        logs.reverse(),
        metadata,
        covalentApiKey
    );
    return events;
};
