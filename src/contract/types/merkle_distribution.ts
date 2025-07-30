/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/merkle_distribution.json`.
 */
export type MerkleDistribution = {
  address: '27xdusSYCETzXnC4D4AgXLkBvfiPdEMmUtYMpN4ZD9Sn'
  metadata: {
    name: 'merkleDistribution'
    version: '0.1.0'
    spec: '0.1.0'
    description: 'SPL Token distribution using Merkle trees'
  }
  instructions: [
    {
      name: 'addOperator'
      docs: ['Add an operator (admin only)']
      discriminator: [149, 142, 187, 68, 33, 250, 87, 105]
      accounts: [
        {
          name: 'config'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              },
            ]
          }
        },
        {
          name: 'admin'
          signer: true
          relations: ['config']
        },
      ]
      args: [
        {
          name: 'operator'
          type: 'pubkey'
        },
      ]
    },
    {
      name: 'claim'
      docs: ['Claim tokens using a valid Merkle proof (anyone with valid proof)']
      discriminator: [62, 198, 214, 193, 213, 159, 108, 210]
      accounts: [
        {
          name: 'config'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              },
            ]
          }
        },
        {
          name: 'merkleTree'
          writable: true
        },
        {
          name: 'vault'
          writable: true
        },
        {
          name: 'claimStatus'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 108, 97, 105, 109, 45, 115, 116, 97, 116, 117, 115]
              },
              {
                kind: 'account'
                path: 'merkleTree'
              },
              {
                kind: 'account'
                path: 'user'
              },
            ]
          }
        },
        {
          name: 'destination'
          writable: true
        },
        {
          name: 'user'
          writable: true
          signer: true
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'rent'
          address: 'SysvarRent111111111111111111111111111111111'
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
        {
          name: 'proof'
          type: {
            vec: {
              array: ['u8', 32]
            }
          }
        },
      ]
    },
    {
      name: 'createTree'
      docs: ['Create a new Merkle tree for distribution (operator only)']
      discriminator: [165, 83, 136, 142, 89, 202, 47, 220]
      accounts: [
        {
          name: 'config'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              },
            ]
          }
        },
        {
          name: 'merkleTree'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 101, 114, 107, 108, 101, 45, 116, 114, 101, 101]
              },
              {
                kind: 'account'
                path: 'config.tree_count'
                account: 'config'
              },
            ]
          }
        },
        {
          name: 'mint'
        },
        {
          name: 'vault'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [118, 97, 117, 108, 116]
              },
              {
                kind: 'account'
                path: 'merkleTree'
              },
            ]
          }
        },
        {
          name: 'operator'
          writable: true
          signer: true
        },
        {
          name: 'payer'
          writable: true
          signer: true
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'rent'
          address: 'SysvarRent111111111111111111111111111111111'
        },
      ]
      args: [
        {
          name: 'merkleRoot'
          type: {
            array: ['u8', 32]
          }
        },
        {
          name: 'startTs'
          type: 'i64'
        },
        {
          name: 'endTs'
          type: {
            option: 'i64'
          }
        },
      ]
    },
    {
      name: 'depositTokens'
      docs: ['Deposit tokens into a Merkle tree vault (operator only)']
      discriminator: [176, 83, 229, 18, 191, 143, 176, 150]
      accounts: [
        {
          name: 'config'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              },
            ]
          }
        },
        {
          name: 'merkleTree'
          writable: true
        },
        {
          name: 'source'
          writable: true
        },
        {
          name: 'vault'
          writable: true
        },
        {
          name: 'operator'
          writable: true
          signer: true
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
      ]
    },
    {
      name: 'endTree'
      docs: ['End a distribution tree early (admin only)']
      discriminator: [163, 41, 179, 118, 246, 19, 61, 12]
      accounts: [
        {
          name: 'config'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              },
            ]
          }
        },
        {
          name: 'merkleTree'
          writable: true
        },
        {
          name: 'admin'
          signer: true
          relations: ['config']
        },
      ]
      args: []
    },
    {
      name: 'initialize'
      docs: ['Initialize the program with admin and max distribution amount']
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237]
      accounts: [
        {
          name: 'config'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              },
            ]
          }
        },
        {
          name: 'payer'
          writable: true
          signer: true
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
      ]
      args: [
        {
          name: 'admin'
          type: 'pubkey'
        },
        {
          name: 'maxDistributePerTree'
          type: 'u64'
        },
      ]
    },
    {
      name: 'removeOperator'
      docs: ['Remove an operator (admin only)']
      discriminator: [84, 183, 126, 251, 137, 150, 214, 134]
      accounts: [
        {
          name: 'config'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              },
            ]
          }
        },
        {
          name: 'admin'
          signer: true
          relations: ['config']
        },
      ]
      args: [
        {
          name: 'operator'
          type: 'pubkey'
        },
      ]
    },
    {
      name: 'setAdmin'
      docs: ['Set a new admin (admin only)']
      discriminator: [251, 163, 0, 52, 91, 194, 187, 92]
      accounts: [
        {
          name: 'config'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              },
            ]
          }
        },
        {
          name: 'admin'
          signer: true
          relations: ['config']
        },
      ]
      args: [
        {
          name: 'newAdmin'
          type: 'pubkey'
        },
      ]
    },
    {
      name: 'setMaxDistributePerTree'
      docs: ['Set the maximum distribution amount per tree (admin only)']
      discriminator: [55, 208, 179, 107, 68, 162, 191, 215]
      accounts: [
        {
          name: 'config'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              },
            ]
          }
        },
        {
          name: 'admin'
          signer: true
          relations: ['config']
        },
      ]
      args: [
        {
          name: 'maxDistributePerTree'
          type: 'u64'
        },
      ]
    },
    {
      name: 'withdrawTokens'
      docs: ['Withdraw tokens from a tree vault (admin only)']
      discriminator: [2, 4, 225, 61, 19, 182, 106, 170]
      accounts: [
        {
          name: 'config'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 111, 110, 102, 105, 103]
              },
            ]
          }
        },
        {
          name: 'merkleTree'
          writable: true
        },
        {
          name: 'vault'
          writable: true
        },
        {
          name: 'destination'
          writable: true
        },
        {
          name: 'admin'
          writable: true
          signer: true
          relations: ['config']
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
      ]
    },
  ]
  accounts: [
    {
      name: 'claimStatus'
      discriminator: [22, 183, 249, 157, 247, 95, 150, 96]
    },
    {
      name: 'config'
      discriminator: [155, 12, 170, 224, 30, 250, 204, 130]
    },
    {
      name: 'merkleTree'
      discriminator: [98, 51, 51, 226, 162, 20, 73, 212]
    },
  ]
  events: [
    {
      name: 'adminSet'
      discriminator: [157, 245, 205, 226, 118, 125, 183, 97]
    },
    {
      name: 'configInitialized'
      discriminator: [181, 49, 200, 156, 19, 167, 178, 91]
    },
    {
      name: 'maxDistributionSet'
      discriminator: [237, 87, 93, 110, 231, 10, 136, 26]
    },
    {
      name: 'operatorAdded'
      discriminator: [216, 247, 101, 54, 51, 70, 215, 192]
    },
    {
      name: 'operatorRemoved'
      discriminator: [223, 10, 131, 23, 165, 154, 14, 191]
    },
    {
      name: 'tokensClaimed'
      discriminator: [25, 128, 244, 55, 241, 136, 200, 91]
    },
    {
      name: 'tokensDeposited'
      discriminator: [196, 217, 199, 88, 35, 117, 60, 96]
    },
    {
      name: 'tokensWithdrawn'
      discriminator: [30, 116, 110, 147, 87, 89, 9, 158]
    },
    {
      name: 'treeCreated'
      discriminator: [42, 82, 14, 91, 246, 61, 231, 67]
    },
    {
      name: 'treeEnded'
      discriminator: [254, 2, 217, 121, 4, 46, 199, 107]
    },
  ]
  errors: [
    {
      code: 6000
      name: 'invalidAdmin'
      msg: 'Invalid admin'
    },
    {
      code: 6001
      name: 'invalidOperator'
      msg: 'Invalid operator'
    },
    {
      code: 6002
      name: 'maxOperatorsReached'
      msg: 'Max operators reached'
    },
    {
      code: 6003
      name: 'operatorNotFound'
      msg: 'Operator not found'
    },
    {
      code: 6004
      name: 'unauthorized'
      msg: 'Unauthorized access'
    },
    {
      code: 6005
      name: 'invalidMaxDistributionAmount'
      msg: 'Invalid max distribution amount'
    },
    {
      code: 6006
      name: 'distributionExceedsMaximum'
      msg: 'Distribution amount exceeds maximum'
    },
    {
      code: 6007
      name: 'invalidStartDate'
      msg: 'Invalid start date'
    },
    {
      code: 6008
      name: 'invalidEndDate'
      msg: 'Invalid end date'
    },
    {
      code: 6009
      name: 'distributionNotActive'
      msg: 'Distribution not active'
    },
    {
      code: 6010
      name: 'distributionAlreadyEnded'
      msg: 'Distribution already ended'
    },
    {
      code: 6011
      name: 'alreadyClaimed'
      msg: 'Distribution already claimed'
    },
    {
      code: 6012
      name: 'invalidMerkleProof'
      msg: 'Invalid Merkle proof'
    },
    {
      code: 6013
      name: 'insufficientTokenBalance'
      msg: 'Insufficient token balance'
    },
    {
      code: 6014
      name: 'invalidDistributionAmount'
      msg: 'Invalid distribution amount'
    },
    {
      code: 6015
      name: 'calculationOverflow'
      msg: 'Calculation overflow'
    },
    {
      code: 6016
      name: 'invalidTokenAccountOwner'
      msg: 'Invalid token account owner'
    },
    {
      code: 6017
      name: 'invalidTokenAccountMint'
      msg: 'Invalid token account mint'
    },
    {
      code: 6018
      name: 'distributionTreeNotFound'
      msg: 'Distribution tree not found'
    },
  ]
  types: [
    {
      name: 'adminSet'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'admin'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'claimStatus'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'treeId'
            type: 'u64'
          },
          {
            name: 'user'
            type: 'pubkey'
          },
          {
            name: 'amount'
            type: 'u64'
          },
          {
            name: 'claimed'
            type: 'bool'
          },
        ]
      }
    },
    {
      name: 'config'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'admin'
            type: 'pubkey'
          },
          {
            name: 'operators'
            type: {
              array: [
                {
                  option: 'pubkey'
                },
                10,
              ]
            }
          },
          {
            name: 'maxDistributePerTree'
            type: 'u64'
          },
          {
            name: 'treeCount'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'configInitialized'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'admin'
            type: 'pubkey'
          },
          {
            name: 'maxDistributePerTree'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'maxDistributionSet'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'maxDistributePerTree'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'merkleTree'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'id'
            type: 'u64'
          },
          {
            name: 'merkleRoot'
            type: {
              array: ['u8', 32]
            }
          },
          {
            name: 'mint'
            type: 'pubkey'
          },
          {
            name: 'vault'
            type: 'pubkey'
          },
          {
            name: 'startTs'
            type: 'i64'
          },
          {
            name: 'endTs'
            type: {
              option: 'i64'
            }
          },
          {
            name: 'totalAmount'
            type: 'u64'
          },
          {
            name: 'distributedAmount'
            type: 'u64'
          },
          {
            name: 'isActive'
            type: 'bool'
          },
          {
            name: 'operator'
            type: 'pubkey'
          },
          {
            name: 'bump'
            type: 'u8'
          },
        ]
      }
    },
    {
      name: 'operatorAdded'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'operator'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'operatorRemoved'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'operator'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'tokensClaimed'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'treeId'
            type: 'u64'
          },
          {
            name: 'recipient'
            type: 'pubkey'
          },
          {
            name: 'amount'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'tokensDeposited'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'treeId'
            type: 'u64'
          },
          {
            name: 'amount'
            type: 'u64'
          },
          {
            name: 'operator'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'tokensWithdrawn'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'treeId'
            type: 'u64'
          },
          {
            name: 'amount'
            type: 'u64'
          },
          {
            name: 'admin'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'treeCreated'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'treeId'
            type: 'u64'
          },
          {
            name: 'merkleRoot'
            type: {
              array: ['u8', 32]
            }
          },
          {
            name: 'mint'
            type: 'pubkey'
          },
          {
            name: 'startTs'
            type: 'i64'
          },
          {
            name: 'endTs'
            type: {
              option: 'i64'
            }
          },
          {
            name: 'operator'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'treeEnded'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'treeId'
            type: 'u64'
          },
          {
            name: 'admin'
            type: 'pubkey'
          },
        ]
      }
    },
  ]
}
