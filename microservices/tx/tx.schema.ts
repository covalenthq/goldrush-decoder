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

export const decodeTXHeadersSchema = yup
    .object()
    .shape({
        "x-goldrush-api-key": yup.string().trim(),
        "x-covalent-api-key": yup.string().trim(),
    })
    .test(
        "x-goldrush-api-key or x-covalent-api-key",
        "x-goldrush-api-key is required, or optionally the deprecated x-covalent-api-key",
        (value) =>
            value["x-goldrush-api-key"] || value["x-covalent-api-key"]
                ? true
                : false
    );

export type DecodeTXHeaders = yup.InferType<typeof decodeTXHeadersSchema>;

export const decodeTXQuerySchema = yup.object({
    raw_logs: yup.string().oneOf(["false", "true"]),
    min_usd: yup.number().min(0),
});

export type DecodeTXQuery = yup.InferType<typeof decodeTXQuerySchema>;
