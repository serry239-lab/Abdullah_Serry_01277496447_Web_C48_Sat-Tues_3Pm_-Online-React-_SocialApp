import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom'
import { getSinglePost } from './apis/singlePost.api';
import PostItem from '../feed/components/PostItem';
import Loading from '../../components/Loading';
import Comments from '../comments/Comments';

export default function SinglePost() {

  const{id} = useParams();
  const {data,isError,isLoading,error} = useQuery({
    queryKey:['post',id],
    queryFn:()=>getSinglePost(id!),
    
    refetchOnMount:false
  });

  if(isLoading){
    return <Loading/>
  }
  if(isError){
    return <h2>{error.message}</h2>
  }

  console.log(data?.data?.post);
  

  return (
    <div className='w-1/2 mx-auto'>
      <PostItem post={data?.data?.post}/>
      <Comments id={id!} />
    </div>
    
  )
}
