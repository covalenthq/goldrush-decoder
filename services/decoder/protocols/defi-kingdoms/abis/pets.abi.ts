export const petsABI = [
    {
        anonymous: false,
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "facetAddress",
                        type: "address",
                    },
                    {
                        internalType: "enum IDiamondCut.FacetCutAction",
                        name: "action",
                        type: "uint8",
                    },
                    {
                        internalType: "bytes4[]",
                        name: "functionSelectors",
                        type: "bytes4[]",
                    },
                ],
                indexed: false,
                internalType: "struct IDiamondCut.FacetCut[]",
                name: "_diamondCut",
                type: "tuple[]",
            },
            {
                indexed: false,
                internalType: "address",
                name: "_init",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "_calldata",
                type: "bytes",
            },
        ],
        name: "DiamondCut",
        type: "event",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "facetAddress",
                        type: "address",
                    },
                    {
                        internalType: "enum IDiamondCut.FacetCutAction",
                        name: "action",
                        type: "uint8",
                    },
                    {
                        internalType: "bytes4[]",
                        name: "functionSelectors",
                        type: "bytes4[]",
                    },
                ],
                internalType: "struct IDiamondCut.FacetCut[]",
                name: "_diamondCut",
                type: "tuple[]",
            },
            {
                internalType: "address",
                name: "_init",
                type: "address",
            },
            {
                internalType: "bytes",
                name: "_calldata",
                type: "bytes",
            },
        ],
        name: "diamondCut",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "_functionSelector",
                type: "bytes4",
            },
        ],
        name: "facetAddress",
        outputs: [
            {
                internalType: "address",
                name: "facetAddress_",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "facetAddresses",
        outputs: [
            {
                internalType: "address[]",
                name: "facetAddresses_",
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
                name: "_facet",
                type: "address",
            },
        ],
        name: "facetFunctionSelectors",
        outputs: [
            {
                internalType: "bytes4[]",
                name: "facetFunctionSelectors_",
                type: "bytes4[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "facets",
        outputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "facetAddress",
                        type: "address",
                    },
                    {
                        internalType: "bytes4[]",
                        name: "functionSelectors",
                        type: "bytes4[]",
                    },
                ],
                internalType: "struct IDiamondLoupe.Facet[]",
                name: "facets_",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "_interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
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
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "owner_",
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
                name: "_newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "version",
                type: "uint8",
            },
        ],
        name: "Initialized",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Paused",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "petId",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint8",
                        name: "originId",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint8",
                        name: "season",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "element",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "bonusCount",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "appearance",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "background",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "shiny",
                        type: "uint8",
                    },
                    {
                        internalType: "uint64",
                        name: "hungryAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "equippableAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint256",
                        name: "equippedTo",
                        type: "uint256",
                    },
                ],
                indexed: false,
                internalType: "struct Pet",
                name: "pet",
                type: "tuple",
            },
        ],
        name: "PetHatched",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "petId",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint8",
                        name: "originId",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint8",
                        name: "season",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "element",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "bonusCount",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "appearance",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "background",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "shiny",
                        type: "uint8",
                    },
                    {
                        internalType: "uint64",
                        name: "hungryAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "equippableAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint256",
                        name: "equippedTo",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "fedBy",
                        type: "address",
                    },
                    {
                        internalType: "enum PetFoodType",
                        name: "foodType",
                        type: "uint8",
                    },
                ],
                indexed: false,
                internalType: "struct PetV2",
                name: "pet",
                type: "tuple",
            },
        ],
        name: "PetHatchedV2",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "petId",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint8",
                        name: "originId",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint8",
                        name: "season",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "element",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "bonusCount",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "appearance",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "background",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "shiny",
                        type: "uint8",
                    },
                    {
                        internalType: "uint64",
                        name: "hungryAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "equippableAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint256",
                        name: "equippedTo",
                        type: "uint256",
                    },
                ],
                indexed: false,
                internalType: "struct Pet",
                name: "pet",
                type: "tuple",
            },
        ],
        name: "PetUpdated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "petId",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint8",
                        name: "originId",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint8",
                        name: "season",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "element",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "bonusCount",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "appearance",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "background",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "shiny",
                        type: "uint8",
                    },
                    {
                        internalType: "uint64",
                        name: "hungryAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "equippableAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint256",
                        name: "equippedTo",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "fedBy",
                        type: "address",
                    },
                    {
                        internalType: "enum PetFoodType",
                        name: "foodType",
                        type: "uint8",
                    },
                ],
                indexed: false,
                internalType: "struct PetV2",
                name: "pet",
                type: "tuple",
            },
        ],
        name: "PetUpdatedV2",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "Unpaused",
        type: "event",
    },
    {
        inputs: [],
        name: "BRIDGE_ROLE",
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
        name: "DEFAULT_ADMIN_ROLE",
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
        name: "MINTER_ROLE",
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
        name: "MODERATOR_ROLE",
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
        name: "PET_MODERATOR_ROLE",
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
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "baseHungryTime",
        outputs: [
            {
                internalType: "uint64",
                name: "",
                type: "uint64",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "bonusCount",
        outputs: [
            {
                internalType: "uint32",
                name: "",
                type: "uint32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
        ],
        name: "bridgeMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAdmin",
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
        name: "gold",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRole",
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
        inputs: [],
        name: "heroCore",
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "heroToPet",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
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
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "nextPetId",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
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
        inputs: [],
        name: "pause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "paused",
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
        inputs: [],
        name: "powerUpManager",
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
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "_data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
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
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint64",
                name: "_baseHungryTime",
                type: "uint64",
            },
        ],
        name: "setBaseHungryTime",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_gold",
                type: "address",
            },
        ],
        name: "setGold",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_heroCore",
                type: "address",
            },
        ],
        name: "setHeroCore",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "enum TreatType",
                name: "_treatType",
                type: "uint8",
            },
            {
                internalType: "address[]",
                name: "_ingredients",
                type: "address[]",
            },
            {
                internalType: "uint256[]",
                name: "_ingredientAmounts",
                type: "uint256[]",
            },
        ],
        name: "setIngredients",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_nextPetId",
                type: "uint256",
            },
        ],
        name: "setNextPetId",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_powerUpManager",
                type: "address",
            },
        ],
        name: "setPowerUpManager",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "enum TreatType",
                name: "_treatType",
                type: "uint8",
            },
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
            {
                internalType: "bool",
                name: "_active",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "_goldCost",
                type: "uint256",
            },
        ],
        name: "setTreatType",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenByIndex",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "enum TreatType",
                name: "",
                type: "uint8",
            },
        ],
        name: "treatInfo",
        outputs: [
            {
                internalType: "address",
                name: "treatAddress",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "goldCost",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "isActive",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "enum TreatType",
                name: "",
                type: "uint8",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "treatIngredientRequirements",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "unpause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "ReentrancyGuard__ReentrantCall",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "player",
                type: "address",
            },
            {
                indexed: false,
                internalType: "enum TreatType",
                name: "treatType",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "quantity",
                type: "uint256",
            },
        ],
        name: "BonusTreatsAwarded",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "fedBy",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "petId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "enum PetFoodType",
                name: "foodType",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "hungryAt",
                type: "uint256",
            },
        ],
        name: "PetFed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "player",
                type: "address",
            },
            {
                indexed: false,
                internalType: "enum TreatType",
                name: "treatType",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "quantity",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "item1",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "item2",
                type: "address",
            },
        ],
        name: "TreatCrafted",
        type: "event",
    },
    {
        inputs: [],
        name: "PREMIUM_PROVISIONS",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "enum TreatType",
                        name: "treatType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "treatQuantity",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "item1",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "item2",
                        type: "address",
                    },
                ],
                internalType: "struct TreatCraftingInput[]",
                name: "_treatData",
                type: "tuple[]",
            },
        ],
        name: "craftTreats",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "petId",
                        type: "uint256",
                    },
                    {
                        internalType: "enum TreatType",
                        name: "treatType",
                        type: "uint8",
                    },
                ],
                internalType: "struct PetFeedingInput[]",
                name: "_feedData",
                type: "tuple[]",
            },
        ],
        name: "feedPets",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "petId",
                        type: "uint256",
                    },
                    {
                        internalType: "enum TreatType",
                        name: "treatType",
                        type: "uint8",
                    },
                ],
                internalType: "struct PetFeedingInput[]",
                name: "_feedData",
                type: "tuple[]",
            },
            {
                internalType: "address",
                name: "_account",
                type: "address",
            },
        ],
        name: "feedPetsOnBehalf",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "_heroIds",
                type: "uint256[]",
            },
        ],
        name: "getDuelPetData",
        outputs: [
            {
                internalType: "uint256[]",
                name: "",
                type: "uint256[]",
            },
            {
                internalType: "uint8[]",
                name: "",
                type: "uint8[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_heroId",
                type: "uint256",
            },
        ],
        name: "isHeroPetHungry",
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
                internalType: "uint256",
                name: "_petId",
                type: "uint256",
            },
        ],
        name: "isPetHungry",
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
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "getPet",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint8",
                        name: "originId",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint8",
                        name: "season",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "element",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "bonusCount",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "appearance",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "background",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "shiny",
                        type: "uint8",
                    },
                    {
                        internalType: "uint64",
                        name: "hungryAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "equippableAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint256",
                        name: "equippedTo",
                        type: "uint256",
                    },
                ],
                internalType: "struct Pet",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "getPetFedState",
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
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "getPetQuestData",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint64",
                        name: "hungryAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "enum PetFoodType",
                        name: "foodType",
                        type: "uint8",
                    },
                ],
                internalType: "struct PetQuestData",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_id",
                type: "uint256",
            },
        ],
        name: "getPetV2",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint8",
                        name: "originId",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint8",
                        name: "season",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "element",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "bonusCount",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "appearance",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "background",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "shiny",
                        type: "uint8",
                    },
                    {
                        internalType: "uint64",
                        name: "hungryAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "equippableAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint256",
                        name: "equippedTo",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "fedBy",
                        type: "address",
                    },
                    {
                        internalType: "enum PetFoodType",
                        name: "foodType",
                        type: "uint8",
                    },
                ],
                internalType: "struct PetV2",
                name: "",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256[]",
                name: "_ids",
                type: "uint256[]",
            },
        ],
        name: "getPetsV2",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint8",
                        name: "originId",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint8",
                        name: "season",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "element",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "bonusCount",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "appearance",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "background",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "shiny",
                        type: "uint8",
                    },
                    {
                        internalType: "uint64",
                        name: "hungryAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "equippableAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint256",
                        name: "equippedTo",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "fedBy",
                        type: "address",
                    },
                    {
                        internalType: "enum PetFoodType",
                        name: "foodType",
                        type: "uint8",
                    },
                ],
                internalType: "struct PetV2[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "getUserPets",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint8",
                        name: "originId",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint8",
                        name: "season",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "element",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "bonusCount",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "appearance",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "background",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "shiny",
                        type: "uint8",
                    },
                    {
                        internalType: "uint64",
                        name: "hungryAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "equippableAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint256",
                        name: "equippedTo",
                        type: "uint256",
                    },
                ],
                internalType: "struct Pet[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_address",
                type: "address",
            },
        ],
        name: "getUserPetsV2",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint8",
                        name: "originId",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint8",
                        name: "season",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "element",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "bonusCount",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "appearance",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "background",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "shiny",
                        type: "uint8",
                    },
                    {
                        internalType: "uint64",
                        name: "hungryAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "equippableAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint256",
                        name: "equippedTo",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "fedBy",
                        type: "address",
                    },
                    {
                        internalType: "enum PetFoodType",
                        name: "foodType",
                        type: "uint8",
                    },
                ],
                internalType: "struct PetV2[]",
                name: "",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint8",
                        name: "originId",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint8",
                        name: "season",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "element",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "bonusCount",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "appearance",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "background",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "shiny",
                        type: "uint8",
                    },
                ],
                internalType: "struct PetOptions",
                name: "_petOptions",
                type: "tuple",
            },
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "hatchPet",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "_from",
                type: "address",
            },
            {
                internalType: "address",
                name: "_to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_petId",
                type: "uint256",
            },
        ],
        name: "transferPetOnBehalf",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint8",
                        name: "originId",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint8",
                        name: "season",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "element",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "bonusCount",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "appearance",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "background",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "shiny",
                        type: "uint8",
                    },
                    {
                        internalType: "uint64",
                        name: "hungryAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "equippableAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint256",
                        name: "equippedTo",
                        type: "uint256",
                    },
                ],
                internalType: "struct Pet",
                name: "_pet",
                type: "tuple",
            },
        ],
        name: "updatePet",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "id",
                        type: "uint256",
                    },
                    {
                        internalType: "uint8",
                        name: "originId",
                        type: "uint8",
                    },
                    {
                        internalType: "string",
                        name: "name",
                        type: "string",
                    },
                    {
                        internalType: "uint8",
                        name: "season",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "eggType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "rarity",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "element",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "bonusCount",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "profBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "craftBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonus",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "combatBonusScalar",
                        type: "uint8",
                    },
                    {
                        internalType: "uint16",
                        name: "appearance",
                        type: "uint16",
                    },
                    {
                        internalType: "uint8",
                        name: "background",
                        type: "uint8",
                    },
                    {
                        internalType: "uint8",
                        name: "shiny",
                        type: "uint8",
                    },
                    {
                        internalType: "uint64",
                        name: "hungryAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint64",
                        name: "equippableAt",
                        type: "uint64",
                    },
                    {
                        internalType: "uint256",
                        name: "equippedTo",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "fedBy",
                        type: "address",
                    },
                    {
                        internalType: "enum PetFoodType",
                        name: "foodType",
                        type: "uint8",
                    },
                ],
                internalType: "struct PetV2",
                name: "_pet",
                type: "tuple",
            },
        ],
        name: "updatePetV2",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
] as const;
