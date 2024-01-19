import { Decoder } from "../../services";
import {
    CovalentClient,
    type Chain,
    type LogEvent,
} from "@covalenthq/client-sdk";

export const fetchLogsFromTx = async (
    network: Chain,
    tx_hash: string,
    covalentApiKey: string
) => {
    const covalentClient = new CovalentClient(covalentApiKey);
    const { data, error_code, error_message } =
        await covalentClient.TransactionService.getTransaction(
            network,
            tx_hash
        );
    if (data) {
        return data.items[0];
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
    const events = await Decoder.decode(
        network,
        logs.reverse(),
        covalentApiKey
    );
    return events;
};
