import axios from "axios";

export async function addComment({
  formData,
  postId,
}: {
  postId: String;
  formData: FormData;
}) {
  const userToken = localStorage.getItem("tkn");
  const { data } = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${userToken} `,
      },
    },
  );
  return data;
}
