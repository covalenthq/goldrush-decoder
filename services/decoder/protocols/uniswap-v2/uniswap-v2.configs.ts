import { type Configs } from "../../decoder.types";

const configs: Configs = [
    {
        protocol_name: "uniswap-v2",
        address: "0xaf31fd9c3b0350424bf96e551d2d1264d8466205",
        is_factory: false,
        chain_name: "eth-mainnet",
    },
    {
        address: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
        is_factory: false,
        protocol_name: "uniswap-v2",
        chain_name: "eth-mainnet",
    },
    {
        address: "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
        is_factory: false,
        protocol_name: "uniswap-v2",
        chain_name: "eth-mainnet",
    },
    {
        address: "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f",
        is_factory: true,
        protocol_name: "uniswap-v2",
        chain_name: "eth-mainnet",
    },
    {
        address: "0xcf329b34049033de26e4449aebcb41f1992724d3",
        is_factory: true,
        protocol_name: "uniswap-v2",
        chain_name: "defi-kingdoms-mainnet",
    },
];

export default configs;
