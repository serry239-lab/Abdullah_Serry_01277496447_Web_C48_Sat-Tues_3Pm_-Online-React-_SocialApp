import { TextInput } from "flowbite-react";
import type { Post } from "../feed/interfaces/post.interface";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "./apis/add-comment.api";
import { GrAttachment } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";

export default function AddComment({ post }: { post: Post }) {
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imgPreview, setimgPreview] = useState("");

  const queryClient = useQueryClient();
  const {  mutate } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", post._id] });
      queryClient.invalidateQueries({ queryKey: ["post", post._id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });


  function handleContent(e: React.ChangeEvent<HTMLInputElement>) {
    setContent(e.target.value);
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setimgPreview(URL.createObjectURL(file));
  }

  async function handleComment() {
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);
    mutate({ formData, postId: post._id });
    cancelPost();
  }

  function cancelPost() {
    setImage(null);
    setContent("");
    setimgPreview("");
  }
  return (
    <div className="px-4 pb-4 border-t insta-border mt-2 pt-3">
      <div className="flex items-center space-x-3">
        <img
          className="w-7 h-7 rounded-full object-cover"
          src={post.user.photo}
          alt="Your Avatar"
        />
        <TextInput
          value={content}
          onChange={handleContent}
          className="w-full"
          placeholder="Add a comment...."
        />
        {/* icons */}
        <div className="icons flex text-gray-500 m-2">
          <label htmlFor={`postImage-${post._id}`}>
            <GrAttachment className="text-2xl m-1" />
          </label>
          <input
            type="file"
            id={`postImage-${post._id}`}
            className="hidden"
            onChange={handleImage}
          />
        </div>
        <button
          onClick={handleComment}
          className="text-sm font-semibold bg-blue-500 text-white hover:text-blue-700 hover:bg-white dark:hover:text-blue-400 transition cursor-pointer p-3 rounded-full"
        >
          Add Comment
        </button>
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
    </div>
  );
}
