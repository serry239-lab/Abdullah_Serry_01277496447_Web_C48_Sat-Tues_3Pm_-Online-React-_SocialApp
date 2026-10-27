import axios from 'axios';
import type { loginSchema } from '../Schema/login.schema';



export async function signIn(payload:loginSchema) {
    const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin`,payload);
    return data;
}