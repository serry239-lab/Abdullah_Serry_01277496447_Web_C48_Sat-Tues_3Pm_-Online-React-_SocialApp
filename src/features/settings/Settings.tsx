import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../context/auth.context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchemaObj,
  type ChangePasswordSchema,
} from "./Schema/changePass.schema";
import { changePassword } from "./apis/changePassword.api";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function Settings() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(authContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchemaObj),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function handleChangePassword(data: ChangePasswordSchema) {
    try {
      setLoading(true);
      const res = await changePassword(data);
      console.log(res);
      
      toast.success("Password changed successfully! Please log in again.");

      localStorage.removeItem("tkn");
      localStorage.removeItem("user");
      context?.setToken(null);
      context?.setUser(null);

      navigate("/");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update password",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Settings</title>
        <link rel="canonical" content="" />
      </Helmet>
    <div className="mx-auto max-w-7xl px-3 py-3.5">
      <main className="min-w-0">
        <div className="mx-auto max-w-2xl">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold text-slate-800">
              Change Password
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Keep your account secure by using a strong password.
            </p>

            <form
              onSubmit={handleSubmit(handleChangePassword)}
              className="space-y-4"
            >
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Current password
                </span>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="Enter current password"
                  className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none"
                />
                {errors.password && (
                  <span className="mt-1 block text-xs font-semibold text-rose-600">
                    {errors.password.message}
                  </span>
                )}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  New password
                </span>
                <input
                  {...register("newPassword")}
                  type="password"
                  placeholder="Enter new password"
                  className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none"
                />
                {errors.newPassword ? (
                  <span className="mt-1 block text-xs font-semibold text-rose-600">
                    {errors.newPassword.message}
                  </span>
                ) : (
                  <span className="mt-1 block text-xs text-slate-500">
                    At least 8 characters with uppercase, lowercase, number, and
                    special character.
                  </span>
                )}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-bold text-slate-700">
                  Confirm new password
                </span>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="Re-enter new password"
                  className="w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-slate-800 outline-none"
                />
                {errors.confirmPassword && (
                  <span className="mt-1 block text-xs font-semibold text-rose-600">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </label>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Updating..." : "Update password"}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
    </>
  );
}
