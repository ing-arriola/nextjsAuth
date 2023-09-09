import { useEffect, useState } from 'react';
import {CiUser} from 'react-icons/ci'
import Input from '../inputs/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import validator from 'validator';
import { AiOutlineMail } from 'react-icons/ai';
import { BsTelephone } from 'react-icons/bs';
import { FiLock } from 'react-icons/fi';
import zxcvbn from 'zxcvbn';
import SlideButton from '../buttons/SlideButton';
import { toast } from 'react-toastify';
import axios from 'axios';

interface IRegisterFormProps {
}

const FormSchema = z.object({
  first_name : z.string()
               .min(4,'First name must have at least 4 characters')             
               .max(30,'First name must have less than 30 characters')
               .regex(new RegExp("^[a-zA-z]+$"),'No special characters allowed'),
  last_name : z.string()
               .min(4,'Last name must have at least 4 characters')             
               .max(30,'Last name must have less than 30 characters')
               .regex(new RegExp("^[a-zA-z]+$"),'No special characters allowed'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().refine(validator.isMobilePhone,{message:"Please enter a valid phone number"}),
  password : z.string().min(6,'Password must be at least 6 characters')       
              .max(40,'Password must be less than 40 characters'),
  accept : z.literal( true,{ errorMap:()=>({message:'Please agree to all terms and conditions before continuing.'}) }),
  confirmPassword : z.string()
}).refine((data) => data.password === data.confirmPassword,{message:"Password does not match",path:['confirmPassword']}) ;
type FormSchemaType = z.infer<typeof FormSchema>;
const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
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
      const { data } = await axios.post('/api/auth/signup',{
        ...values
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
                        Sign up
                    </h2>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Do you already have an account? &nbsp;
                        <a href="" className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer">
                            Sign in
                        </a>
                    </p>
    <form  
      onSubmit={handleSubmit(onSubmit)} 
      className="my-8 text-sm">
        <section className="gap-2 md:flex">
            <Input
                name='first_name'
                label='First Name'
                type='text'
                icon={<CiUser/>}
                placeholder='example'
                register = {register }
                error = {errors?.first_name?.message}
                disabled={isSubmitting}
            />
             <Input
                name='last_name'
                label='Last Name'
                type='text'
                icon={<CiUser/>}
                placeholder='example'
                register = {register }
                error = {errors?.last_name?.message}
                disabled={isSubmitting}
            />
        </section>
        <Input
                name='email'
                label='Email address'
                type='text'
                icon={<AiOutlineMail/>}
                placeholder='example@example.com'
                register = {register }
                error = {errors?.email?.message}
                disabled={isSubmitting}
            />
          <Input
                name='phone'
                label='Phone'
                type='text'
                icon={<BsTelephone/>}
                placeholder='+(x) xxx-xx-xxx'
                register = {register }
                error = {errors?.phone?.message}
                disabled={isSubmitting}
            />
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
            <section className="flex items-center mt-3">
              <input 
                type="checkbox" 
                id='accept' 
                className='mr-2 focus:ring-0 rounded' 
                {...register('accept')}  
              />
              <label htmlFor="accept" className="text-gray-700">
                I accept the&nbsp;{""}
                <a 
                  href=""
                  className='text-blue-600 hover:text-blue-700 hover:underline'
                  target='_blank'
                >
                  terms and conditions
                </a>
              </label>
            </section>
            {errors?.accept && (
              <section >
                <p className='mt-1 text-red-600 text-sm'>
                {errors?.accept?.message}
                </p>
              </section>
            )}
        <SlideButton
          type = 'submit'
          text = 'Sign up'
          slide_text="Securte sign up"
          icon = {<FiLock/>}
          disabled={isSubmitting}
        />
    </form>
    </div>
  );
};

export default RegisterForm;
