import axios from "axios";
import {  type ChangePasswordSchema } from "../Schema/changePass.schema";

export async function changePassword(formData: ChangePasswordSchema) {
  const userToken = localStorage.getItem("tkn");

  const { data } = await axios.patch(
    `${import.meta.env.VITE_BASE_URL}/users/change-password`,
    {
      password: formData.password,
      newPassword: formData.newPassword,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    },
  );

  return data;
}
