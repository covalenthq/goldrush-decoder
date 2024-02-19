import {
    type CovalentClient,
    type Chain,
    type LogEvent,
    type Transaction,
} from "@covalenthq/client-sdk";
import {
    type DECODED_ACTION,
    type DECODED_EVENT_CATEGORY,
} from "./decoder.constants";

export type Configs = {
    protocol_name: string;
    chain_name: Chain;
    address: string;
    is_factory: boolean;
}[];

export type EventDetails = {
    heading: string;
    value: string;
    type: "address" | "text";
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
    pretty_quote: string;
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
    log_event: LogEvent,
    tx: Transaction,
    chain_name: Chain,
    covalent_client: CovalentClient
) => Promise<EventType>;

export type DecoderConfig =
    | {
          [chain_name in Chain]: {
              [protocol_name: string]: {
                  [address: string]: {
                      is_factory: boolean;
                  };
              };
          };
      }
    | Record<string, never>;

export type Decoders =
    | {
          [chain_name in Chain]: {
              [address: string]: {
                  [topic0_hash: string]: number;
              };
          };
      }
    | Record<string, never>;

export type Fallbacks =
    | {
          [topic0_hash: string]: number;
      }
    | Record<string, never>;

export type DecodingFunctions = DecodingFunction[];
