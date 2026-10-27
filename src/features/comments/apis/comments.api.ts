import axios from "axios";

export async function getPostComments(postId:String) {
    const userToken = localStorage.getItem('tkn');
    const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${postId}/comments?page=1&limit=10`,
        {
            headers:{
                "Authorization":`Bearer ${userToken} `
            }
        }
    );
    return data;
}