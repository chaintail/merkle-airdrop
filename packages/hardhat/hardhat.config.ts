import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import { task } from "hardhat/config";
import generateTsAbis from "./scripts/generateTsAbis";
import merge from "lodash.merge"; // Install lodash with `yarn add lodash`
import { MultiSolcUserConfig, SolcUserConfig, SolidityUserConfig } from "hardhat/types";

// If not set, it uses ours Alchemy's default API key.
// You can get your own at https://dashboard.alchemyapi.io
const providerApiKey = process.env.INFURA_API_KEY || process.env.ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

// If not set, it uses the hardhat account 0 private key.
// You can generate a random account with `yarn generate` or `yarn account:import` to import your existing PK
const deployerPrivateKey =
  process.env.__RUNTIME_DEPLOYER_PRIVATE_KEY ??
  process.env.PRIVATE_KEY ??
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

// If not set, it uses our block explorers default API keys.
const etherscanApiKey = process.env.ETHERSCAN_MAINNET_API_KEY || "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW";
const etherscanOptimisticApiKey = process.env.ETHERSCAN_OPTIMISTIC_API_KEY || "RM62RDISS1RH448ZY379NX625ASG1N633R";
const basescanApiKey = process.env.BASESCAN_API_KEY || "ZZZEIPMT1MNJ8526VV2Y744CA7TNZR64G6";

const configOverride: HardhatUserConfig = {
  namedAccounts: {
    deployer: {
      default: 0, // Account index 0 on all networks
      // sepolia: 1, // Account index 1 on Sepolia
    },
    // admin: {
    //   default: 1,
    // },
    treasury: {
      default: "0xE1001DbDc69C961F98ac6063C17967987aCd5a65",
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.27",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000,
          },
          evmVersion: "paris",
        },
      },
      {
        version: "0.8.23",
        settings: {
          optimizer: {
            enabled: true,
            runs: 5000,
          },
          evmVersion: "paris",
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            // https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    // View the networks that are pre-configured.
    // If the network you are looking for is not here you can add new network settings
    hardhat: {
      forking: {
        url: process.env.BASE_SEPOLIA_RPC_URL!,
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
        // blockNumber: 6967613,
      },
      mining: {
        // auto: true,
        interval: 1000, // mine every second automatically
      },
      // chainId: 109,
    },
    mainnet: {
      url: process.env.ETHEREUM_RPC_URL || `https://eth.meowrpc.com`,
      chainId: 1,
      gasPrice: 30000000000,
      accounts: [deployerPrivateKey],
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com",
      chainId: 11155111,
      gasPrice: 1000000000,
      // accounts: [deployerPrivateKey],
      accounts: [process.env.ADMIN_PRIVATE_KEY_TESTNET!],
    },
    base: {
      url: process.env.BASE_RPC_URL || "https://mainnet.base.org",
      chainId: 8453,
      accounts: [process.env.ADMIN_PRIVATE_KEY!],
      // accounts: [deployerPrivateKey],
      verify: {
        etherscan: {
          apiUrl: "https://api.basescan.org",
          apiKey: basescanApiKey,
        },
      },
    },
    baseSepolia: {
      url: process.env.BASE_SEPOLIA_RPC_URL || "https://sepolia.base.org",
      chainId: 84532,
      accounts: [deployerPrivateKey],
      verify: {
        etherscan: {
          apiUrl: "https://api-sepolia.basescan.org",
          apiKey: basescanApiKey,
        },
      },
    },
    shibarium: {
      url: process.env.SHIBARIUM_RPC_URL || "https://www.shibrpc.com",
      chainId: 109,
      gasPrice: 1000000000,
      accounts: [deployerPrivateKey],
    },
    puppynet: {
      url: process.env.PUPPYNET_RPC_URL || "https://puppynet.shibrpc.com",
      chainId: 157,
      gasPrice: 1000000000,
      accounts: [deployerPrivateKey],
    },
  },
  // configuration for harhdat-verify plugin
  etherscan: {
    customChains: [
      {
        network: "puppynet",
        chainId: 157,
        urls: {
          apiURL: "https://puppyscan.shib.io/api",
          browserURL: "https://puppyscan.shib.io/",
        },
      },
      {
        network: "shibarium",
        chainId: 109,
        urls: {
          apiURL: "https://www.shibariumscan.io/api",
          browserURL: "https://www.shibariumscan.io/",
        },
      },
    ],
    enabled: false,
  },
  typechain: {
    // adds `contractName` to the generated types
    discriminateTypes: true,
  },
  // paths: {
  //   sources: "./contracts",
  //   tests: "./test",
  //   cache: "./cache",
  //   artifacts: "./artifacts",
  // },
  gasReporter: {
    currency: "USD",
    gasPrice: 1,
    enabled: !!process.env.GAS_REPORT,
  },
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            // https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "localhost",
  namedAccounts: {
    deployer: {
      // By default, it will take the first Hardhat account as the deployer
      default: 0,
    },
  },
  networks: {
    // View the networks that are pre-configured.
    // If the network you are looking for is not here you can add new network settings
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
      },
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    arbitrum: {
      url: `https://arb-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    arbitrumSepolia: {
      url: `https://arb-sepolia.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    optimism: {
      url: `https://opt-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
      verify: {
        etherscan: {
          apiUrl: "https://api-optimistic.etherscan.io",
          apiKey: etherscanOptimisticApiKey,
        },
      },
    },
    optimismSepolia: {
      url: `https://opt-sepolia.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
      verify: {
        etherscan: {
          apiUrl: "https://api-sepolia-optimistic.etherscan.io",
          apiKey: etherscanOptimisticApiKey,
        },
      },
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    polygonMumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    polygonZkEvm: {
      url: `https://polygonzkevm-mainnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    polygonZkEvmTestnet: {
      url: `https://polygonzkevm-testnet.g.alchemy.com/v2/${providerApiKey}`,
      accounts: [deployerPrivateKey],
    },
    gnosis: {
      url: "https://rpc.gnosischain.com",
      accounts: [deployerPrivateKey],
    },
    chiado: {
      url: "https://rpc.chiadochain.net",
      accounts: [deployerPrivateKey],
    },
    base: {
      url: "https://mainnet.base.org",
      accounts: [deployerPrivateKey],
      verify: {
        etherscan: {
          apiUrl: "https://api.basescan.org",
          apiKey: basescanApiKey,
        },
      },
    },
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: [deployerPrivateKey],
      verify: {
        etherscan: {
          apiUrl: "https://api-sepolia.basescan.org",
          apiKey: basescanApiKey,
        },
      },
    },
    scrollSepolia: {
      url: "https://sepolia-rpc.scroll.io",
      accounts: [deployerPrivateKey],
    },
    scroll: {
      url: "https://rpc.scroll.io",
      accounts: [deployerPrivateKey],
    },
    pgn: {
      url: "https://rpc.publicgoods.network",
      accounts: [deployerPrivateKey],
    },
    pgnTestnet: {
      url: "https://sepolia.publicgoods.network",
      accounts: [deployerPrivateKey],
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: [deployerPrivateKey],
    },
    celoAlfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [deployerPrivateKey],
    },
  },
  // configuration for harhdat-verify plugin
  etherscan: {
    apiKey: `${etherscanApiKey}`,
  },
  // configuration for etherscan-verify from hardhat-deploy plugin
  verify: {
    etherscan: {
      apiKey: `${etherscanApiKey}`,
    },
  },
  sourcify: {
    enabled: false,
  },
};

// Extend the deploy task
task("deploy").setAction(async (args, hre, runSuper) => {
  // Run the original deploy task
  await runSuper(args);
  // Force run the generateTsAbis script
  await generateTsAbis(hre);
});

function mergeConfig(config: HardhatUserConfig, configOverride: HardhatUserConfig): HardhatUserConfig {
  const baseCompilers = (config.solidity as MultiSolcUserConfig).compilers ?? [];
  const overrideCompilers = (configOverride.solidity as MultiSolcUserConfig).compilers ?? [];

  // Merge Solidity compilers
  const mergedCompilers = [
    ...baseCompilers.map(compilerBase => {
      const matchingOverride = overrideCompilers.find(
        compilerOverride => compilerOverride.version === compilerBase.version,
      );
      return merge({}, compilerBase, matchingOverride);
    }),
    ...overrideCompilers.filter(
      compilerOverride => !baseCompilers.some(compilerBase => compilerBase.version === compilerOverride.version),
    ),
  ];

  // Deep merge for other properties
  const mergedConfig = merge({}, config, configOverride);

  // Replace merged Solidity compilers
  mergedConfig.solidity = { compilers: mergedCompilers } as SolidityUserConfig;

  return mergedConfig;
}

// Use the updated mergeConfig function
const finalConfig: HardhatUserConfig = mergeConfig(config, configOverride);

// console.log("finalConfig", finalConfig);
export default finalConfig;
