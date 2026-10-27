import axios from "axios";

export async function getNotifications() {
    const userToken = localStorage.getItem('tkn');
    const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/notifications?unread=false&page=1&limit=10`,
        {
            headers:{
                "Authorization":`Bearer ${userToken} `
            }
        }
    );
    return data;
}

export async function getNotificationsCount() {
    const userToken = localStorage.getItem('tkn');
    const {data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/notifications/unread-count`,
        {
            headers:{
                "Authorization":`Bearer ${userToken} `
            }
        }
    );
    return data;
}

export async function readAllNotifications() {
    const userToken = localStorage.getItem('tkn');
    const {data} = await axios.patch(`${import.meta.env.VITE_BASE_URL}/notifications/read-all`,null,
        {
            headers:{
                "Authorization":`Bearer ${userToken} `
            }
        }
    );
    return data;
}