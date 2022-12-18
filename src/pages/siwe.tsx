import { useEffect, useState } from 'react'

import { getCsrfToken, signIn, useSession } from 'next-auth/react'
import { SiweMessage } from 'siwe'
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

// import Layout from '../components/layout'

function Siwe() {
    const { signMessageAsync } = useSignMessage()
    const { chain } = useNetwork()
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { data: session, status } = useSession()

    // console.log('session', session)

    const handleLogin = async () => {
        try {
            const callbackUrl = '/protected'
            const message = new SiweMessage({
                domain: window.location.host,
                address: address,
                statement: 'Sign in with Ethereum to the app.',
                uri: window.location.origin,
                version: '1',
                chainId: chain?.id,
                nonce: await getCsrfToken(),
            })
            const signature = await signMessageAsync({
                message: message.prepareMessage(),
            })
            signIn('credentials', {
                message: JSON.stringify(message),
                redirect: false,
                signature,
                callbackUrl,
            })
        } catch (error) {
            window.alert(error)
        }
    }

    // useEffect(() => {
    //     console.log(isConnected)
    //     if (isConnected && !session) {
    //         handleLogin()
    //     }
    // }, [isConnected])

    return (
        // <Layout>
        <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={(e) => {
                e.preventDefault()
                if (!isConnected) {
                    connect()
                } else {
                    handleLogin()
                }
            }}
        >
            Sign-in
        </button>
        // </Layout>
    )
}

export async function getServerSideProps(context: any) {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}

// Siwe.Layout = Layout

export default Siwe
