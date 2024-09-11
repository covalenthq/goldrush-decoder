import { currencyToNumber } from "../../../utils/functions";
import { GoldRushDecoder } from "../decoder";
import { DECODED_ACTION, DECODED_EVENT_CATEGORY } from "../decoder.constants";
import { type EventType } from "../decoder.types";

GoldRushDecoder.native((tx, options): EventType | null => {
    if (
        tx.pretty_value_quote &&
        currencyToNumber(tx.pretty_value_quote) < options.min_usd!
    ) {
        return null;
    }

    return {
        action: DECODED_ACTION.NATIVE_TRANSFER,
        category: DECODED_EVENT_CATEGORY.DEX,
        name: "Native Transfer",
        protocol: {
            logo: tx?.gas_metadata?.logo_url || null,
            name: tx?.gas_metadata?.contract_name || null,
        },
        details: [
            {
                heading: "From",
                value: tx.from_address,
                type: "address",
            },
            {
                heading: "To",
                value: tx.to_address,
                type: "address",
            },
        ],
        tokens: [
            {
                heading: "Value",
                value: tx?.value?.toString() || "0",
                decimals: tx?.gas_metadata?.contract_decimals || null,
                pretty_quote: tx?.pretty_value_quote,
                ticker_logo: tx?.gas_metadata?.logo_url || null,
                ticker_symbol: tx?.gas_metadata?.contract_ticker_symbol || null,
            },
        ],
    };
});
