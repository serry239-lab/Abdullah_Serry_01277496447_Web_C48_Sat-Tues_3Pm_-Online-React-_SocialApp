import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { addPost } from "./apis/create-post.api";

export default function CreatePost() {
  const [body, setBody] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imgPreview, setimgPreview] = useState("");

  const queryClient = useQueryClient();
  const {  isPending, mutate } = useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    mutationFn: addPost,
  });

  function handleBody(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setBody(e.target.value);
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setimgPreview(URL.createObjectURL(file));
  }

  async function handlePost() {
    const formData = new FormData();
    formData.append("body", body);
    if (image) formData.append("image", image);
    mutate(formData);
    cancelPost();
  }


  function cancelPost() {
    setImage(null);
    setBody("");
    setimgPreview("");
  }

  return (
    <div>
      <div className="heading text-center font-bold text-2xl m-5 text-gray-800">
        New Post
      </div>
      <div className="editor mx-auto w-1/2 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg rounded-2xl">
        <textarea
          onChange={handleBody}
          className="description bg-gray-100 sec p-3 h-30 border border-gray-300 outline-none"
          spellCheck="false"
          placeholder="Describe everything about this post here"
          value={body}
        />
        {/* icons */}
        <div className="icons flex text-gray-500 m-2">
          <label htmlFor="postImage">
            <GrAttachment className="text-2xl m-1" />
          </label>
          <input
            type="file"
            id="postImage"
            className="hidden"
            onChange={handleImage}
          />
        </div>
        {imgPreview && (
          <div className="m-4 relative">
            <img
              src={imgPreview}
              className="w-full h-72 object-cover rounded-2xl mx-auto my-5"
              alt=""
            />
            <IoIosCloseCircleOutline
              onClick={() => setimgPreview("")}
              className="absolute top-0 right-0"
            />
          </div>
        )}
        {/* buttons */}
        <div className="buttons flex">
          <div className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">
            Cancel
          </div>
          <button
            onClick={handlePost}
            className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
          >
            {isPending ? "Post....." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
