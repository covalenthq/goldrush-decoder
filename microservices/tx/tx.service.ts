import { GoldRushDecoder } from "../../services";
import {
    CovalentClient,
    type Chain,
    type LogEvent,
} from "@covalenthq/client-sdk";

export const fetchDataFromTx = async (
    network: Chain,
    tx_hash: string,
    covalentApiKey: string
) => {
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
    if (data) {
        const {
            log_events,
            dex_details,
            nft_sale_details,
            lending_details,
            safe_details,
            ...metadata
        } = data.items[0];
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
    covalentApiKey: string
) => {
    const events = await GoldRushDecoder.decode(
        network,
        logs.reverse(),
        covalentApiKey
    );
    return events;
};
