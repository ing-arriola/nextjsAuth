/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { NextPageContext } from "next"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data:session} = useSession()
  console.log('*********** SESSION *************', session)
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
     <h2>{session?.user?.name}</h2>
     <img src={session?.user?.image!} alt="" className="w-32 h-32 rounded-full" />
     <h6>{session?.user.email}</h6>
     <span>Provider: <b>{session?.user.provider}</b> </span>
     {
      session ? <button onClick={() => signOut()}>Sign out</button> : <button onClick={() => signIn()}>Sign in</button>
     }
    </main>
  )
}

export async function getServerSideProps(ctx:NextPageContext) {
  const session = await getSession(ctx);
  return {
    props:{
      session
    }
  }
  
}