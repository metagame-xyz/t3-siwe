import { type DefaultSession, type DefaultUser } from 'next-auth'

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        address?: string
        user?: {
            id: string
        } & DefaultSession['user']
    }

    interface User extends DefaultUser {
        address: string
    }
}
