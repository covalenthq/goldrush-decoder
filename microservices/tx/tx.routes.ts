import { validateQuery } from "../../middlewares";
import {
    decodeTXBodySchema,
    decodeTXHeadersSchema,
    decodeTXQuerySchema,
    type DecodeTXHeaders,
    type DecodeTXQuery,
    type DecodeTXRequest,
} from "./tx.schema";
import { decodeLogsFromTx, fetchTxFromHash } from "./tx.service";
import { type Chain } from "@covalenthq/client-sdk";
import {
    Router,
    type NextFunction,
    type Request,
    type Response,
} from "express";

export const txRouter = Router();

const handleDecode = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const goldrushApiKey = ((req.headers as DecodeTXHeaders)[
            "x-goldrush-api-key"
        ] || (req.headers as DecodeTXHeaders)["x-covalent-api-key"])!;
        const raw_logs = (req.query as DecodeTXQuery)["raw_logs"] === "true";
        const min_usd = (req.query as DecodeTXQuery)["min_usd"] ?? 0;
        const { chain_name, tx_hash } = req.body as DecodeTXRequest;
        const tx = await fetchTxFromHash(
            chain_name as Chain,
            tx_hash,
            goldrushApiKey
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
            goldrushApiKey,
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
