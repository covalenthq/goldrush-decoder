import { GoldRushDecoder } from "../../services";
import { type QueryOptions } from "../../services/decoder/decoder.types";
import {
    GoldRushClient,
    type Chain,
    type ChainName,
    type Transaction,
} from "@covalenthq/client-sdk";

export const fetchTxFromHash = async (
    chain_name: Chain,
    tx_hash: string,
    goldrushApiKey: string
): Promise<Transaction> => {
    const goldrushClient = new GoldRushClient(goldrushApiKey);
    const { data, error_code, error_message } =
        await goldrushClient.TransactionService.getTransaction(
            chain_name,
            tx_hash,
            {
                noLogs: false,
                quoteCurrency: "USD",
                withNftSales: false,
                withSafe: false,
            }
        );
    const tx = data?.items?.[0];
    if (tx) {
        return tx;
    } else {
        throw {
            errorCode: error_code,
            message: error_message,
        };
    }
};

export const decodeLogsFromTx = async (
    chain_name: ChainName,
    tx: Transaction,
    apiKey: string,
    options: QueryOptions
) => {
    const events = await GoldRushDecoder.decode(
        chain_name,
        tx,
        apiKey,
        options
    );
    return events;
};
