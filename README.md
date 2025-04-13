# Merkle Airdrop

A Merkle Airdrop implementation built with Scaffold-ETH 2 boilerplate.

## Project Structure

This is a monorepo managed with Yarn workspaces containing:

- `packages/hardhat/` - Solidity smart contracts and tests
- `packages/nextjs/` - Frontend UI application

## Tech Stack

- **Smart Contracts**: Solidity + Hardhat
- **Frontend**: 
  - Next.js 15.2 with App Router
  - TypeScript
  - Tailwind CSS v4
  - ShadCN UI Components
  - Wagmi (with viem) for contract interactions
  - RainbowKit for wallet connections
  - Tanstack Query for data fetching
  - lucide-react for icons
- **Development Tools**:
  - TypeChain for automatic TypeScript contract type generation
  - Yarn Workspaces for monorepo management
  - VSCode tasks for streamlined development workflow

## Setup

1. Install Yarn (Classic):
```sh
# # Use classic yarn
# corepack enable
# corepack prepare yarn@1.22.19 --activate
# yarn -v

# Use yarn v4.7.0
yarn init -2
```

2. Install Dependencies:
```sh
yarn install
```

## Development

The project includes VSCode tasks for a streamlined development experience. Press `Ctrl+Shift+B` to run the main build workflow, which will:

1. Compile smart contracts
2. Start a local Hardhat chain (with forking support)
3. Deploy contracts
4. Launch the Next.js development server

### Contract Development

- Smart contracts are located in `packages/hardhat/contracts/`
- Tests can be found in `packages/hardhat/test/`
- TypeChain automatically generates TypeScript types for compiled contracts
- Contract deployments are tracked in `packages/nextjs/contracts/deployedContracts.ts`
- External contract integrations can be configured in `packages/nextjs/contracts/externalContracts.ts`

### Frontend Development

The Next.js application in `packages/nextjs/` provides a modern development environment with:

- App Router for improved routing and layouts
- Full TypeScript support
- Tailwind CSS for styling
- ShadCN UI components for rapid development
- Automatic contract type integration via TypeChain

## Available Scripts

- `yarn chain`: Start a local Hardhat chain
- `yarn deploy`: Deploy contracts to the local chain
- `yarn start`: Start the Next.js development server

# Misc Notes

```sh
# Use classic yarn
corepack enable
corepack prepare yarn@1.22.19 --activate
yarn -v

# Use yarn v4.7.0
yarn init -2
```


