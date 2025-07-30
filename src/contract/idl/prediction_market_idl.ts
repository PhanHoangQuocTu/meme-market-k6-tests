
const idl = {
  address: process.env.PROGRAM_ID,
  metadata: {
    name: 'prediction_market',
    version: '0.1.0',
    spec: '0.1.0',
    description: 'Created with Anchor',
  },
  instructions: [
    {
      name: 'add_operator',
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
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'admin',
          writable: true,
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
      name: 'claim_bet',
      discriminator: [60, 61, 185, 215, 180, 119, 174, 126],
      accounts: [
        {
          name: 'bet',
          writable: true,
        },
        {
          name: 'market',
        },
        {
          name: 'config',
        },
        {
          name: 'user_quote_token_ata',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'market_quote_token_ata',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'market',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'treasury_quote_token_ata',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'config.treasury_account',
                account: 'Config',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'quote_token',
        },
        {
          name: 'user',
          writable: true,
          signer: true,
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
      ],
      args: [],
    },
    {
      name: 'create_market',
      discriminator: [103, 226, 97, 235, 200, 188, 251, 254],
      accounts: [
        {
          name: 'market',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [109, 97, 114, 107, 101, 116],
              },
              {
                kind: 'account',
                path: 'config.market_count',
                account: 'Config',
              },
            ],
          },
        },
        {
          name: 'config',
          writable: true,
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'feed',
        },
        {
          name: 'quote_token',
        },
        {
          name: 'quote_token_ata',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'market',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
      ],
      args: [
        {
          name: 'question_type',
          type: {
            defined: {
              name: 'QuestionType',
            },
          },
        },
        {
          name: 'question_params',
          type: {
            array: [
              {
                option: 'f64',
              },
              5,
            ],
          },
        },
        {
          name: 'interval',
          type: {
            option: 'u64',
          },
        },
        {
          name: 'start_slot',
          type: 'u64',
        },
      ],
    },
    {
      name: 'end_market',
      discriminator: [125, 1, 137, 148, 80, 165, 115, 239],
      accounts: [
        {
          name: 'market',
          writable: true,
        },
        {
          name: 'config',
        },
        {
          name: 'feed',
        },
        {
          name: 'quote_token',
          docs: ['Optional quote token mint - only needed for fee transfer'],
          optional: true,
        },
        {
          name: 'quote_token_ata',
          docs: ['Optional market token account - only needed for fee transfer'],
          writable: true,
          optional: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'market',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'config.quote_token',
                account: 'Config',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'treasury_quote_token_ata',
          docs: ['Optional treasury token account - only needed for fee transfer'],
          writable: true,
          optional: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'config.treasury_account',
                account: 'Config',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'config.quote_token',
                account: 'Config',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'token_program',
          docs: ['Optional token program - only needed for fee transfer'],
          optional: true,
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: 'init_bet',
      discriminator: [15, 172, 254, 252, 114, 198, 174, 255],
      accounts: [
        {
          name: 'market',
          writable: true,
        },
        {
          name: 'config',
        },
        {
          name: 'bet',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'const',
                value: [98, 101, 116],
              },
              {
                kind: 'account',
                path: 'market',
              },
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'arg',
                path: 'bet_yes',
              },
            ],
          },
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
      ],
      args: [
        {
          name: 'bet_yes',
          type: 'bool',
        },
      ],
    },
    {
      name: 'initialize',
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
          name: 'quote_token',
        },
        {
          name: 'treasury_quote_token_ata',
          pda: {
            seeds: [
              {
                kind: 'arg',
                path: 'treasury_account',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
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
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
      ],
      args: [
        {
          name: 'treasury_account',
          type: 'pubkey',
        },
        {
          name: 'admin',
          type: 'pubkey',
        },
        {
          name: 'interval',
          type: 'u64',
        },
        {
          name: 'pool_fee_bps',
          type: 'u16',
        },
        {
          name: 'withdrawal_fee_bps',
          type: 'u16',
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
          name: 'slot_tolerance',
          type: 'u64',
        },
        {
          name: 'execute_window',
          type: 'u64',
        },
      ],
    },
    {
      name: 'place_bet',
      discriminator: [222, 62, 67, 220, 63, 166, 126, 33],
      accounts: [
        {
          name: 'bet',
          writable: true,
        },
        {
          name: 'market',
          writable: true,
        },
        {
          name: 'config',
        },
        {
          name: 'user_quote_token_ata',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'market_quote_token_ata',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'market',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'quote_token',
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
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
      ],
      args: [
        {
          name: 'bet_amount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'preview_claim',
      discriminator: [33, 140, 113, 100, 71, 91, 10, 71],
      accounts: [
        {
          name: 'bet',
        },
        {
          name: 'market',
        },
      ],
      args: [],
      returns: 'u64',
    },
    {
      name: 'preview_deposit',
      discriminator: [16, 61, 8, 235, 146, 126, 80, 84],
      accounts: [
        {
          name: 'market',
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
        },
      ],
      returns: 'u64',
    },
    {
      name: 'remove_operator',
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
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'admin',
          writable: true,
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
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'admin',
          writable: true,
          signer: true,
          relations: ['config'],
        },
      ],
      args: [
        {
          name: 'admin',
          type: 'pubkey',
        },
      ],
    },
    {
      name: 'set_execute_window',
      discriminator: [150, 195, 202, 103, 241, 239, 135, 186],
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
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'admin',
          writable: true,
          signer: true,
          relations: ['config'],
        },
      ],
      args: [
        {
          name: 'execute_window',
          type: 'u64',
        },
      ],
    },
    {
      name: 'set_interval',
      discriminator: [9, 61, 126, 236, 101, 34, 179, 103],
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
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'admin',
          writable: true,
          signer: true,
          relations: ['config'],
        },
      ],
      args: [
        {
          name: 'interval',
          type: 'u64',
        },
      ],
    },
    {
      name: 'set_pool_fee_bps',
      discriminator: [17, 15, 125, 50, 217, 178, 93, 248],
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
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'admin',
          writable: true,
          signer: true,
          relations: ['config'],
        },
      ],
      args: [
        {
          name: 'pool_fee_bps',
          type: 'u16',
        },
      ],
    },
    {
      name: 'set_quote_token',
      discriminator: [253, 109, 94, 11, 156, 30, 190, 193],
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
          name: 'quote_token',
        },
        {
          name: 'treasury_quote_token_ata',
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'config.treasury_account',
                account: 'Config',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'admin',
          writable: true,
          signer: true,
          relations: ['config'],
        },
      ],
      args: [],
    },
    {
      name: 'set_slot_tolerance',
      discriminator: [37, 5, 86, 241, 205, 234, 111, 51],
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
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'admin',
          writable: true,
          signer: true,
          relations: ['config'],
        },
      ],
      args: [
        {
          name: 'slot_tolerance',
          type: 'u64',
        },
      ],
    },
    {
      name: 'set_treasury',
      discriminator: [57, 97, 196, 95, 195, 206, 106, 136],
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
          name: 'quote_token',
        },
        {
          name: 'treasury_quote_token_ata',
          pda: {
            seeds: [
              {
                kind: 'arg',
                path: 'treasury_account',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
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
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
      ],
      args: [
        {
          name: 'treasury_account',
          type: 'pubkey',
        },
      ],
    },
    {
      name: 'set_withdrawal_fee_bps',
      discriminator: [115, 144, 95, 108, 104, 62, 118, 85],
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
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'admin',
          writable: true,
          signer: true,
          relations: ['config'],
        },
      ],
      args: [
        {
          name: 'withdrawal_fee_bps',
          type: 'u16',
        },
      ],
    },
    {
      name: 'start_market',
      discriminator: [75, 226, 21, 239, 183, 247, 3, 234],
      accounts: [
        {
          name: 'market',
          writable: true,
        },
        {
          name: 'config',
        },
        {
          name: 'feed',
        },
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
      ],
      args: [],
    },
    {
      name: 'update_market',
      discriminator: [153, 39, 2, 197, 179, 50, 199, 217],
      accounts: [
        {
          name: 'market',
          writable: true,
        },
        {
          name: 'config',
        },
        {
          name: 'system_program',
          address: '11111111111111111111111111111111',
        },
        {
          name: 'feed',
        },
        {
          name: 'quote_token',
        },
        {
          name: 'quote_token_ata',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'market',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'associated_token_program',
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
        },
        {
          name: 'token_program',
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
        },
        {
          name: 'payer',
          writable: true,
          signer: true,
        },
      ],
      args: [
        {
          name: 'question_type',
          type: {
            option: {
              defined: {
                name: 'QuestionType',
              },
            },
          },
        },
        {
          name: 'question_params',
          type: {
            option: {
              array: [
                {
                  option: 'f64',
                },
                5,
              ],
            },
          },
        },
        {
          name: 'start_slot',
          type: {
            option: 'u64',
          },
        },
      ],
    },
    {
      name: 'withdraw_bet',
      discriminator: [130, 82, 224, 113, 128, 116, 196, 196],
      accounts: [
        {
          name: 'bet',
          writable: true,
        },
        {
          name: 'market',
          writable: true,
        },
        {
          name: 'config',
        },
        {
          name: 'user_quote_token_ata',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'user',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'market_quote_token_ata',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'market',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'treasury_quote_token_ata',
          writable: true,
          pda: {
            seeds: [
              {
                kind: 'account',
                path: 'config.treasury_account',
                account: 'Config',
              },
              {
                kind: 'const',
                value: [
                  6, 221, 246, 225, 215, 101, 161, 147, 217, 203, 225, 70, 206, 235, 121, 172, 28, 180, 133, 237, 95,
                  91, 55, 145, 58, 140, 245, 133, 126, 255, 0, 169,
                ],
              },
              {
                kind: 'account',
                path: 'quote_token',
              },
            ],
            program: {
              kind: 'const',
              value: [
                140, 151, 37, 143, 78, 36, 137, 241, 187, 61, 16, 41, 20, 142, 13, 131, 11, 90, 19, 153, 218, 255, 16,
                132, 4, 142, 123, 216, 219, 233, 248, 89,
              ],
            },
          },
        },
        {
          name: 'quote_token',
        },
        {
          name: 'user',
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
          name: 'withdrawal_shares',
          type: 'u64',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'Bet',
      discriminator: [147, 23, 35, 59, 15, 75, 155, 32],
    },
    {
      name: 'Config',
      discriminator: [155, 12, 170, 224, 30, 250, 204, 130],
    },
    {
      name: 'Market',
      discriminator: [219, 190, 213, 55, 0, 227, 198, 154],
    },
  ],
  events: [
    {
      name: 'AdminSet',
      discriminator: [157, 245, 205, 226, 118, 125, 183, 97],
    },
    {
      name: 'BetClaimed',
      discriminator: [109, 35, 168, 88, 18, 129, 64, 166],
    },
    {
      name: 'BetPlaced',
      discriminator: [88, 88, 145, 226, 126, 206, 32, 0],
    },
    {
      name: 'BetWithdrawn',
      discriminator: [66, 46, 60, 238, 167, 179, 90, 105],
    },
    {
      name: 'ExecuteWindowSet',
      discriminator: [164, 56, 197, 10, 234, 76, 124, 151],
    },
    {
      name: 'IntervalSet',
      discriminator: [91, 106, 72, 57, 131, 192, 176, 215],
    },
    {
      name: 'MarketCapSet',
      discriminator: [34, 229, 148, 113, 142, 86, 170, 184],
    },
    {
      name: 'MarketCreated',
      discriminator: [88, 184, 130, 231, 226, 84, 6, 58],
    },
    {
      name: 'MarketSettled',
      discriminator: [237, 212, 22, 175, 201, 117, 215, 99],
    },
    {
      name: 'MarketStarted',
      discriminator: [201, 123, 139, 120, 164, 54, 48, 248],
    },
    {
      name: 'MarketUpdated',
      discriminator: [170, 51, 74, 147, 116, 168, 217, 251],
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
      name: 'PoolFeeSet',
      discriminator: [46, 155, 60, 205, 152, 134, 145, 131],
    },
    {
      name: 'QuoteTokenSet',
      discriminator: [96, 172, 55, 32, 46, 31, 103, 146],
    },
    {
      name: 'SlotToleranceSet',
      discriminator: [236, 128, 99, 51, 61, 245, 5, 157],
    },
    {
      name: 'TreasurySet',
      discriminator: [69, 231, 163, 135, 254, 194, 109, 166],
    },
    {
      name: 'WithdrawalFeeSet',
      discriminator: [108, 76, 208, 64, 9, 55, 80, 162],
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'MaxOperatorsReached',
      msg: 'Max operators reached',
    },
    {
      code: 6001,
      name: 'OperatorNotFound',
      msg: 'Operator not found',
    },
    {
      code: 6002,
      name: 'NoOperator',
      msg: 'No operator',
    },
    {
      code: 6003,
      name: 'InvalidAdmin',
      msg: 'Invalid admin',
    },
    {
      code: 6004,
      name: 'InvalidOperator',
      msg: 'Invalid operator',
    },
    {
      code: 6005,
      name: 'InvalidMarketCap',
      msg: 'Invalid market cap',
    },
    {
      code: 6006,
      name: 'InvalidInterval',
      msg: 'Invalid interval',
    },
    {
      code: 6007,
      name: 'InvalidPoolFee',
      msg: 'Invalid pool fee',
    },
    {
      code: 6008,
      name: 'InvalidWithdrawalFee',
      msg: 'Invalid withdrawal fee',
    },
    {
      code: 6009,
      name: 'InvalidSlotTolerance',
      msg: 'Invalid slot tolerance',
    },
    {
      code: 6010,
      name: 'MarketCountOverflow',
      msg: 'Market count overflow',
    },
    {
      code: 6011,
      name: 'MarketAlreadySettled',
      msg: 'Market already settled',
    },
    {
      code: 6012,
      name: 'MarketNotSettled',
      msg: 'Market not settled',
    },
    {
      code: 6013,
      name: 'BetAmountZero',
      msg: 'Bet amount zero',
    },
    {
      code: 6014,
      name: 'SharesWithdrawZero',
      msg: 'Shares withdraw zero',
    },
    {
      code: 6015,
      name: 'BetAlreadyClaimed',
      msg: 'Bet already claimed',
    },
    {
      code: 6016,
      name: 'WithdrawAmountTooLarge',
      msg: 'Bet amount too large',
    },
    {
      code: 6017,
      name: 'EntryPriceNotSet',
      msg: 'Entry price not set',
    },
    {
      code: 6018,
      name: 'EntryPriceNotRecorded',
      msg: 'Entry price not recorded',
    },
    {
      code: 6019,
      name: 'CallPriceNotSet',
      msg: 'Call price not set',
    },
    {
      code: 6020,
      name: 'EntryPriceAlreadyRecorded',
      msg: 'Entry price already recorded',
    },
    {
      code: 6021,
      name: 'CallPriceAlreadyRecorded',
      msg: 'Call price already recorded',
    },
    {
      code: 6022,
      name: 'MarketNotAtStartSlot',
      msg: 'Market not at start slot',
    },
    {
      code: 6023,
      name: 'MarketNotAtEndSlot',
      msg: 'Market not at end slot',
    },
    {
      code: 6024,
      name: 'InvalidQuestionParams',
      msg: 'Invalid question params',
    },
    {
      code: 6025,
      name: 'InvalidPriceFeed',
      msg: 'Invalid price feed',
    },
    {
      code: 6026,
      name: 'PriceFeedParseError',
      msg: 'Price feed parse error',
    },
    {
      code: 6027,
      name: 'GetPriceFeedError',
      msg: 'Get price feed error',
    },
    {
      code: 6028,
      name: 'StalePriceFeed',
      msg: 'Stale price feed',
    },
    {
      code: 6029,
      name: 'PriceFeedOutOfTimeRange',
      msg: 'Price feed data is outside the acceptable time range',
    },
    {
      code: 6030,
      name: 'BetTooEarly',
      msg: 'Bet placed too early, before market start slot',
    },
    {
      code: 6031,
      name: 'BetTooLate',
      msg: 'Bet placed too late, market has ended',
    },
    {
      code: 6032,
      name: 'InvalidBetUser',
      msg: 'Invalid bet user',
    },
    {
      code: 6033,
      name: 'InvalidMarket',
      msg: 'Invalid market',
    },
    {
      code: 6034,
      name: 'BetNotWinning',
      msg: 'Bet not winning',
    },
    {
      code: 6035,
      name: 'InsufficientShares',
      msg: 'Insufficient shares',
    },
    {
      code: 6036,
      name: 'InvalidExecuteWindow',
      msg: 'Invalid execute window',
    },
    {
      code: 6037,
      name: 'MarketExecutionOutsideWindow',
      msg: 'Market execution outside allowed window',
    },
    {
      code: 6038,
      name: 'MarketInExecutionWindow',
      msg: 'Market is in execution window',
    },
    {
      code: 6039,
      name: 'TimeNotPastTargetSlot',
      msg: 'Time not past target slot',
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
      name: 'Bet',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market_id',
            type: 'pubkey',
          },
          {
            name: 'bet_yes',
            type: 'bool',
          },
          {
            name: 'shares',
            type: 'u64',
          },
          {
            name: 'claimed',
            type: 'bool',
          },
          {
            name: 'bet_user',
            type: 'pubkey',
          },
          {
            name: 'status',
            type: {
              defined: {
                name: 'Status',
              },
            },
          },
        ],
      },
    },
    {
      name: 'BetClaimed',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bet_id',
            type: 'pubkey',
          },
          {
            name: 'claim_amount',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'BetPlaced',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bet_id',
            type: 'pubkey',
          },
          {
            name: 'market_id',
            type: 'pubkey',
          },
          {
            name: 'bet_yes',
            type: 'bool',
          },
          {
            name: 'bet_amount',
            type: 'u64',
          },
          {
            name: 'shares',
            type: 'u64',
          },
          {
            name: 'bet_user',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'BetWithdrawn',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'bet_id',
            type: 'pubkey',
          },
          {
            name: 'withdrawal_amount',
            type: 'u64',
          },
          {
            name: 'withdrawal_shares',
            type: 'u64',
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
            name: 'interval',
            type: 'u64',
          },
          {
            name: 'quote_token',
            type: 'pubkey',
          },
          {
            name: 'pool_fee_bps',
            type: 'u16',
          },
          {
            name: 'withdrawal_fee_bps',
            type: 'u16',
          },
          {
            name: 'treasury_account',
            type: 'pubkey',
          },
          {
            name: 'market_count',
            type: 'u64',
          },
          {
            name: 'slot_tolerance',
            type: 'u64',
          },
          {
            name: 'execute_window',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'ExecuteWindowSet',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'execute_window',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'IntervalSet',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'interval',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'Market',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market_id',
            type: 'pubkey',
          },
          {
            name: 'market_index',
            type: 'u64',
          },
          {
            name: 'interval_slots',
            type: 'u64',
          },
          {
            name: 'quote_token',
            type: 'pubkey',
          },
          {
            name: 'question_type',
            type: {
              defined: {
                name: 'QuestionType',
              },
            },
          },
          {
            name: 'question_params',
            type: {
              array: [
                {
                  option: 'f64',
                },
                5,
              ],
            },
          },
          {
            name: 'start_slot',
            type: 'u64',
          },
          {
            name: 'end_slot',
            type: 'u64',
          },
          {
            name: 'result',
            type: {
              option: 'bool',
            },
          },
          {
            name: 'entry_price',
            type: {
              option: 'f64',
            },
          },
          {
            name: 'call_price',
            type: {
              option: 'f64',
            },
          },
          {
            name: 'total_yes_pool',
            type: 'u64',
          },
          {
            name: 'total_no_pool',
            type: 'u64',
          },
          {
            name: 'total_reward_pool',
            type: 'u64',
          },
          {
            name: 'total_yes_shares',
            type: 'u64',
          },
          {
            name: 'total_no_shares',
            type: 'u64',
          },
          {
            name: 'price_feed',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'MarketCapSet',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market_cap_min',
            type: 'u64',
          },
          {
            name: 'market_cap_max',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'MarketCreated',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market_id',
            type: 'pubkey',
          },
          {
            name: 'interval',
            type: 'u64',
          },
          {
            name: 'quote_token',
            type: 'pubkey',
          },
          {
            name: 'question_type',
            type: {
              defined: {
                name: 'QuestionType',
              },
            },
          },
          {
            name: 'question_params',
            type: {
              array: [
                {
                  option: 'f64',
                },
                5,
              ],
            },
          },
          {
            name: 'start_slot',
            type: 'u64',
          },
          {
            name: 'end_slot',
            type: 'u64',
          },
          {
            name: 'price_feed',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'MarketSettled',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market_id',
            type: 'pubkey',
          },
          {
            name: 'end_price',
            type: 'f64',
          },
          {
            name: 'result',
            type: 'bool',
          },
        ],
      },
    },
    {
      name: 'MarketStarted',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market_id',
            type: 'pubkey',
          },
          {
            name: 'entry_price',
            type: 'f64',
          },
        ],
      },
    },
    {
      name: 'MarketUpdated',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'market_id',
            type: 'pubkey',
          },
          {
            name: 'interval',
            type: 'u64',
          },
          {
            name: 'quote_token',
            type: 'pubkey',
          },
          {
            name: 'question_type',
            type: {
              defined: {
                name: 'QuestionType',
              },
            },
          },
          {
            name: 'question_params',
            type: {
              array: [
                {
                  option: 'f64',
                },
                5,
              ],
            },
          },
          {
            name: 'start_slot',
            type: 'u64',
          },
          {
            name: 'end_slot',
            type: 'u64',
          },
          {
            name: 'price_feed',
            type: 'pubkey',
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
      name: 'PoolFeeSet',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'pool_fee_bps',
            type: 'u16',
          },
        ],
      },
    },
    {
      name: 'QuestionType',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'PriceCompareToTarget',
          },
          {
            name: 'PercentagePriceChange',
          },
        ],
      },
    },
    {
      name: 'QuoteTokenSet',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'quote_token',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'SlotToleranceSet',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'slot_tolerance',
            type: 'u64',
          },
        ],
      },
    },
    {
      name: 'Status',
      type: {
        kind: 'enum',
        variants: [
          {
            name: 'Bet',
          },
          {
            name: 'Claimed',
          },
        ],
      },
    },
    {
      name: 'TreasurySet',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'treasury',
            type: 'pubkey',
          },
        ],
      },
    },
    {
      name: 'WithdrawalFeeSet',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'withdrawal_fee_bps',
            type: 'u16',
          },
        ],
      },
    },
  ],
}

export default idl
