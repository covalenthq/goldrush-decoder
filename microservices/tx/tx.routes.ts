import {
    Router,
    type Request,
    type Response,
    type NextFunction,
} from "express";
import { validateQuery } from "../../middlewares";
import {
    type DecodeTXRequest,
    decodeTXRequestSchema,
    decodeTXHeadersSchema,
    type DecodeTXHeaders,
} from "./tx.schema";
import { fetchEventsFromLogs, fetchTxFromHash } from "./tx.service";
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
        const { network, tx_hash } = req.body as DecodeTXRequest;
        const tx = await fetchTxFromHash(
            network as Chain,
            tx_hash,
            covalentApiKey
        );
        const {
            log_events,
            dex_details,
            nft_sale_details,
            lending_details,
            safe_details,
            ...metadata
        } = tx;
        const events = await fetchEventsFromLogs(
            network as Chain,
            tx,
            covalentApiKey
        );
        const parsedMetadata = JSON.parse(
            JSON.stringify(metadata, (_key, value) => {
                return typeof value === "bigint" ? value.toString() : value;
            })
        );
        res.json({
            success: true,
            events: events,
            metadata: parsedMetadata,
        });
    } catch (error) {
        next(error);
    }
};

txRouter.post(
    "/decode",
    validateQuery("headers", decodeTXHeadersSchema),
    validateQuery("body", decodeTXRequestSchema),
    handleDecode
);
