import Input from '../inputs/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineMail } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';
import SlideButton from '../buttons/SlideButton';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

interface ILoginFormProps {
  callbackUrl:string;
  csfrToken:string
}

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password : z.string().min(6,'Password must be at least 6 characters')       
              .max(40,'Password must be less than 40 characters'),
})
type FormSchemaType = z.infer<typeof FormSchema>;
const LoginForm: React.FunctionComponent<ILoginFormProps> = (props) => {
  const {callbackUrl,csfrToken} = props
  const router = useRouter()
  const path = router.pathname
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({resolver:zodResolver(FormSchema )})

  const onSubmit:SubmitHandler<FormSchemaType> = async(values) => {
    const res = await signIn('credentials',{
      redirect:false,
      email:values.email,
      password: values.password,
      callbackUrl
    })
    if(res?.error){
      return toast.error(res.error)
    }else{
      return router.push("/")
    }
  }

  
  return (
    <div className="w-full px-12 py-4">
                    <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
                        Sign in
                    </h2>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Do you need an account? &nbsp;
                        <a 
                            className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
                            onClick={()=>{
                              router.push({
                                pathname:path,
                                query:{
                                  tab:'signup'
                                }
                              })
                            }}
                            >
                            Sign up
                        </a>
                    </p>
    <form  
      method='post'
      action="/api/auth/signin/email"
      onSubmit={handleSubmit(onSubmit)} 
      className="my-8 text-sm">
        <input type="hidden" name="csfrToken" defaultValue={csfrToken} />
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
                name='password'
                label='Password'
                type='password'
                icon={<FiLock/>}
                placeholder='**************'
                register = {register }
                error = {errors?.password?.message}
                disabled={isSubmitting}
            />
           
           
        <SlideButton
          type = 'submit'
          text = 'Sign in'
          slide_text="Securte sign in"
          icon = {<FiLock/>}
          disabled={isSubmitting}
        />
    </form>
    </div>
  );
};

export default LoginForm;
