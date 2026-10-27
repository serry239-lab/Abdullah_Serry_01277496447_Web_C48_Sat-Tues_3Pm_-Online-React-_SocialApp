import axios from "axios";

export async function getSinglePost(postId:String) {
    const userToken = localStorage.getItem('tkn');
    const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
        {
            headers:{
                "Authorization":`Bearer ${userToken} `
            }
        }
    );
    return data;
}