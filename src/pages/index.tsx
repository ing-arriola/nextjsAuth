/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import { NextPageContext } from "next"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { Inter } from 'next/font/google'
import {AiFillGithub,AiFillLinkedin} from 'react-icons/ai'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data:session} = useSession()
  const text1: string =
    "This is a full build that covers the full authentification process from login, Register, sending emails (for activating acount,reset password and password change notice), forgot password, reset password,advanced form validation,protected routes, session manipulation...";
  const text2: string =
    "In this build we used React js, Next js, Mongodb, Mongoose, Typecript, Next auth,React-hook-form, Zod,Axios, Nodemailer, Smtp service, Gmail stmp, Axios, React-toastify, Zxcvbn, Handlebars, BcryptJs...";
  
  console.log('*********** SESSION *************', session)
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center`}
    >
     <div className="container mx-auto">
      <div className="border boder-white relative flex flex-col w-full rounded-lg">
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full text-right">
            <div className="py-6 px-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-md text-white uppercase font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
                onClick={() => signOut()}
              >Log Out
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <img src={session?.user?.image!} alt={`${session?.user.name} iamge`} className="w-40 h-40 rounded-full" />
          </div>
          <div className="text-center mt-12">
            <h3 className="text-4xl font-semibold mb-2">
              {session?.user.name}
            </h3>
            <section className="text-sm mb-2 font-bold">
              {session?.user.email}
            </section>
            <section className=" mt-4">
                You logged in using &nbsp;
                <span className="apitalize bg-blue-400 text-white px-4 py-1 ml-2 font-bold italix text-lg rounded-md">
                  {session?.user.provider}
                </span>
            </section>
          </div>
          <section className="mt-4 border-t text-center">
            <section className="flex-flex-wrap justify-center">
              <section className="w-full px-4 mt-2 mb-2">
                <p className="mb-4 text-sm">{text1}</p>
                <p className="font-bold text-xs">{text2}</p>
                <section className="mt-6 flex items-center justify-center gap-2">
                  Source code here : &nbsp;
                  <a 
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-4xl"
                  >
                    <AiFillGithub/>
                  </a>
                </section>
                <section className="flex justify-center gap-4 mt-4 pt-6 text-3xl" >
                  <a 
                  href="http://"
                  target=" _blank"
                  rel="noopener noreferrer"
                  className= "hover:scale-125 transition ease-in-out"
                  >
                    <AiFillLinkedin/>
                  </a>
                  <a 
                  href=""
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-125 transition ease-in-out"
                  >
                    <AiFillGithub/>
                  </a>
                </section>
              </section>
            </section>
          </section>
        </div>
      </div>
     </div>
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