import {
    type DECODED_ACTION,
    type DECODED_EVENT_CATEGORY,
} from "./decoder.constants";
import {
    type Chain,
    type ChainName,
    type GoldRushClient,
    type LogEvent,
    type Nullable,
    type Transaction,
} from "@covalenthq/client-sdk";

export type Configs = {
    protocol_name: string;
    chain_name: ChainName | `${ChainName}`;
    address: string;
    is_factory: boolean;
}[];

export type EventDetails = Nullable<{
    heading: string;
    value: string;
    type: "address" | "text";
}>[];

export type EventNFTs = Nullable<{
    heading: string;
    collection_name: string;
    token_identifier: string;
    collection_address: string;
    images: Nullable<{
        default: string;
        256: string;
        512: string;
        1024: string;
    }>;
}>[];

export type EventTokens = Nullable<{
    heading: string;
    value: string;
    decimals: number;
    ticker_symbol: string;
    ticker_logo: string;
    pretty_quote: string;
}>[];

export type EventType = Nullable<{
    category: DECODED_EVENT_CATEGORY;
    action: DECODED_ACTION;
    name: string;
    protocol?: Nullable<{
        name: string;
        logo: string;
    }>;
    tokens?: EventTokens;
    nfts?: EventNFTs;
    details?: EventDetails;
    raw_log?: LogEvent;
}>;

export interface QueryOptions {
    raw_logs?: boolean;
    min_usd?: number;
}

export type DecodingFunction = (
    log_event: LogEvent,
    tx: Transaction,
    chain_name: Chain,
    goldrush_client: GoldRushClient,
    options: QueryOptions
) => Promise<EventType | null>;

export type NativeDecodingFunction = (
    tx: Transaction,
    options: QueryOptions
) => EventType | null;

export type DecoderConfig =
    | {
          [chain_name in ChainName]: {
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
          [chain_name in ChainName]: {
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
