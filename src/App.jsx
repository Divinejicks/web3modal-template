
import './App.css'

import { createWeb3Modal } from '@web3modal/wagmi/react'

import { WagmiConfig,createConfig, configureChains } from 'wagmi'
import { bsc, mainnet, bscTestnet } from 'viem/chains'
import {walletConnectProvider, EIP6963Connector} from "@web3modal/wagmi"
import {publicProvider} from "wagmi/providers/public"
import {CoinbaseWalletConnector} from "wagmi/connectors/coinbaseWallet"
import {InjectedConnector} from "wagmi/connectors/injected"
import {WalletConnectConnector} from "wagmi/connectors/walletConnect"


// 1. Get projectId
const projectId = '45ff7348e614a721653a8d6d577b43da'

// 2. Create wagmiConfig
const metadata = {
  name: 'web3-modal-setup',
  description: 'Web3 Modal Example',
}

const usedChains = [mainnet, bsc, bscTestnet]

const {chains, publicClient} = configureChains(usedChains, [walletConnectProvider({projectId}), publicProvider()])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
      new WalletConnectConnector({chains, options: {projectId, showQrModal: true, metadata}}),
      new EIP6963Connector({chains}),
      new InjectedConnector({chains, options: {shimDisconnect: true}}),
      new CoinbaseWalletConnector({chains, options: {appName: metadata.name}}),
  ],
  publicClient,
})

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains })

function App() {

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <w3m-button />
      </WagmiConfig>
      
    </>
  )
}

export default App
