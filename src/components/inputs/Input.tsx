import * as React from 'react';
import { useState } from 'react';
import { FieldError, FieldErrorsImpl, FieldValues, Merge, UseFormRegister } from 'react-hook-form';
import {IoAlertCircle} from 'react-icons/io5'
import {ImEye,ImEyeBlocked} from 'react-icons/im'

interface IInputProps {
    name:string;
    label:string;
    type:string;
    icon:JSX.Element;
    placeholder:string;
    register: any;
    error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
    disabled: boolean;
}

const Input: React.FunctionComponent<IInputProps> = (props) => {
    const {name,label,type,icon,placeholder, register, error, disabled} = props
    const [showPassword, setshowPassword] = useState(false)
  return (
  <section className="mt-3 w-[100%]">
    <label htmlFor={name} className="text-gray-700">
        {label}
    </label>
    <section className='relative mt-1 rounded-md'>
        <div 
            className="pointer-event-none absolute left-0 inset-y-0 flex items-center pl-3"
            style={{transform:`${error && name === 'first_name' || error && name === 'last_name'  ? 'translateY(-20px)': error ? 'translateY(-10px)':''}`}} >
            <span className="text-gray-500 text-sm">
                {icon}
            </span>
        </div>
        <input 
            type={showPassword ? 'text' : type}
            className='w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-1 outline-transparent focus:border-blue-500 focus:ring-blue-700 focus:ring-1 text-sm'
            placeholder={placeholder}
            style={{
                borderColor:`${error ? "#ED4337" : "" }`, color:'black'
            }}
            {...register(name)}
        />
        {
            (name === 'password' || name === "confirmPassword") &&
                <div className="absolute top-2.5 right-2 text-xl text-gray-700 cursor-pointer"
                     style={{right:`${error?'2rem':''}`}}
                     onClick={()=>setshowPassword(prev=>!prev)}
                >
                    {showPassword ? <ImEye/> : <ImEyeBlocked/>}
                </div>
        }
        {error && (
                <div className="fill-red-500 absolute right-2 top-2.5 text-xl">
                <IoAlertCircle fill='#ED4337' />
                </div> 
        )}
        {error && (
            <p className='text-sm text-[#ED4337] mt-1' >
            {error as string}
        </p>
        )}
    </section>
  </section>
  );
};

export default Input;
