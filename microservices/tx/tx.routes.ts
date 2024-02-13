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
import { fetchEventsFromLogs, fetchDataFromTx } from "./tx.service";
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
        const { log_events, metadata } = await fetchDataFromTx(
            network as Chain,
            tx_hash,
            covalentApiKey
        );
        const events = await fetchEventsFromLogs(
            network as Chain,
            log_events,
            metadata,
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
