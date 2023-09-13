import type { NextApiRequest, NextApiResponse } from "next";
import { resetPasswordEmail } from "@/emailTemplates/reset";
import User from "@/models/User";
import connectDb from "@/utils/connectDB";
import sendMail from "@/utils/sendMails";
import { createResetToken } from "@/utils/tokens";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDb();
    const { email } = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message:'This email does not exist'})
    }
    const user_id = createResetToken({
      id:user.id.toString()
    })
    const url = `${process.env.NEXTAUTH_URL}/reset/${user_id}`
    await sendMail(email,user.name,user.image,url,'Reset your password',resetPasswordEmail)
    res.json({
      message: "We have sent you an email, please use it to reset your password.",
    });
    
    
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}