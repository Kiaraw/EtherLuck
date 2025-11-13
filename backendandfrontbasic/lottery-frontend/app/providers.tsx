"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { defineChain } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { metaMask } from "wagmi/connectors";

// ✅ Hardhat localhost (31337)
const hardhatLocal = defineChain({
  id: 31337,
  name: "Hardhat Localhost",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
});

// ✅ Configuration Wagmi
const config = createConfig({
  chains: [hardhatLocal],
  connectors: [metaMask()],
  transports: {
    [hardhatLocal.id]: http("http://127.0.0.1:8545"),
  },
  ssr: false,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}