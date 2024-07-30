import { Chains } from "@covalenthq/client-sdk";
import * as yup from "yup";

export const decodeTXBodySchema = yup.object({
    chain_name: yup
        .mixed()
        .oneOf(Object.values(Chains), "chain_name is incorrect")
        .required("chain_name is required"),
    tx_hash: yup.string().trim().required("tx_hash is required"),
});

export type DecodeTXRequest = yup.InferType<typeof decodeTXBodySchema>;

export const decodeTXHeadersSchema = yup.object({
    "x-goldrush-api-key": yup
        .string()
        .trim()
        .required("x-goldrush-api-key is required"),
});

export type DecodeTXHeaders = yup.InferType<typeof decodeTXHeadersSchema>;

export const decodeTXQuerySchema = yup.object({
    raw_logs: yup.string().oneOf(["false", "true"]),
    min_usd: yup.number().min(0),
});

export type DecodeTXQuery = yup.InferType<typeof decodeTXQuerySchema>;
