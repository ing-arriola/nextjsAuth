import Background from "@/components/backgrounds/Background";
import ResetForm from "@/components/forms/Reset";
import { NextPageContext } from "next";

export default function Reset({token}:{token:string}) {
  return (
    <div className="w-full flex items-center justify-center">
        <div className="w-full h-100 flex items-center justify-center">
            {/* FORM */}
            <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white">
               <ResetForm token={token}/>

              
            </div>
            {/* BACKGROUND */}
            <Background image="../../auth/reset.jpg"/> 
        </div>
    </div>
  )
}

export const getServerSideProps = async (ctx:NextPageContext) => {
    const token = ctx.query.token
  return {
    props:{
      token
    }
  }
}


