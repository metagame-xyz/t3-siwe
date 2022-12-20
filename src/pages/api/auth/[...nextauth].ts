// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { User } from '@prisma/client'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import CredentialsProvider from 'next-auth/providers/credentials'
// import DiscordProvider from 'next-auth/providers/discord'
import { getCsrfToken } from 'next-auth/react'
import { NextApiRequest, NextApiResponse } from 'next/types'
import { SiweMessage } from 'siwe'

// import { env } from 'env/server.mjs'
import { prisma } from 'server/db/client'

import { NEXTAUTH_URL } from 'utils/constants'

const prismaAdapter = PrismaAdapter(prisma)

export function requestWrapper(
    req: NextApiRequest,
    res: NextApiResponse,
): [req: NextApiRequest, res: NextApiResponse, opts: NextAuthOptions] {
    const authOptions: NextAuthOptions = {
        // Include address on session
        callbacks: {
            async session({ session, token }) {
                session.address = token.sub
                // session.user.name = token.sub
                // session.user.image = 'https://www.fillmurray.com/128/128'
                return session
            },
        },
        session: {
            strategy: 'jwt',
        },
        // Configure one or more authentication providers
        adapter: prismaAdapter,
        providers: [
            // DiscordProvider({
            //     clientId: env.DISCORD_CLIENT_ID,
            //     clientSecret: env.DISCORD_CLIENT_SECRET,
            // }),
            CredentialsProvider({
                name: 'Ethereum',
                credentials: {
                    message: {
                        label: 'Message',
                        type: 'text',
                        placeholder: '0x0',
                    },
                    signature: {
                        label: 'Signature',
                        type: 'text',
                        placeholder: '0x0',
                    },
                },
                async authorize(credentials) {
                    try {
                        const siwe = new SiweMessage(
                            JSON.parse(credentials?.message || '{}'),
                        )
                        const nextAuthUrl = new URL(NEXTAUTH_URL)

                        const result = await siwe.verify({
                            signature: credentials?.signature || '',
                            domain: nextAuthUrl.host,
                            nonce: await getCsrfToken({ req }),
                        })

                        if (result.success) {
                            let user: AdapterUser | User | null =
                                await prismaAdapter.getUserByAccount({
                                    provider: 'ethereum',
                                    providerAccountId: siwe.address,
                                })
                            if (!user) {
                                user = await prisma.user.create({
                                    data: {
                                        email: 'undefined',
                                        emailVerified: null,
                                        address: siwe.address,
                                        accounts: {
                                            create: {
                                                provider: 'ethereum',
                                                providerAccountId: siwe.address,
                                                type: 'evm',
                                            },
                                        },
                                    },
                                })
                            }

                            return {
                                ...user,
                                address: siwe.address,
                                id: siwe.address,
                            }
                        }
                        return null
                    } catch (e) {
                        return null
                    }
                },
            }),

            // ...add more providers here
        ],
    }

    return [req, res, authOptions]
}

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = requestWrapper(req, res)
    return await NextAuth(...data)
}

export default handler

// export default NextAuth(authOptions)
