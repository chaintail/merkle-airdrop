import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { rainbowkitBurnerWallet } from "burner-connector";
import * as chains from "viem/chains";
import scaffoldConfig from "~~/scaffold.config";

const { onlyLocalBurnerWallet, targetNetworks } = scaffoldConfig;

// check `targetNetworks` for any network ID that matches `hardhat` (31337),
// and for any network ID is not `hardhat`.
const includesHardhatNetwork = targetNetworks.some(network => network.id === (chains.hardhat as chains.Chain).id);
const includesNonHardhatNetwork = targetNetworks.some(network => network.id !== (chains.hardhat as chains.Chain).id);

console.debug({ targetNetworks });
console.debug({ includesHardhatNetwork });
console.debug({ includesNonHardhatNetwork });

const wallets = [];
if (includesNonHardhatNetwork || !onlyLocalBurnerWallet) {
  wallets.push(metaMaskWallet, walletConnectWallet, ledgerWallet, coinbaseWallet, rainbowWallet, safeWallet);
}

if (includesHardhatNetwork) {
  wallets.push(rainbowkitBurnerWallet);
}

// const wallets = [
//   metaMaskWallet,
//   walletConnectWallet,
//   ledgerWallet,
//   coinbaseWallet,
//   rainbowWallet,
//   safeWallet,
//   // ONLY hh or !onlyLocalBurnerWallet
//   ...(!targetNetworks.some(network => network.id !== (chains.hardhat as chains.Chain).id) || !onlyLocalBurnerWallet
//     ? [rainbowkitBurnerWallet]
//     : []),
// ];

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets(
  [
    {
      groupName: "Supported Wallets",
      wallets,
    },
  ],

  {
    appName: "dust-charity-app",
    projectId: scaffoldConfig.walletConnectProjectId,
  },
);
