import  {  useContext } from "react";
import type { Post } from "./../interfaces/post.interface";
import AddComment from "../../comments/AddComment";
import { Link } from "react-router-dom";
import DropDown from "../../../components/DropDown";
import { formatTimeAgo } from "../../../utils/timeAgo";
import { authContext } from "../../../context/auth.context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost } from "../../posts/apis/like-unlike.api";
import { CiHeart } from "react-icons/ci";

export default function PostItem({ post }: { post: Post }) {
  const context = useContext(authContext);
  if (!context) throw new Error();
  const { user } = context;

  const query = useQueryClient();

  const { mutate, data, isPending } = useMutation({
    mutationFn: likePost,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ["posts"] });
    },
  });


  

  return (
    <div className="bg-white dark:bg-black my-7 rounded-lg shadow-md border  w-full insta-border">
      {/* Post Header */}
      <div className="flex items-center justify-between p-3 border-b insta-border">
        <div className="flex items-center space-x-3">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={post.user.photo}
            alt="User Avatar"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {post.user.name}
            </span>
            <span className="text-xs">{formatTimeAgo(post.createdAt)}</span>
          </div>
        </div>
        {post.user._id === user?._id && <DropDown postId={post._id} />}
      </div>
      {/* Post Image */}
      {post.image && (
        <div>
          <img
            className="w-full object-cover"
            src={post.image}
            alt="Post Content"
          />
        </div>
      )}
      {/* Post Actions */}
      <div className="flex justify-between items-center p-4">
        <div className="flex space-x-4">
          <button disabled={isPending} onClick={()=>mutate(post._id)}
            aria-label="Like post"
            className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 mx-1"
          >
            <CiHeart className="text-2xl " color={data?.data?.liked?'red':'gray'} />
          </button>
          <span>{post.likesCount}</span>
          <button
            aria-label="Comment on post"
            className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 mx-1"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M8.2881437,19.1950792 C8.38869181,19.1783212 8.49195996,19.1926955 8.58410926,19.2362761 C9.64260561,19.7368747 10.8021412,20 12,20 C16.418278,20 20,16.418278 20,12 C20,7.581722 16.418278,4 12,4 C7.581722,4 4,7.581722 4,12 C4,13.7069096 4.53528582,15.3318588 5.51454846,16.6849571 C5.62010923,16.830816 5.63909672,17.022166 5.5642591,17.1859256 L4.34581002,19.8521348 L8.2881437,19.1950792 Z M3.58219949,20.993197 C3.18698783,21.0590656 2.87870208,20.6565881 3.04523765,20.2921751 L4.53592782,17.0302482 C3.54143337,15.5576047 3,13.818993 3,12 C3,7.02943725 7.02943725,3 12,3 C16.9705627,3 21,7.02943725 21,12 C21,16.9705627 16.9705627,21 12,21 C10.707529,21 9.4528641,20.727055 8.30053434,20.2068078 L3.58219949,20.993197 Z"
              />
            </svg>
          </button>
          <span>{post.commentsCount}</span>
          <button
            aria-label="Share post"
            className=" flex gap-0.5 text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400"
          >
            {post.sharesCount}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                d="M20 13V17.5C20 20.5577 16 20.5 12 20.5C8 20.5 4 20.5577 4 17.5V13M12 3L12 15M12 3L16 7M12 3L8 7"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <button
          aria-label="Save post"
          className="text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>
      {/* Likes Count */}
      <div className="px-4 pb-2">
        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          {post.likes}
        </p>
      </div>
      {/* Caption */}
      <div className="px-4 pb-2">
        <p className="text-sm text-gray-900 dark:text-gray-100">{post.body}</p>
      </div>
      {/* View Comments */}
      <div className="px-4 pb-2">
        <Link
          to={`/postdetails/${post._id}`}
          className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
        >
          {`View all ${post.commentsCount} comments`}
        </Link>
      </div>
      {/* Add Comment */}
      <AddComment post={post} />
    </div>
  );
}
