const idl = {
  address: process.env.MERKLE_DISTRIBUTION_PROGRAM_ID,
  metadata: {
    name: 'merkle_distribution',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'SPL Token distribution using Merkle trees',
  },
  instructions: [
    {
      name: 'add_operator',
      docs: ['Add an operator (admin only)'],
      discriminator: [149, 142, 187, 68, 33, 250, 87, 105],
      accounts: [
        {
          name: 'config',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103],
              },
            ],
          },
        },
        {
          name: 'admin',
          signer: true,
          relations: ['config'],
        },
      ],
      args: [
        {
          name: 'operator',
          type: 'pubkey',
        },
      ],
    },
    {
      name: 'claim',
      docs: ['Claim tokens using a valid Merkle proof (anyone with valid proof)'],
      discriminator: [62, 198, 214, 193, 213, 159, 108, 210],
      accounts: [
        {
          name: 'config',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103],
              },
            ],
          },
        },
        {
          name: 'merkle_tree',
          writable: true,
        },
        {
          name: 'vault',
          writable: true,
        },
        {
          name: 'claim_status',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 108, 97, 105, 109, 45, 115, 116, 97, 116, 117, 115],
              },
              {
                kind: 'account',
                path: 'merkle_tree',
              },
              {
                kind: 'account',
                path: 'user',
              },
            ],
          },
        },
        {
          name: 'destination',
          writable: true,
        },
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'rent',
          address: 'SysvarRent111111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
        {
          name: 'proof',
          type: {
            vec: {
              array: ['u8', 32],
            },
          },
        },
      ],
    },
    {
      name: 'create_tree',
      docs: ['Create a new Merkle tree for distribution (operator only)'],
      discriminator: [165, 83, 136, 142, 89, 202, 47, 220],
      accounts: [
        {
          name: 'config',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103],
              },
            ],
          },
        },
        {
          name: 'merkle_tree',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [109, 101, 114, 107, 108, 101, 45, 116, 114, 101, 101],
              },
              {
                kind: 'account',
                path: 'config.tree_count',
                account: 'Config',
              },
            ],
          },
        },
        {
          name: 'mint',
        },
        {
          name: 'vault',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [118, 97, 117, 108, 116],
              },
              {
                kind: 'account',
                path: 'merkle_tree',
              },
            ],
          },
        },
        {
          name: 'operator',
          writable: true,
          signer: true,
        },
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'rent',
          address: 'SysvarRent111111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'merkle_root',
          type: {
            array: ['u8', 32],
          },
        },
        {
          name: 'start_ts',
          type: 'i64',
        },
        {
          name: 'end_ts',
          type: {
            option: 'i64',
          },
        },
      ],
    },
    {
      name: 'deposit_tokens',
      docs: ['Deposit tokens into a Merkle tree vault (operator only)'],
      discriminator: [176, 83, 229, 18, 191, 143, 176, 150],
      accounts: [
        {
          name: 'config',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103],
              },
            ],
          },
        },
        {
          name: 'merkle_tree',
          writable: true,
        },
        {
          name: 'source',
          writable: true,
        },
        {
          name: 'vault',
          writable: true,
        },
        {
          name: 'operator',
          writable: true,
          signer: true,
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'end_tree',
      docs: ['End a distribution tree early (admin only)'],
      discriminator: [163, 41, 179, 118, 246, 19, 61, 12],
      accounts: [
        {
          name: 'config',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103],
              },
            ],
          },
        },
        {
          name: 'merkle_tree',
          writable: true,
        },
        {
          name: 'admin',
          signer: true,
          relations: ['config'],
        },
      ],
      args: [],
    },
    {
      name: 'initialize',
      docs: ['Initialize the program with admin and max distribution amount'],
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: 'config',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103],
              },
            ],
          },
        },
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'admin',
          type: 'pubkey',
        },
        {
          name: 'max_distribute_per_tree',
          type: 'u64',
        },
      ],
    },
    {
      name: 'remove_operator',
      docs: ['Remove an operator (admin only)'],
      discriminator: [84, 183, 126, 251, 137, 150, 214, 134],
      accounts: [
        {
          name: 'config',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103],
              },
            ],
          },
        },
        {
          name: 'admin',
          signer: true,
          relations: ['config'],
        },
      ],
      args: [
        {
          name: 'operator',
          type: 'pubkey',
        },
      ],
    },
    {
      name: 'set_admin',
      docs: ['Set a new admin (admin only)'],
      discriminator: [251, 163, 0, 52, 91, 194, 187, 92],
      accounts: [
        {
          name: 'config',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103],
              },
            ],
          },
        },
        {
          name: 'admin',
          signer: true,
          relations: ['config'],
        },
      ],
      args: [
        {
          name: 'new_admin',
          type: 'pubkey',
        },
      ],
    },
    {
      name: 'set_max_distribute_per_tree',
      docs: ['Set the maximum distribution amount per tree (admin only)'],
      discriminator: [55, 208, 179, 107, 68, 162, 191, 215],
      accounts: [
        {
          name: 'config',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103],
              },
            ],
          },
        },
        {
          name: 'admin',
          signer: true,
          relations: ['config'],
        },
      ],
      args: [
        {
          name: 'max_distribute_per_tree',
          type: 'u64',
        },
      ],
    },
    {
      name: 'withdraw_tokens',
      docs: ['Withdraw tokens from a tree vault (admin only)'],
      discriminator: [2, 4, 225, 61, 19, 182, 106, 170],
      accounts: [
        {
          name: 'config',
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [99, 111, 110, 102, 105, 103],
              },
            ],
          },
        },
        {
          name: 'merkle_tree',
          writable: true,
        },
        {
          name: 'vault',
          writable: true,
        },
        {
          name: 'destination',
          writable: true,
        },
        {
          name: 'admin',
          writable: true,
          signer: true,
          relations: ['config'],
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'ClaimStatus',
      discriminator: [22, 183, 249, 157, 247, 95, 150, 96],
    },
    {
      name: 'Config',
      discriminator: [155, 12, 170, 224, 30, 250, 204, 130],
    },
    {
      name: 'MerkleTree',
      discriminator: [98, 51, 51, 226, 162, 20, 73, 212],
    },
  ],
  events: [
    {
      name: 'AdminSet',
      discriminator: [157, 245, 205, 226, 118, 125, 183, 97],
    },
    {
      name: 'ConfigInitialized',
      discriminator: [181, 49, 200, 156, 19, 167, 178, 91],
    },
    {
      name: 'MaxDistributionSet',
      discriminator: [237, 87, 93, 110, 231, 10, 136, 26],
    },
    {
      name: 'OperatorAdded',
      discriminator: [216, 247, 101, 54, 51, 70, 215, 192],
    },
    {
      name: 'OperatorRemoved',
      discriminator: [223, 10, 131, 23, 165, 154, 14, 191],
    },
    {
      name: 'TokensClaimed',
      discriminator: [25, 128, 244, 55, 241, 136, 200, 91],
    },
    {
      name: 'TokensDeposited',
      discriminator: [196, 217, 199, 88, 35, 117, 60, 96],
    },
    {
      name: 'TokensWithdrawn',
      discriminator: [30, 116, 110, 147, 87, 89, 9, 158],
    },
    {
      name: 'TreeCreated',
      discriminator: [42, 82, 14, 91, 246, 61, 231, 67],
    },
    {
      name: 'TreeEnded',
      discriminator: [254, 2, 217, 121, 4, 46, 199, 107],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidAdmin',
      msg: 'Invalid admin',
    },
    {
      code: 6001,
      name: 'InvalidOperator',
      msg: 'Invalid operator',
    },
    {
      code: 6002,
      name: 'MaxOperatorsReached',
      msg: 'Max operators reached',
    },
    {
      code: 6003,
      name: 'OperatorNotFound',
      msg: 'Operator not found',
    },
    {
      code: 6004,
      name: 'Unauthorized',
      msg: 'Unauthorized access',
    },
    {
      code: 6005,
      name: 'InvalidMaxDistributionAmount',
      msg: 'Invalid max distribution amount',
    },
    {
      code: 6006,
      name: 'DistributionExceedsMaximum',
      msg: 'Distribution amount exceeds maximum',
    },
    {
      code: 6007,
      name: 'InvalidStartDate',
      msg: 'Invalid start date',
    },
    {
      code: 6008,
      name: 'InvalidEndDate',
      msg: 'Invalid end date',
    },
    {
      code: 6009,
      name: 'DistributionNotActive',
      msg: 'Distribution not active',
    },
    {
      code: 6010,
      name: 'DistributionAlreadyEnded',
      msg: 'Distribution already ended',
    },
    {
      code: 6011,
      name: 'AlreadyClaimed',
      msg: 'Distribution already claimed',
    },
    {
      code: 6012,
      name: 'InvalidMerkleProof',
      msg: 'Invalid Merkle proof',
    },
    {
      code: 6013,
      name: 'InsufficientTokenBalance',
      msg: 'Insufficient token balance',
    },
    {
      code: 6014,
      name: 'InvalidDistributionAmount',
      msg: 'Invalid distribution amount',
    },
    {
      code: 6015,
      name: 'CalculationOverflow',
      msg: 'Calculation overflow',
    },
    {
      code: 6016,
      name: 'InvalidTokenAccountOwner',
      msg: 'Invalid token account owner',
    },
    {
      code: 6017,
      name: 'InvalidTokenAccountMint',
      msg: 'Invalid token account mint',
    },
    {
      code: 6018,
      name: 'DistributionTreeNotFound',
      msg: 'Distribution tree not found',
    },
  ],
  types: [
    {
      name: 'AdminSet',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'admin',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'ClaimStatus',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'tree_id',
            type: 'u64',
          },
          {
            name: 'user',
            type: 'pubkey',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'claimed',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'Config',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'admin',
            type: 'pubkey',
          },
          {
            name: 'operators',
            type: {
              array: [
                {
                  option: 'pubkey',
                },
                10,
              ],
            },
          },
          {
            name: 'max_distribute_per_tree',
            type: 'u64',
          },
          {
            name: 'tree_count',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'ConfigInitialized',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'admin',
            type: 'pubkey',
          },
          {
            name: 'max_distribute_per_tree',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'MaxDistributionSet',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'max_distribute_per_tree',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'MerkleTree',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'id',
            type: 'u64',
          },
          {
            name: 'merkle_root',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'mint',
            type: 'pubkey',
          },
          {
            name: 'vault',
            type: 'pubkey',
          },
          {
            name: 'start_ts',
            type: 'i64',
          },
          {
            name: 'end_ts',
            type: {
              option: 'i64',
            },
          },
          {
            name: 'total_amount',
            type: 'u64',
          },
          {
            name: 'distributed_amount',
            type: 'u64',
          },
          {
            name: 'is_active',
            type: 'bool',
          },
          {
            name: 'operator',
            type: 'pubkey',
          },
          {
            name: 'bump',
            type: 'u8',
          },
        ],
      },
    },
    {
      name: 'OperatorAdded',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'operator',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'OperatorRemoved',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'operator',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'TokensClaimed',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'tree_id',
            type: 'u64',
          },
          {
            name: 'recipient',
            type: 'pubkey',
          },
          {
            name: 'amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'TokensDeposited',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'tree_id',
            type: 'u64',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'operator',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'TokensWithdrawn',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'tree_id',
            type: 'u64',
          },
          {
            name: 'amount',
            type: 'u64',
          },
          {
            name: 'admin',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'TreeCreated',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'tree_id',
            type: 'u64',
          },
          {
            name: 'merkle_root',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'mint',
            type: 'pubkey',
          },
          {
            name: 'start_ts',
            type: 'i64',
          },
          {
            name: 'end_ts',
            type: {
              option: 'i64',
            },
          },
          {
            name: 'operator',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'TreeEnded',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'tree_id',
            type: 'u64',
          },
          {
            name: 'admin',
            type: 'pubkey',
          },
        ],
      },
    },
  ],
}

export default idl
