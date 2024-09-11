import { type Configs } from "../../decoder.types";
import { ChainName } from "@covalenthq/client-sdk";

const configs: Configs = [
    {
        protocol_name: "4337-entry-point",
        address: "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789",
        is_factory: false,
        chain_name: ChainName.MATIC_MAINNET,
    },
    {
        protocol_name: "4337-entry-point",
        address: "0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789",
        is_factory: false,
        chain_name: ChainName.AVALANCHE_MAINNET,
    },
];

export default configs;
