import { Chains } from "@covalenthq/client-sdk";
import * as yup from "yup";

export const decodeTXRequestSchema = yup.object({
    chain_name: yup
        .mixed()
        .oneOf(Object.values(Chains), "chain_name is incorrect")
        .required("chain_name is required"),
    tx_hash: yup.string().trim().required("tx_hash is required"),
});

export type DecodeTXRequest = yup.InferType<typeof decodeTXRequestSchema>;

export const decodeTXHeadersSchema = yup.object({
    "x-covalent-api-key": yup
        .string()
        .trim()
        .required("x-covalent-api-key is required"),
});

export type DecodeTXHeaders = yup.InferType<typeof decodeTXHeadersSchema>;
