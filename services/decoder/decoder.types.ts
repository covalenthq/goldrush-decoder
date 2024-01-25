import {
    type CovalentClient,
    type Chain,
    type LogEvent,
} from "@covalenthq/client-sdk";
import {
    type DECODED_ACTION,
    type DECODED_EVENT_CATEGORY,
} from "./decoder.constants";

export type Configs = {
    protocol_name: string;
    network: Chain;
    address: string;
    is_factory: boolean;
}[];

export type EventDetails = {
    title: string;
    value: string;
}[];

export type EventNFTs = {
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

export type EventTokens = {
    heading: string;
    value: string;
    decimals: number;
    ticker_symbol: string | null;
    ticker_logo: string | null;
    pretty: string;
}[];

export interface EventType {
    category: DECODED_EVENT_CATEGORY;
    action: DECODED_ACTION;
    name: string;
    protocol?: {
        name: string;
        logo: string;
    };
    tokens?: EventTokens;
    nfts?: EventNFTs;
    details?: EventDetails;
}

export type DecodingFunction = (
    log: LogEvent,
    chain_name: Chain,
    covalent_client: CovalentClient
) => Promise<EventType>;

export type DecoderConfig =
    | {
          [network in Chain]: {
              [protocol_name: string]: {
                  is_factory: boolean;
                  address: string;
              };
          };
      }
    | Record<string, never>;

export type Decoders =
    | {
          [network in Chain]: {
              [address: string]: {
                  [topic0_hash: string]: DecodingFunction;
              };
          };
      }
    | Record<string, never>;
