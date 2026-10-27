import { Button, Select, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { CiAt, CiCalendar } from "react-icons/ci";
import { FaSpinner, FaUser } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { IoKeyOutline } from "react-icons/io5";
import { zodResolver } from "./../../../../node_modules/@hookform/resolvers/zod/src/zod";
import {
  registerSchemaObj,
  type registerSchema,
} from "../Schema/register.schema";
import { signUp } from "../apis/register.api";
import { toast } from "react-toastify";
import { useState } from "react";

export default function Register() {
  const [isLoading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerSchema>({
    resolver: zodResolver(registerSchemaObj),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      email: "",
      gender: "female",
      password: "",
      rePassword: "",
      username: "",
    },
  });

  async function handleRegister(data: registerSchema) {
    try {
      setLoading(true);
      const res = await signUp(data);
      if (res?.success) {
        toast.success(res?.message);
      }
    } catch (error) {
      const message = (error as { response?: { data?: { message?: string } } })
        ?.response?.data?.message;
      toast.error(message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900">
        Create a new account
      </h2>
      <p className="mt-1 text-sm text-slate-500">It is quick and easy.</p>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="flex max-w-md flex-col gap-4 mx-auto my-10"
      >
        <div>
          <TextInput
            icon={FaUser}
            id="name"
            type="text"
            placeholder="Full Name"
            {...register("name")}
          />
          {errors?.name && (
            <span className="text-rose-900"> {errors.name?.message}</span>
          )}
        </div>
        <div>
          <TextInput
            icon={CiAt}
            id="username"
            type="text"
            placeholder="username"
            {...register("username")}
          />
          {errors?.username && (
            <span className="text-rose-900"> {errors.username?.message}</span>
          )}
        </div>
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
        <Select {...register("gender")} icon={FiUsers} id="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
        {errors?.gender && (
          <span className="text-rose-900"> {errors.gender?.message}</span>
        )}
        <div>
          <TextInput
            {...register("dateOfBirth")}
            icon={CiCalendar}
            id="date"
            type="date"
          />
          {errors?.dateOfBirth && (
            <span className="text-rose-900">
              {" "}
              {errors.dateOfBirth?.message}
            </span>
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
        <div>
          <TextInput
            icon={IoKeyOutline}
            id="password2"
            type="password"
            placeholder="confirm password"
            {...register("rePassword")}
          />
          {errors?.rePassword && (
            <span className="text-rose-900"> {errors.rePassword?.message}</span>
          )}
        </div>
        <Button
          disabled={isLoading}
          className="w-full rounded-xl py-1 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]"
          type="submit"
        >
          {isLoading ? <FaSpinner /> : ""}Register
        </Button>
      </form>
    </>
  );
}
