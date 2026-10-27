import { Button,  TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { CiAt } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { zodResolver } from "./../../../../node_modules/@hookform/resolvers/zod/src/zod";
import { loginSchemaObj, type loginSchema } from "../Schema/login.schema";
import { signIn } from "../apis/login.api";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from './../../../context/auth.context';


export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const context = useContext(authContext);
  if(!context)
    throw new Error;
  const {setToken,setUser} = context;
  
  
 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } =  useForm<loginSchema>({
    resolver: zodResolver(loginSchemaObj),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleLogin(data: loginSchema) {
    try {
      setLoading(true);
      const res = await signIn(data);
      
      if (res?.success) {
        localStorage.setItem('tkn',res?.data?.token);
        localStorage.setItem('user',JSON.stringify(res?.data?.user));
        setToken(res?.data?.token);
        setUser(res?.data?.user);
        toast.success(res?.message);
        if(localStorage.getItem('tkn')){
          navigate('/feed');
        }
        
      }
    } catch (error:any) {
      toast.error(error?.response.data.message);
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900">
        Log in to Route Posts
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Log in and continue your social journey.
      </p>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex max-w-md flex-col gap-4 mx-auto my-10"
      >
        <div>
          <TextInput
            icon={CiAt}
            id="email"
            type="email"
            placeholder="email address"
            {...register("email")}
          />
          {errors?.email && (
            <span className="text-rose-900"> {errors.email?.message}</span>
          )}
        </div>
        <div>
          <TextInput
            icon={IoKeyOutline}
            id="password1"
            type="password"
            placeholder="password"
            {...register("password")}
          />
          {errors?.password && (
            <span className="text-rose-900"> {errors.password?.message}</span>
          )}
        </div>
        <Button
        disabled={isLoading}
          className="w-full rounded-xl py-1 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]"
          type="submit"
        >
          {isLoading? <FaSpinner /> : ""}Log In 
        </Button>
      </form>
    </>
  );
}
