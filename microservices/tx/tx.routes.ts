import {
    Router,
    type Request,
    type Response,
    type NextFunction,
} from "express";
import { validateQuery } from "../../middlewares";
import {
    type DecodeTXRequest,
    decodeTXBodySchema,
    decodeTXHeadersSchema,
    type DecodeTXHeaders,
    decodeTXQuerySchema,
    type DecodeTXQuery,
} from "./tx.schema";
import { decodeLogsFromTx, fetchTxFromHash } from "./tx.service";
import { type Chain } from "@covalenthq/client-sdk";

export const txRouter = Router();

const handleDecode = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const covalentApiKey = (req.headers as DecodeTXHeaders)[
            "x-covalent-api-key"
        ];
        const raw_logs = (req.query as DecodeTXQuery)["raw_logs"] === "true";
        const min_usd = (req.query as DecodeTXQuery)["min_usd"] ?? 0;
        const { chain_name, tx_hash } = req.body as DecodeTXRequest;
        const tx = await fetchTxFromHash(
            chain_name as Chain,
            tx_hash,
            covalentApiKey
        );
        const {
            log_events,
            dex_details,
            nft_sale_details,
            lending_details,
            safe_details,
            ...tx_metadata
        } = tx;
        const events = await decodeLogsFromTx(
            chain_name as Chain,
            tx,
            covalentApiKey,
            {
                raw_logs,
                min_usd,
            }
        );
        const parsedTx = JSON.parse(
            JSON.stringify(tx_metadata, (_key, value) => {
                return typeof value === "bigint" ? value.toString() : value;
            })
        );
        res.json({
            success: true,
            events: events,
            tx_metadata: parsedTx,
        });
    } catch (error) {
        next(error);
    }
};

txRouter.post(
    "/decode",
    validateQuery("headers", decodeTXHeadersSchema),
    validateQuery("query", decodeTXQuerySchema),
    validateQuery("body", decodeTXBodySchema),
    handleDecode
);
