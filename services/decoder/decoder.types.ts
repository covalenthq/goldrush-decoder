import {
    type CovalentClient,
    type Chain,
    type LogEvent,
} from "@covalenthq/client-sdk";
import {
    type DECODED_ACTION,
    type DECODED_EVENT_CATEGORY,
} from "./decoder.constants";

export type Config = {
    protocol_name: string;
    network: Chain;
    address: string;
    is_factory: boolean;
};

export interface EventType {
    category: DECODED_EVENT_CATEGORY;
    action: DECODED_ACTION;
    name: string;
    protocol?: {
        name: string;
        logo: string;
    };
    tokens?: {
        heading: string;
        value: string;
        decimals: number;
        ticker_symbol: string | null;
        ticker_logo: string | null;
        pretty: string;
    }[];
    nfts?: {
        heading: string;
        collection_name: string | null;
        token_identifier: string | null;
        collection_address: string;
        images: {
            default: string | null;
            256: string | null;
            512: string | null;
            1024: string | null;
        };
    }[];
    details?: {
        title: string;
        value: string;
    }[];
}

export type DecodingFunction = (
    log: LogEvent,
    chain_name: Chain,
    covalent_client: CovalentClient
) => Promise<EventType>;

export type Decoders = {
    [network: string]: {
        [address: string]: {
            [topic0_hash: string]: DecodingFunction;
        };
    };
};
