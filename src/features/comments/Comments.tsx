import { useQuery } from '@tanstack/react-query'
import { getPostComments } from './apis/comments.api'
import Loading from '../../components/Loading'
import type { Comment } from './interfaces/comment.interface'
import CommentItem from './CommentItem'

export default function Comments({id}:{id:string}) {

    const {data,isError,isLoading,error} = useQuery({
        queryKey:['comment',id],
        queryFn:()=> getPostComments(id),
    })
    // console.log();
    if(isLoading){
        return <Loading/>
    }
    if(isError){
      return <h2>{error.message}</h2>
    }
    
  return (
    <>
      
    <div>
      {data?.data?.comments.map((comment:Comment)=>{
        return <CommentItem comment={comment} key={comment._id}></CommentItem>
      }

    )}
    </div>
    </>
  )
}
