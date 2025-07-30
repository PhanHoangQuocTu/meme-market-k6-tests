/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/prediction_market.json`.
 */
export type PredictionMarket = {
  address: '9mCXgJwcpEeCSKHTm14teLNQ2bTHztSzKenDTP8u7xGA'
  metadata: {
    name: 'predictionMarket'
    version: '0.1.0'
    spec: '0.1.0'
    description: 'Created with Anchor'
  }
  instructions: [
    {
      name: 'addOperator'
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
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'admin'
          writable: true
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
      name: 'claimBet'
      discriminator: [60, 61, 185, 215, 180, 119, 174, 126]
      accounts: [
        {
          name: 'bet'
          writable: true
        },
        {
          name: 'market'
        },
        {
          name: 'config'
        },
        {
          name: 'userQuoteTokenAta'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'user'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'marketQuoteTokenAta'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'market'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'treasuryQuoteTokenAta'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'config.treasury_account'
                account: 'config'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'quoteToken'
        },
        {
          name: 'user'
          writable: true
          signer: true
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
      ]
      args: []
    },
    {
      name: 'createMarket'
      discriminator: [103, 226, 97, 235, 200, 188, 251, 254]
      accounts: [
        {
          name: 'market'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 97, 114, 107, 101, 116]
              },
              {
                kind: 'account'
                path: 'config.market_count'
                account: 'config'
              },
            ]
          }
        },
        {
          name: 'config'
          writable: true
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'feed'
        },
        {
          name: 'quoteToken'
        },
        {
          name: 'quoteTokenAta'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'market'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'payer'
          writable: true
          signer: true
        },
      ]
      args: [
        {
          name: 'questionType'
          type: {
            defined: {
              name: 'questionType'
            }
          }
        },
        {
          name: 'questionParams'
          type: {
            array: [
              {
                option: 'f64'
              },
              5,
            ]
          }
        },
        {
          name: 'interval'
          type: {
            option: 'u64'
          }
        },
        {
          name: 'startSlot'
          type: 'u64'
        },
      ]
    },
    {
      name: 'endMarket'
      discriminator: [125, 1, 137, 148, 80, 165, 115, 239]
      accounts: [
        {
          name: 'market'
          writable: true
        },
        {
          name: 'config'
        },
        {
          name: 'feed'
        },
        {
          name: 'quoteToken'
          docs: ['Optional quote token mint - only needed for fee transfer']
          optional: true
        },
        {
          name: 'quoteTokenAta'
          docs: ['Optional market token account - only needed for fee transfer']
          writable: true
          optional: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'market'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'config.quote_token'
                account: 'config'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'treasuryQuoteTokenAta'
          docs: ['Optional treasury token account - only needed for fee transfer']
          writable: true
          optional: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'config.treasury_account'
                account: 'config'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'config.quote_token'
                account: 'config'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'tokenProgram'
          docs: ['Optional token program - only needed for fee transfer']
          optional: true
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'payer'
          writable: true
          signer: true
        },
      ]
      args: []
    },
    {
      name: 'initBet'
      discriminator: [15, 172, 254, 252, 114, 198, 174, 255]
      accounts: [
        {
          name: 'market'
          writable: true
        },
        {
          name: 'config'
        },
        {
          name: 'bet'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [98, 101, 116]
              },
              {
                kind: 'account'
                path: 'market'
              },
              {
                kind: 'account'
                path: 'user'
              },
              {
                kind: 'arg'
                path: 'betYes'
              },
            ]
          }
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
      ]
      args: [
        {
          name: 'betYes'
          type: 'bool'
        },
      ]
    },
    {
      name: 'initialize'
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
          name: 'quoteToken'
        },
        {
          name: 'treasuryQuoteTokenAta'
          pda: {
            seeds: [
              {
                kind: 'arg'
                path: 'treasuryAccount'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
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
        {
          name: 'payer'
          writable: true
          signer: true
        },
      ]
      args: [
        {
          name: 'treasuryAccount'
          type: 'pubkey'
        },
        {
          name: 'admin'
          type: 'pubkey'
        },
        {
          name: 'interval'
          type: 'u64'
        },
        {
          name: 'poolFeeBps'
          type: 'u16'
        },
        {
          name: 'withdrawalFeeBps'
          type: 'u16'
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
          name: 'slotTolerance'
          type: 'u64'
        },
        {
          name: 'executeWindow'
          type: 'u64'
        },
      ]
    },
    {
      name: 'placeBet'
      discriminator: [222, 62, 67, 220, 63, 166, 126, 33]
      accounts: [
        {
          name: 'bet'
          writable: true
        },
        {
          name: 'market'
          writable: true
        },
        {
          name: 'config'
        },
        {
          name: 'userQuoteTokenAta'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'user'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'marketQuoteTokenAta'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'market'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'quoteToken'
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
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
      ]
      args: [
        {
          name: 'betAmount'
          type: 'u64'
        },
      ]
    },
    {
      name: 'previewClaim'
      discriminator: [33, 140, 113, 100, 71, 91, 10, 71]
      accounts: [
        {
          name: 'bet'
        },
        {
          name: 'market'
        },
      ]
      args: []
      returns: 'u64'
    },
    {
      name: 'previewDeposit'
      discriminator: [16, 61, 8, 235, 146, 126, 80, 84]
      accounts: [
        {
          name: 'market'
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
      ]
      returns: 'u64'
    },
    {
      name: 'removeOperator'
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
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'admin'
          writable: true
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
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'admin'
          writable: true
          signer: true
          relations: ['config']
        },
      ]
      args: [
        {
          name: 'admin'
          type: 'pubkey'
        },
      ]
    },
    {
      name: 'setExecuteWindow'
      discriminator: [150, 195, 202, 103, 241, 239, 135, 186]
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
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'admin'
          writable: true
          signer: true
          relations: ['config']
        },
      ]
      args: [
        {
          name: 'executeWindow'
          type: 'u64'
        },
      ]
    },
    {
      name: 'setInterval'
      discriminator: [9, 61, 126, 236, 101, 34, 179, 103]
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
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'admin'
          writable: true
          signer: true
          relations: ['config']
        },
      ]
      args: [
        {
          name: 'interval'
          type: 'u64'
        },
      ]
    },
    {
      name: 'setPoolFeeBps'
      discriminator: [17, 15, 125, 50, 217, 178, 93, 248]
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
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'admin'
          writable: true
          signer: true
          relations: ['config']
        },
      ]
      args: [
        {
          name: 'poolFeeBps'
          type: 'u16'
        },
      ]
    },
    {
      name: 'setQuoteToken'
      discriminator: [253, 109, 94, 11, 156, 30, 190, 193]
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
          name: 'quoteToken'
        },
        {
          name: 'treasuryQuoteTokenAta'
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'config.treasury_account'
                account: 'config'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'admin'
          writable: true
          signer: true
          relations: ['config']
        },
      ]
      args: []
    },
    {
      name: 'setSlotTolerance'
      discriminator: [37, 5, 86, 241, 205, 234, 111, 51]
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
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'admin'
          writable: true
          signer: true
          relations: ['config']
        },
      ]
      args: [
        {
          name: 'slotTolerance'
          type: 'u64'
        },
      ]
    },
    {
      name: 'setTreasury'
      discriminator: [57, 97, 196, 95, 195, 206, 106, 136]
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
          name: 'quoteToken'
        },
        {
          name: 'treasuryQuoteTokenAta'
          pda: {
            seeds: [
              {
                kind: 'arg'
                path: 'treasuryAccount'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
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
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
      ]
      args: [
        {
          name: 'treasuryAccount'
          type: 'pubkey'
        },
      ]
    },
    {
      name: 'setWithdrawalFeeBps'
      discriminator: [115, 144, 95, 108, 104, 62, 118, 85]
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
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'admin'
          writable: true
          signer: true
          relations: ['config']
        },
      ]
      args: [
        {
          name: 'withdrawalFeeBps'
          type: 'u16'
        },
      ]
    },
    {
      name: 'startMarket'
      discriminator: [75, 226, 21, 239, 183, 247, 3, 234]
      accounts: [
        {
          name: 'market'
          writable: true
        },
        {
          name: 'config'
        },
        {
          name: 'feed'
        },
        {
          name: 'payer'
          writable: true
          signer: true
        },
      ]
      args: []
    },
    {
      name: 'updateMarket'
      discriminator: [153, 39, 2, 197, 179, 50, 199, 217]
      accounts: [
        {
          name: 'market'
          writable: true
        },
        {
          name: 'config'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'feed'
        },
        {
          name: 'quoteToken'
        },
        {
          name: 'quoteTokenAta'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'market'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'payer'
          writable: true
          signer: true
        },
      ]
      args: [
        {
          name: 'questionType'
          type: {
            option: {
              defined: {
                name: 'questionType'
              }
            }
          }
        },
        {
          name: 'questionParams'
          type: {
            option: {
              array: [
                {
                  option: 'f64'
                },
                5,
              ]
            }
          }
        },
        {
          name: 'startSlot'
          type: {
            option: 'u64'
          }
        },
      ]
    },
    {
      name: 'withdrawBet'
      discriminator: [130, 82, 224, 113, 128, 116, 196, 196]
      accounts: [
        {
          name: 'bet'
          writable: true
        },
        {
          name: 'market'
          writable: true
        },
        {
          name: 'config'
        },
        {
          name: 'userQuoteTokenAta'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'user'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'marketQuoteTokenAta'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'market'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'treasuryQuoteTokenAta'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'config.treasury_account'
                account: 'config'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'quoteToken'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'quoteToken'
        },
        {
          name: 'user'
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
          name: 'withdrawalShares'
          type: 'u64'
        },
      ]
    },
  ]
  accounts: [
    {
      name: 'bet'
      discriminator: [147, 23, 35, 59, 15, 75, 155, 32]
    },
    {
      name: 'config'
      discriminator: [155, 12, 170, 224, 30, 250, 204, 130]
    },
    {
      name: 'market'
      discriminator: [219, 190, 213, 55, 0, 227, 198, 154]
    },
  ]
  events: [
    {
      name: 'adminSet'
      discriminator: [157, 245, 205, 226, 118, 125, 183, 97]
    },
    {
      name: 'betClaimed'
      discriminator: [109, 35, 168, 88, 18, 129, 64, 166]
    },
    {
      name: 'betPlaced'
      discriminator: [88, 88, 145, 226, 126, 206, 32, 0]
    },
    {
      name: 'betWithdrawn'
      discriminator: [66, 46, 60, 238, 167, 179, 90, 105]
    },
    {
      name: 'executeWindowSet'
      discriminator: [164, 56, 197, 10, 234, 76, 124, 151]
    },
    {
      name: 'intervalSet'
      discriminator: [91, 106, 72, 57, 131, 192, 176, 215]
    },
    {
      name: 'marketCapSet'
      discriminator: [34, 229, 148, 113, 142, 86, 170, 184]
    },
    {
      name: 'marketCreated'
      discriminator: [88, 184, 130, 231, 226, 84, 6, 58]
    },
    {
      name: 'marketSettled'
      discriminator: [237, 212, 22, 175, 201, 117, 215, 99]
    },
    {
      name: 'marketStarted'
      discriminator: [201, 123, 139, 120, 164, 54, 48, 248]
    },
    {
      name: 'marketUpdated'
      discriminator: [170, 51, 74, 147, 116, 168, 217, 251]
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
      name: 'poolFeeSet'
      discriminator: [46, 155, 60, 205, 152, 134, 145, 131]
    },
    {
      name: 'quoteTokenSet'
      discriminator: [96, 172, 55, 32, 46, 31, 103, 146]
    },
    {
      name: 'slotToleranceSet'
      discriminator: [236, 128, 99, 51, 61, 245, 5, 157]
    },
    {
      name: 'treasurySet'
      discriminator: [69, 231, 163, 135, 254, 194, 109, 166]
    },
    {
      name: 'withdrawalFeeSet'
      discriminator: [108, 76, 208, 64, 9, 55, 80, 162]
    },
  ]
  errors: [
    {
      code: 6000
      name: 'maxOperatorsReached'
      msg: 'Max operators reached'
    },
    {
      code: 6001
      name: 'operatorNotFound'
      msg: 'Operator not found'
    },
    {
      code: 6002
      name: 'noOperator'
      msg: 'No operator'
    },
    {
      code: 6003
      name: 'invalidAdmin'
      msg: 'Invalid admin'
    },
    {
      code: 6004
      name: 'invalidOperator'
      msg: 'Invalid operator'
    },
    {
      code: 6005
      name: 'invalidMarketCap'
      msg: 'Invalid market cap'
    },
    {
      code: 6006
      name: 'invalidInterval'
      msg: 'Invalid interval'
    },
    {
      code: 6007
      name: 'invalidPoolFee'
      msg: 'Invalid pool fee'
    },
    {
      code: 6008
      name: 'invalidWithdrawalFee'
      msg: 'Invalid withdrawal fee'
    },
    {
      code: 6009
      name: 'invalidSlotTolerance'
      msg: 'Invalid slot tolerance'
    },
    {
      code: 6010
      name: 'marketCountOverflow'
      msg: 'Market count overflow'
    },
    {
      code: 6011
      name: 'marketAlreadySettled'
      msg: 'Market already settled'
    },
    {
      code: 6012
      name: 'marketNotSettled'
      msg: 'Market not settled'
    },
    {
      code: 6013
      name: 'betAmountZero'
      msg: 'Bet amount zero'
    },
    {
      code: 6014
      name: 'sharesWithdrawZero'
      msg: 'Shares withdraw zero'
    },
    {
      code: 6015
      name: 'betAlreadyClaimed'
      msg: 'Bet already claimed'
    },
    {
      code: 6016
      name: 'withdrawAmountTooLarge'
      msg: 'Bet amount too large'
    },
    {
      code: 6017
      name: 'entryPriceNotSet'
      msg: 'Entry price not set'
    },
    {
      code: 6018
      name: 'entryPriceNotRecorded'
      msg: 'Entry price not recorded'
    },
    {
      code: 6019
      name: 'callPriceNotSet'
      msg: 'Call price not set'
    },
    {
      code: 6020
      name: 'entryPriceAlreadyRecorded'
      msg: 'Entry price already recorded'
    },
    {
      code: 6021
      name: 'callPriceAlreadyRecorded'
      msg: 'Call price already recorded'
    },
    {
      code: 6022
      name: 'marketNotAtStartSlot'
      msg: 'Market not at start slot'
    },
    {
      code: 6023
      name: 'marketNotAtEndSlot'
      msg: 'Market not at end slot'
    },
    {
      code: 6024
      name: 'invalidQuestionParams'
      msg: 'Invalid question params'
    },
    {
      code: 6025
      name: 'invalidPriceFeed'
      msg: 'Invalid price feed'
    },
    {
      code: 6026
      name: 'priceFeedParseError'
      msg: 'Price feed parse error'
    },
    {
      code: 6027
      name: 'getPriceFeedError'
      msg: 'Get price feed error'
    },
    {
      code: 6028
      name: 'stalePriceFeed'
      msg: 'Stale price feed'
    },
    {
      code: 6029
      name: 'priceFeedOutOfTimeRange'
      msg: 'Price feed data is outside the acceptable time range'
    },
    {
      code: 6030
      name: 'betTooEarly'
      msg: 'Bet placed too early, before market start slot'
    },
    {
      code: 6031
      name: 'betTooLate'
      msg: 'Bet placed too late, market has ended'
    },
    {
      code: 6032
      name: 'invalidBetUser'
      msg: 'Invalid bet user'
    },
    {
      code: 6033
      name: 'invalidMarket'
      msg: 'Invalid market'
    },
    {
      code: 6034
      name: 'betNotWinning'
      msg: 'Bet not winning'
    },
    {
      code: 6035
      name: 'insufficientShares'
      msg: 'Insufficient shares'
    },
    {
      code: 6036
      name: 'invalidExecuteWindow'
      msg: 'Invalid execute window'
    },
    {
      code: 6037
      name: 'marketExecutionOutsideWindow'
      msg: 'Market execution outside allowed window'
    },
    {
      code: 6038
      name: 'marketInExecutionWindow'
      msg: 'Market is in execution window'
    },
    {
      code: 6039
      name: 'timeNotPastTargetSlot'
      msg: 'Time not past target slot'
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
      name: 'bet'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'marketId'
            type: 'pubkey'
          },
          {
            name: 'betYes'
            type: 'bool'
          },
          {
            name: 'shares'
            type: 'u64'
          },
          {
            name: 'claimed'
            type: 'bool'
          },
          {
            name: 'betUser'
            type: 'pubkey'
          },
          {
            name: 'status'
            type: {
              defined: {
                name: 'status'
              }
            }
          },
        ]
      }
    },
    {
      name: 'betClaimed'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'betId'
            type: 'pubkey'
          },
          {
            name: 'claimAmount'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'betPlaced'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'betId'
            type: 'pubkey'
          },
          {
            name: 'marketId'
            type: 'pubkey'
          },
          {
            name: 'betYes'
            type: 'bool'
          },
          {
            name: 'betAmount'
            type: 'u64'
          },
          {
            name: 'shares'
            type: 'u64'
          },
          {
            name: 'betUser'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'betWithdrawn'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'betId'
            type: 'pubkey'
          },
          {
            name: 'withdrawalAmount'
            type: 'u64'
          },
          {
            name: 'withdrawalShares'
            type: 'u64'
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
            name: 'interval'
            type: 'u64'
          },
          {
            name: 'quoteToken'
            type: 'pubkey'
          },
          {
            name: 'poolFeeBps'
            type: 'u16'
          },
          {
            name: 'withdrawalFeeBps'
            type: 'u16'
          },
          {
            name: 'treasuryAccount'
            type: 'pubkey'
          },
          {
            name: 'marketCount'
            type: 'u64'
          },
          {
            name: 'slotTolerance'
            type: 'u64'
          },
          {
            name: 'executeWindow'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'executeWindowSet'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'executeWindow'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'intervalSet'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'interval'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'market'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'marketId'
            type: 'pubkey'
          },
          {
            name: 'marketIndex'
            type: 'u64'
          },
          {
            name: 'intervalSlots'
            type: 'u64'
          },
          {
            name: 'quoteToken'
            type: 'pubkey'
          },
          {
            name: 'questionType'
            type: {
              defined: {
                name: 'questionType'
              }
            }
          },
          {
            name: 'questionParams'
            type: {
              array: [
                {
                  option: 'f64'
                },
                5,
              ]
            }
          },
          {
            name: 'startSlot'
            type: 'u64'
          },
          {
            name: 'endSlot'
            type: 'u64'
          },
          {
            name: 'result'
            type: {
              option: 'bool'
            }
          },
          {
            name: 'entryPrice'
            type: {
              option: 'f64'
            }
          },
          {
            name: 'callPrice'
            type: {
              option: 'f64'
            }
          },
          {
            name: 'totalYesPool'
            type: 'u64'
          },
          {
            name: 'totalNoPool'
            type: 'u64'
          },
          {
            name: 'totalRewardPool'
            type: 'u64'
          },
          {
            name: 'totalYesShares'
            type: 'u64'
          },
          {
            name: 'totalNoShares'
            type: 'u64'
          },
          {
            name: 'priceFeed'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'marketCapSet'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'marketCapMin'
            type: 'u64'
          },
          {
            name: 'marketCapMax'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'marketCreated'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'marketId'
            type: 'pubkey'
          },
          {
            name: 'interval'
            type: 'u64'
          },
          {
            name: 'quoteToken'
            type: 'pubkey'
          },
          {
            name: 'questionType'
            type: {
              defined: {
                name: 'questionType'
              }
            }
          },
          {
            name: 'questionParams'
            type: {
              array: [
                {
                  option: 'f64'
                },
                5,
              ]
            }
          },
          {
            name: 'startSlot'
            type: 'u64'
          },
          {
            name: 'endSlot'
            type: 'u64'
          },
          {
            name: 'priceFeed'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'marketSettled'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'marketId'
            type: 'pubkey'
          },
          {
            name: 'endPrice'
            type: 'f64'
          },
          {
            name: 'result'
            type: 'bool'
          },
        ]
      }
    },
    {
      name: 'marketStarted'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'marketId'
            type: 'pubkey'
          },
          {
            name: 'entryPrice'
            type: 'f64'
          },
        ]
      }
    },
    {
      name: 'marketUpdated'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'marketId'
            type: 'pubkey'
          },
          {
            name: 'interval'
            type: 'u64'
          },
          {
            name: 'quoteToken'
            type: 'pubkey'
          },
          {
            name: 'questionType'
            type: {
              defined: {
                name: 'questionType'
              }
            }
          },
          {
            name: 'questionParams'
            type: {
              array: [
                {
                  option: 'f64'
                },
                5,
              ]
            }
          },
          {
            name: 'startSlot'
            type: 'u64'
          },
          {
            name: 'endSlot'
            type: 'u64'
          },
          {
            name: 'priceFeed'
            type: 'pubkey'
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
      name: 'poolFeeSet'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'poolFeeBps'
            type: 'u16'
          },
        ]
      }
    },
    {
      name: 'questionType'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'priceCompareToTarget'
          },
          {
            name: 'percentagePriceChange'
          },
        ]
      }
    },
    {
      name: 'quoteTokenSet'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'quoteToken'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'slotToleranceSet'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'slotTolerance'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'status'
      type: {
        kind: 'enum'
        variants: [
          {
            name: 'bet'
          },
          {
            name: 'claimed'
          },
        ]
      }
    },
    {
      name: 'treasurySet'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'treasury'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'withdrawalFeeSet'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'withdrawalFeeBps'
            type: 'u16'
          },
        ]
      }
    },
  ]
}
