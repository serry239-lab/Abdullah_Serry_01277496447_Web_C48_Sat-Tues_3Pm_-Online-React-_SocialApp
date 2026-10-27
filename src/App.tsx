import {  createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./features/auth/pages/Home";
import { ToastContainer } from "react-toastify";
import Feed from "./features/feed/pages/Feed";
import AuthContextProvider from "./context/auth.context";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import SinglePost from "./features/post-details/SinglePost";
import FeedRouting from "./middlewares/FeedRouting";
import { lazy, Suspense } from 'react';
import Loading from "./components/Loading";


const Notifications = lazy(() => import('./features/notifications/Notifications'));
const Settings = lazy(() => import('./features/settings/Settings'));
const Profile = lazy(() => import('./features/profile/Profile'));


export default function App() {
  const routes = createHashRouter([
    {
      path: "/",
      element: (
        <FeedRouting>
          <Home />
        </FeedRouting>
      ),
    },
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/feed",
          element: (
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading/>} ><Profile /></Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/notifications",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading/>} ><Notifications /></Suspense>
            </ProtectedRoute>
          ),
        },
         {
          path: "/settings",
          element: (
            <ProtectedRoute>
              <Suspense fallback={<Loading/>} ><Settings /></Suspense>
            </ProtectedRoute>
          ),
        },
        {
          path: "/postdetails/:id",
          element: (
            <ProtectedRoute>
              <SinglePost />
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <h2>Not Found</h2> },
      ],
    },
  ]);

  const client = new QueryClient({});

  return (
    <div>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthContextProvider>
          <ToastContainer></ToastContainer>
          <RouterProvider router={routes}></RouterProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </div>
  );
}
