import Input from '../inputs/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { AiOutlineMail } from 'react-icons/ai';
import { FiLock } from 'react-icons/fi';
import SlideButton from '../buttons/SlideButton';
import { toast } from 'react-toastify';
import Link from 'next/link';
import axios from 'axios';

interface IForgotFormProps {}

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})
type FormSchemaType = z.infer<typeof FormSchema>;
const ForgotForm: React.FunctionComponent<IForgotFormProps> = (props) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({resolver:zodResolver(FormSchema )})

  const onSubmit:SubmitHandler<FormSchemaType> = async(values) => {
   try {
    const {data} = await axios.post('/api/auth/forgot',{
      email:values.email
    })
    toast.success(data.message)
   } catch (error:any) {
    toast.error(error.response.data.message)
   }
  }
 
  
  return (
    <div className="w-full px-12 py-4">
                    <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
                        Forgot password
                    </h2>
                    <p className="text-center text-sm text-gray-600 mt-2">
                        Sign in instead &nbsp;
                        <Link 
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer" href={''}                            >
                            Sign in
                        </Link>
                    </p>
    <form  
      onSubmit={handleSubmit(onSubmit)} 
      className="my-8 text-sm">
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
           
        <SlideButton
          type = 'submit'
          text = 'Send email'
          slide_text="Securte reset "
          icon = {<FiLock/>}
          disabled={isSubmitting}
        />
    </form>
    </div>
  );
};

export default ForgotForm;
