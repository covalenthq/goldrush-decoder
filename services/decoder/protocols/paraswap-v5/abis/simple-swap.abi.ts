export const simpleSwapABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_partnerSharePercent",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_maxFeePercent",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_paraswapReferralShare",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_paraswapSlippageShare",
                type: "uint256",
            },
            {
                internalType: "contract IFeeClaimer",
                name: "_feeClaimer",
                type: "address",
            },
            {
                internalType: "address",
                name: "_augustusRFQ",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes16",
                name: "uuid",
                type: "bytes16",
            },
            {
                indexed: false,
                internalType: "address",
                name: "partner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "feePercent",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "initiator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "beneficiary",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "srcToken",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "destToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "srcAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "receivedAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "expectedAmount",
                type: "uint256",
            },
        ],
        name: "BoughtV3",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes16",
                name: "uuid",
                type: "bytes16",
            },
            {
                indexed: false,
                internalType: "address",
                name: "partner",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "feePercent",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "initiator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "beneficiary",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "srcToken",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "destToken",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "srcAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "receivedAmount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "expectedAmount",
                type: "uint256",
            },
        ],
        name: "SwappedV3",
        type: "event",
    },
    {
        inputs: [],
        name: "ROUTER_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "WHITELISTED_ROLE",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "augustusRFQ",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "feeClaimer",
        outputs: [
            {
                internalType: "contract IFeeClaimer",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getKey",
        outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{ internalType: "bytes", name: "", type: "bytes" }],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "maxFeePercent",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "paraswapReferralShare",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "paraswapSlippageShare",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "partnerSharePercent",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "fromToken",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "toToken",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "fromAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "toAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "expectedAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "address[]",
                        name: "callees",
                        type: "address[]",
                    },
                    {
                        internalType: "bytes",
                        name: "exchangeData",
                        type: "bytes",
                    },
                    {
                        internalType: "uint256[]",
                        name: "startIndexes",
                        type: "uint256[]",
                    },
                    {
                        internalType: "uint256[]",
                        name: "values",
                        type: "uint256[]",
                    },
                    {
                        internalType: "address payable",
                        name: "beneficiary",
                        type: "address",
                    },
                    {
                        internalType: "address payable",
                        name: "partner",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "feePercent",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes",
                        name: "permit",
                        type: "bytes",
                    },
                    {
                        internalType: "uint256",
                        name: "deadline",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes16",
                        name: "uuid",
                        type: "bytes16",
                    },
                ],
                internalType: "struct Utils.SimpleData",
                name: "data",
                type: "tuple",
            },
        ],
        name: "simpleBuy",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "fromToken",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "toToken",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "fromAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "toAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "expectedAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "address[]",
                        name: "callees",
                        type: "address[]",
                    },
                    {
                        internalType: "bytes",
                        name: "exchangeData",
                        type: "bytes",
                    },
                    {
                        internalType: "uint256[]",
                        name: "startIndexes",
                        type: "uint256[]",
                    },
                    {
                        internalType: "uint256[]",
                        name: "values",
                        type: "uint256[]",
                    },
                    {
                        internalType: "address payable",
                        name: "beneficiary",
                        type: "address",
                    },
                    {
                        internalType: "address payable",
                        name: "partner",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "feePercent",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes",
                        name: "permit",
                        type: "bytes",
                    },
                    {
                        internalType: "uint256",
                        name: "deadline",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes16",
                        name: "uuid",
                        type: "bytes16",
                    },
                ],
                internalType: "struct Utils.SimpleData",
                name: "data",
                type: "tuple",
            },
        ],
        name: "simpleSwap",
        outputs: [
            {
                internalType: "uint256",
                name: "receivedAmount",
                type: "uint256",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
] as const;
