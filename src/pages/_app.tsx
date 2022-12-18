import { type Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { type AppType } from 'next/app'
import { Chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { goerli, mainnet, optimism, polygon } from 'wagmi/chains'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { ALCHEMY_PROJECT_ID } from 'utils/constants'
import { trpc } from 'utils/trpc'

import 'styles/globals.css'

export const { chains, provider } = configureChains(
    [mainnet, goerli, polygon, optimism],
    [alchemyProvider({ apiKey: ALCHEMY_PROJECT_ID }), publicProvider()],
)

const wagmiClient = createClient({
    autoConnect: true,
    connectors: [new InjectedConnector({ chains })],
    provider,
})

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <WagmiConfig client={wagmiClient}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        </WagmiConfig>
    )
}

export default trpc.withTRPC(MyApp)
