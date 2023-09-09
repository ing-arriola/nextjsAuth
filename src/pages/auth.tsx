import Background from "@/components/backgrounds/Background";
import LoginForm from "@/components/forms/Login";
import RegisterForm from "@/components/forms/Register";
import { NextPageContext } from "next";
import { getCsrfToken } from "next-auth/react";

export default function Auth({tab, callbackUrl, csfrToken}:{tab:string,callbackUrl:string, csfrToken:string}) {
  return (
    <div className="w-full flex items-center justify-center">
        <div className="w-full h-100 flex items-center justify-center">
            {/* FORM */}
            <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white">
                    {
                        tab === 'signin' ? <LoginForm callbackUrl = {callbackUrl} csfrToken={csfrToken} /> : <RegisterForm/>
                    }
                    
            </div>
            {/* BACKGROUND */}
            <Background image={`"../../auth/${tab === "signup" ? "register" : "login"}.jpg"`}/> 
        </div>
    </div>
  )
}

export const getServerSideProps = async (ctx:NextPageContext) => {
    const { req,query } = ctx
    const tab = query.tab ? query.tab : "signin"
    const callbackUrl = query.callbackUrl ? query.callbackUrl  : process.env.NEXTAUTH_URL 
    const csfrToken = await getCsrfToken(ctx)
    return {
        props:{
            tab:JSON.parse(JSON.stringify(tab)),
            callbackUrl,
            csfrToken
        }
    }
}
