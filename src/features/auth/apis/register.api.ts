import axios from 'axios';
import type { registerSchema } from '../Schema/register.schema';



export async function signUp(payload:registerSchema) {
    const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`,payload);
    return data;
}