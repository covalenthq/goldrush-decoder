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
import { fetchEventsFromLogs, fetchLogsFromTx } from "./tx.service";
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
        const { log_events } = await fetchLogsFromTx(
            network as Chain,
            tx_hash,
            covalentApiKey
        );
        const data = await fetchEventsFromLogs(
            network as Chain,
            log_events,
            covalentApiKey
        );
        res.json({
            success: true,
            events: data,
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
