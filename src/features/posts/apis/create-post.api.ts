import axios from "axios";

export async function addPost(formData:FormData) {
    const userToken = localStorage.getItem('tkn');
    const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`,formData,
        {
            headers:{
                "Authorization":`Bearer ${userToken} `
            }
        }
    );
    return data;
}