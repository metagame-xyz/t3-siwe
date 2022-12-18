import type {
    // type GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from 'next'

import { unstable_getServerSession } from 'next-auth'

import { requestWrapper } from 'pages/api/auth/[...nextauth]'

/**
 * Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs
 * See example usage in trpc createContext or the restricted API route
 */
export const getServerAuthSession = async (ctx: {
    // req: GetServerSidePropsContext['req']
    // res: GetServerSidePropsContext['res']
    req: NextApiRequest
    res: NextApiResponse
}) => {
    return await unstable_getServerSession(...requestWrapper(ctx.req, ctx.res))
}
