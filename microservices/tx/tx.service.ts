import { GoldRushDecoder } from "../../services";
import {
    CovalentClient,
    type Chain,
    type Transaction,
} from "@covalenthq/client-sdk";

export const fetchTxFromHash = async (
    chain_name: Chain,
    tx_hash: string,
    covalentApiKey: string
): Promise<Transaction> => {
    const covalentClient = new CovalentClient(covalentApiKey);
    const { data, error_code, error_message } =
        await covalentClient.TransactionService.getTransaction(
            chain_name,
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
        return tx;
    } else {
        throw {
            errorCode: error_code,
            message: error_message,
        };
    }
};

export const decodeLogsFromTx = async (
    chain_name: Chain,
    tx: Transaction,
    covalentApiKey: string
) => {
    const events = await GoldRushDecoder.decode(chain_name, tx, covalentApiKey);
    return events;
};
