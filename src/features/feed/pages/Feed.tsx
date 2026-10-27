import { getPosts } from '../apis/posts.api';
import Loading from '../../../components/Loading';
import PostItem from '../components/PostItem';
import type { Post } from './../interfaces/post.interface';
import { useQuery } from '@tanstack/react-query';
import CreatePost from '../../posts/CreatePost';
import { Helmet } from 'react-helmet';

export default function Feed() {
  // const [postsArr,setPostsArr] = useState<Post[]|null>(null);
  // const [isLoading,setisLoading] = useState(false);

        const {isLoading,data,isError,error} = useQuery(
        { 
          refetchOnMount:false,
          refetchOnWindowFocus:false,
          refetchOnReconnect:false,
          staleTime:1000 * 60 * 2,
          queryKey: ['posts'], 
          queryFn: getPosts,
        }
      )

    if(isLoading){
      return <Loading/>
    }

   if(isError){
    return <h2>{error.message}</h2>
   }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Feed</title>
        <link rel="canonical" content="" />
      </Helmet>
        <div className='container'>
          <CreatePost/>
        <div className='flex'>
          <div className="w-1/4"></div>
          <div className="w-2/4">
          {
            data?.data?.posts.map((post:Post)=><PostItem post={post} key={post._id}/>)
        }
          </div>
          <div className="w-1/4"></div>
        </div>
    </div>
    </>
  )
}
