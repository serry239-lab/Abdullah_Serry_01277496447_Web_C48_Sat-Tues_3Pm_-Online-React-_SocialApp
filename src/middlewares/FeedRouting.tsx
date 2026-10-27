import React from 'react'
import { Navigate } from 'react-router-dom';

export default function FeedRouting({children}:{children:React.ReactNode}) {
const tkn = localStorage.getItem('tkn');
if(tkn){
    return <Navigate to={'/feed'}></Navigate>
}
return children;
}
