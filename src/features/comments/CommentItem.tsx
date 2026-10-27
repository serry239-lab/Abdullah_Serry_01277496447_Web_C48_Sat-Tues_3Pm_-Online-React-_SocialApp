import type { Comment } from "./interfaces/comment.interface";
import { formatTimeAgo } from "../../utils/timeAgo";

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex mt-4">
      <div className="w-14 h-14 rounded-full bg-purple-400/50 shrink-0 flex items-center justify-center">
        <img
          className="h-12 w-12 rounded-full object-cover"
          src={comment.commentCreator.photo}
          alt={comment.commentCreator.name}
        />
      </div>
      <div className="ml-3">
        <div className="font-medium text-purple-800">{comment.commentCreator.username}</div>
        <div className="text-gray-600">{`Posted on ${formatTimeAgo(comment.createdAt)}`}</div>
        <div className="mt-2 text-purple-800">
          {comment.content}
        </div>
      </div>
    </div>
  );
}
