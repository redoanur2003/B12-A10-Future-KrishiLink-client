import { createBrowserRouter } from "react-router";
import Root from "../Component/Root/Root";
import Home from "../Component/Home/Home";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";
import AddCrop from "../Page/AddCrop/AddCrop";
import Profile from "../Page/Profile/Profile";
import MyPost from "../Page/MyPost/MyPost";
import Crop from "../Page/Crops/Crop";
import MyInterest from "../Page/MyInterest/MyInterest";
import PrivateRoute from "../FIrebase/PrivateRouter/PrivateRouter";
import LoadingSpinner from "../FIrebase/LoadingSpinner/LoadingSpinner";
import SingleCrop from "../Page/Crops/SingleCrop";
import UpdateProfile from "../Page/Profile/UpdateProfile";
import ErrorPage from "../Page/Error/ErrorPage";
import ErrorCrop from "../Page/Error/ErrorCrop";
import ForgetPassword from "../Component/Login/ForgetPassword";

export const router = createBrowserRouter([{
    path: '/',
    Component: Root,
    hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            index: true, path: '/', Component: Home,
            loader: () => fetch('http://localhost:1212/latest')
        },
        { path: '/login', Component: Login },
        { path: '/register', Component: Register },
        { path: '/addCrop', element: <PrivateRoute><AddCrop></AddCrop></PrivateRoute> },
        { path: '/profile', element: <PrivateRoute><Profile></Profile></PrivateRoute> },
        { path: '/update', element: <PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute> },
        { path: '/myPost', element: <PrivateRoute><MyPost></MyPost></PrivateRoute> },
        {
            path: '/crop', Component: Crop,
            loader: () => fetch("http://localhost:1212/crop")
        },
        {
            path: '/crop/:id', element: <PrivateRoute><SingleCrop></SingleCrop></PrivateRoute>,
            loader: ({ params }) => fetch(`http://localhost:1212/crop/${params.id}`),
            errorElement: <ErrorCrop></ErrorCrop>
        },
        {
            path: '/myInterests', element: <PrivateRoute><MyInterest></MyInterest></PrivateRoute>,
            loader: () => fetch("http://localhost:1212/crop")
        },
        { path: '/forget', element: <ForgetPassword></ForgetPassword> },
    ],
},])