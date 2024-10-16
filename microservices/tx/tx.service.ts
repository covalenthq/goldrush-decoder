import { GoldRushDecoder } from "../../services";
import { type QueryOptions } from "../../services/decoder/decoder.types";
import {
    type Chain,
    type ChainName,
    type GoldRushClient,
    type Transaction,
} from "@covalenthq/client-sdk";

export const fetchTxFromHash = async (
    chain_name: Chain,
    tx_hash: string,
    goldrush_client: GoldRushClient
): Promise<Transaction> => {
    const { data, error_code, error_message } =
        await goldrush_client.TransactionService.getTransaction(
            chain_name,
            tx_hash,
            {
                noLogs: false,
                quoteCurrency: "USD",
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
    goldrush_client: GoldRushClient,
    options: QueryOptions
) => {
    const events = await GoldRushDecoder.decode(
        chain_name,
        tx,
        goldrush_client,
        options
    );
    return events;
};
