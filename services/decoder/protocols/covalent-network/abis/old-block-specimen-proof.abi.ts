export const oldBlockSpecimenProofABI = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "threshold",
                type: "uint64",
            },
        ],
        name: "BlockHeightSubmissionThresholdChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "blockHeight",
                type: "uint64",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "blockHash",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "specimenHash",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "string",
                name: "storageURL",
                type: "string",
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "submittedStake",
                type: "uint128",
            },
        ],
        name: "BlockSpecimenProductionProofSubmitted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                indexed: true,
                internalType: "uint64",
                name: "blockHeight",
                type: "uint64",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "blockhash",
                type: "bytes32",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "specimenhash",
                type: "bytes32",
            },
        ],
        name: "BlockSpecimenRewardAwarded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint128",
                name: "newBlockSpecimenRewardAllocation",
                type: "uint128",
            },
        ],
        name: "BlockSpecimenRewardChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blockOnTargetChain",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "blockOnCurrentChain",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "secondsPerBlock",
                type: "uint256",
            },
        ],
        name: "ChainSyncDataChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "maxSubmissions",
                type: "uint256",
            },
        ],
        name: "MaxSubmissionsPerBlockHeightChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint128",
                name: "newStakeRequirement",
                type: "uint128",
            },
        ],
        name: "MinimumRequiredStakeChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                indexed: true,
                internalType: "uint64",
                name: "nthBlock",
                type: "uint64",
            },
        ],
        name: "NthBlockChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "validatorId",
                type: "uint128",
            },
            {
                indexed: false,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "OperatorAdded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "OperatorDisabled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "OperatorEnabled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "OperatorRemoved",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "blockHeight",
                type: "uint64",
            },
        ],
        name: "QuorumNotReached",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint64",
                name: "secondsPerBlock",
                type: "uint64",
            },
        ],
        name: "SecondsPerBlockChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                indexed: true,
                internalType: "uint64",
                name: "blockHeight",
                type: "uint64",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "deadline",
                type: "uint64",
            },
        ],
        name: "SessionStarted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint64",
                name: "newSessionDuration",
                type: "uint64",
            },
        ],
        name: "SpecimenSessionDurationChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint64",
                name: "minSubmissions",
                type: "uint64",
            },
        ],
        name: "SpecimenSessionMinSubmissionChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "newQuorumThreshold",
                type: "uint256",
            },
        ],
        name: "SpecimenSessionQuorumChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "newInterfaceAddress",
                type: "address",
            },
        ],
        name: "StakingInterfaceChanged",
        type: "event",
    },
    {
        inputs: [],
        name: "AUDITOR_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "BLOCK_SPECIMEN_PRODUCER_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "GOVERNANCE_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "auditor",
                type: "address",
            },
        ],
        name: "addAuditor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "uint128",
                name: "validatorId",
                type: "uint128",
            },
        ],
        name: "addBSPOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "governor",
                type: "address",
            },
        ],
        name: "addGovernor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "validator",
                type: "address",
            },
            {
                internalType: "uint128",
                name: "commissionRate",
                type: "uint128",
            },
        ],
        name: "addValidator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                internalType: "uint64",
                name: "blockHeight",
                type: "uint64",
            },
            {
                internalType: "bytes32",
                name: "blockHash",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "definitiveSpecimenHash",
                type: "bytes32",
            },
        ],
        name: "arbitrateBlockSpecimenSession",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "disableBSPOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "validatorId",
                type: "uint128",
            },
            {
                internalType: "uint256",
                name: "blockNumber",
                type: "uint256",
            },
        ],
        name: "disableValidator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "enableBSPOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                internalType: "uint64",
                name: "blockHeight",
                type: "uint64",
            },
        ],
        name: "finalizeAndRewardSpecimenSession",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "getAllOperators",
        outputs: [
            {
                internalType: "address[]",
                name: "_bsps",
                type: "address[]",
            },
            {
                internalType: "address[]",
                name: "__governors",
                type: "address[]",
            },
            {
                internalType: "address[]",
                name: "__auditors",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getBSPRoleData",
        outputs: [
            {
                internalType: "uint128",
                name: "requiredStake",
                type: "uint128",
            },
            {
                internalType: "address[]",
                name: "activeMembers",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
        ],
        name: "getChainData",
        outputs: [
            {
                internalType: "uint256",
                name: "blockOnTargetChain",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "blockOnCurrentChain",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "secondsPerBlock",
                type: "uint256",
            },
            {
                internalType: "uint128",
                name: "allowedThreshold",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "maxSubmissionsPerBlockHeight",
                type: "uint128",
            },
            {
                internalType: "uint64",
                name: "nthBlock",
                type: "uint64",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "getMetadata",
        outputs: [
            {
                internalType: "address",
                name: "stakingInterface",
                type: "address",
            },
            {
                internalType: "uint128",
                name: "blockSpecimenRewardAllocation",
                type: "uint128",
            },
            {
                internalType: "uint64",
                name: "blockSpecimenSessionDuration",
                type: "uint64",
            },
            {
                internalType: "uint64",
                name: "minSubmissionsRequired",
                type: "uint64",
            },
            {
                internalType: "uint256",
                name: "blockSpecimenQuorum",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "secondsPerBlock",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "validatorId",
                type: "uint128",
            },
        ],
        name: "getOperators",
        outputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "initialOwner",
                type: "address",
            },
            {
                internalType: "address",
                name: "stakingContract",
                type: "address",
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isEnabled",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "operatorRoles",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "auditor",
                type: "address",
            },
        ],
        name: "removeAuditor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "removeBSPOperator",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "governor",
                type: "address",
            },
        ],
        name: "removeGovernor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "newStakeAmount",
                type: "uint128",
            },
        ],
        name: "setBSPRequiredStake",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                internalType: "uint64",
                name: "threshold",
                type: "uint64",
            },
        ],
        name: "setBlockHeightSubmissionsThreshold",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint128",
                name: "newBlockSpecimenReward",
                type: "uint128",
            },
        ],
        name: "setBlockSpecimenReward",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "newSessionDuration",
                type: "uint64",
            },
        ],
        name: "setBlockSpecimenSessionDuration",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                internalType: "uint256",
                name: "blockOnTargetChain",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "blockOnCurrentChain",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "secondsPerBlock",
                type: "uint256",
            },
        ],
        name: "setChainSyncData",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                internalType: "uint64",
                name: "maxSubmissions",
                type: "uint64",
            },
        ],
        name: "setMaxSubmissionsPerBlockHeight",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "minSubmissions",
                type: "uint64",
            },
        ],
        name: "setMinSubmissionsRequired",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                internalType: "uint64",
                name: "n",
                type: "uint64",
            },
        ],
        name: "setNthBlock",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "quorum",
                type: "uint256",
            },
        ],
        name: "setQuorumThreshold",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "secondsPerBlock",
                type: "uint64",
            },
        ],
        name: "setSecondsPerBlock",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "stakingContractAddress",
                type: "address",
            },
        ],
        name: "setStakingInterface",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "chainId",
                type: "uint64",
            },
            {
                internalType: "uint64",
                name: "blockHeight",
                type: "uint64",
            },
            {
                internalType: "bytes32",
                name: "blockHash",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "specimenHash",
                type: "bytes32",
            },
            {
                internalType: "string",
                name: "storageURL",
                type: "string",
            },
        ],
        name: "submitBlockSpecimenProof",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "validatorIDs",
        outputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
] as const;
