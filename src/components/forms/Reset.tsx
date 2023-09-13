import { useEffect, useState } from 'react';
import Input from '../inputs/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { FiLock } from 'react-icons/fi';
import zxcvbn from 'zxcvbn';
import SlideButton from '../buttons/SlideButton';
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';

interface IResetFormProps {
  token:string
}

const FormSchema = z.object({
  
  password : z.string().min(6,'Password must be at least 6 characters')       
              .max(40,'Password must be less than 40 characters'),
  confirmPassword : z.string()
}).refine((data) => data.password === data.confirmPassword,{message:"Password does not match",path:['confirmPassword']}) ;
type FormSchemaType = z.infer<typeof FormSchema>;
const ResetForm: React.FunctionComponent<IResetFormProps> = (props) => {
  const {token} = props

  const [passwordScore, setpasswordScore] = useState(0)
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({resolver:zodResolver(FormSchema )})

  const onSubmit:SubmitHandler<FormSchemaType> = async(values) => {
    try {
      const { data } = await axios.post('/api/auth/reset',{
        password:values.password,
        token
      })
      reset()
      toast.success(data.message)
    } catch (error:any) {
      toast.error(error.response.data.message)
    }
  }
  const validatePasswordStrength = () =>{
    let password = watch().password;
    return zxcvbn(password ? password : "").score
  }
  useEffect(() => {
    setpasswordScore(validatePasswordStrength())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch().password])
  
  return (
    <div className="w-full px-12 py-4">
                    <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
                        Reset Password
                    </h2>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Sign in instead &nbsp;
                        <Link
                          href='/auth'
                          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                        >
                          Sign in
                        </Link>
                    </p>
    <form  
      onSubmit={handleSubmit(onSubmit)} 
      className="my-8 text-sm">
        
            <Input
                name='password'
                label='Password'
                type='password'
                icon={<FiLock/>}
                placeholder='**************'
                register = {register }
                error = {errors?.password?.message}
                disabled={isSubmitting}
            />
            {watch().password?.length > 0 && (
              <div className="flex mt-3 ">
                {
                  Array.from(Array(5).keys()).map((span,i)=> (
                    <span className='w-1/5 px-1' key={i}>
                      <div className={`h-2 rounded-xl b ${
                        passwordScore <= 2 ?
                        "bg-red-400"
                        : passwordScore <4 ?
                        "bg-yellow-400" :
                        "bg-green-500"
                      }`}></div>
                    </span>
                  ))
                }
              </div>
            )}
            <Input
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                icon={<FiLock/>}
                placeholder='**************'
                register = {register }
                error = {errors?.confirmPassword?.message}
                disabled={isSubmitting}
            />
            
        <SlideButton
          type = 'submit'
          text = 'Change password'
          slide_text="Secure change"
          icon = {<FiLock/>}
          disabled={isSubmitting}
        />
    </form>
    </div>
  );
};

export default ResetForm;
