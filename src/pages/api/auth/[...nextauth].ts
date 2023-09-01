import NextAuth, { Account, Profile, User } from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github"
import clientPromise from '@/lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import { JWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters'


export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string
    }),
    GitHubProvider({
        clientId: process.env.GITHUB_ID as string,
        clientSecret: process.env.GITHUB_SECRET as string
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID as string,
        clientSecret: process.env.FACEBOOK_SECRET as string
      }),
  ],
  secret:process.env.NEXTAUTH_SECRET,
  session:{
    strategy:'jwt'
  },
  callbacks:{
    async jwt({ token, user, account, profile, isNewUser }:{
        token:JWT ;
        user?:User | AdapterUser | undefined;
         account?:Account | null | undefined ;
         profile?: Profile | undefined ;
         isNewUser?: boolean | undefined
    }) {
        if (user) {
            token.provider = account?.provider
        }
        return token
      },
      async session ({session,token}: {
        session: any;
        token: JWT;
    }) {
        if(session.user){
            session.user.provider = token.provider
        }
        return session
      },
  }
})