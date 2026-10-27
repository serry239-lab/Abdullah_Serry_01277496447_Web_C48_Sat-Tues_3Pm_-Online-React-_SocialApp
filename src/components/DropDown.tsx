import { useMutation, useQueryClient } from "@tanstack/react-query";
import  { useState } from "react";
import { MdDelete, MdUpdate } from "react-icons/md";
import { deletePost } from "../features/posts/apis/delete-post.api";

export default function DropDown({postId}:{postId:string}) {
  const [isOpen, setOpen] = useState(false);

  function toggle() {
    setOpen(!isOpen);
  }

  const query = useQueryClient();

  const {mutate,  isPending} =useMutation({
    mutationFn:deletePost,
    onSuccess:()=>{
      query.invalidateQueries({queryKey:['posts']})
    }
  })

  function handleDeletePost(){
    mutate(postId)
  }

  

  return (
    <div className=" flex items-center justify-center">
      <div className="relative inline-block text-left">
        <button
          onClick={toggle}
          aria-label="More options"
          className="text-gray-900 dark:text-gray-100"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
        {isOpen && (
          <div
            id="dropdown-menu"
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div
              className="py-2 p-2"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="dropdown-button"
            >
              <a onClick={handleDeletePost}
                role="menuitem"
              > {isPending? <>Deleting...</> : <div className="flex gap-3  items-center rounded-md px-4 py-2 text-md text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"><MdDelete className="text-red-600" /><span>Delete</span></div>}
                
              </a>
              <a
                className="flex gap-3  items-center rounded-md px-4 py-2 text-md text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer"
                role="menuitem"
              >
                <MdUpdate className="text-blue-400" />
                <span>Update</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
