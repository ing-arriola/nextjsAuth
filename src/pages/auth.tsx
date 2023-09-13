import Background from "@/components/backgrounds/Background";
import SocialButton from "@/components/buttons/SocialButton";
import LoginForm from "@/components/forms/Login";
import RegisterForm from "@/components/forms/Register";
import { NextPageContext } from "next";
import { getCsrfToken, getProviders } from "next-auth/react";

export default function Auth(
    {tab, callbackUrl, csfrToken,providers}:
    {tab:string,callbackUrl:string, csfrToken:string, providers:any}) {
  return (
    <div className="w-full flex items-center justify-center">
        <div className="w-full h-100 flex items-center justify-center">
            {/* FORM */}
            <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white">
                    {
                        tab === 'signin' 
                            ? <LoginForm callbackUrl = {callbackUrl} csfrToken={csfrToken} /> 
                            : <RegisterForm/>
                    }
                <section className="w-full flex items-center justify-between">
                    <div className="w-full h-[1px] bg-gray-300"/>
                    <span className="text-sm uppercase mx-6 text-gray-600" >OR</span>
                    <div className="w-full h-[1px] bg-gray-300"/>
                </section>
                <section className="mt-3 grid grid-cols-1 gap-2 justify-items-center" >
                    {providers.map((provider:any) => {
                        if(provider.name === 'Credentials') return
                        return(
                            <SocialButton
                                key={provider.id}
                                id={provider.id}
                                text={
                                    tab === 'sign up' 
                                    ? `sign up with ${provider.name}`
                                    :`sign in with ${provider.name}`
                                }
                                csrfToken={csfrToken}
                            />
                        )
                    })}
                </section>
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
    const providers = await getProviders();
    console.log(providers)
    return {
        props:{
            providers:Object.values(providers!),
            tab:JSON.parse(JSON.stringify(tab)),
            callbackUrl,
            csfrToken
        }
    }
}
