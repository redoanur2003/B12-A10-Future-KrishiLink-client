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

export const router = createBrowserRouter([{
    path: '/',
    Component: Root,
    children: [
        { index: true, path: '/', Component: Home },
        { path: '/login', Component: Login },
        { path: '/register', Component: Register },
        { path: '/addCrop', element: <PrivateRoute><AddCrop></AddCrop></PrivateRoute> },
        { path: '/profile', element: <PrivateRoute><Profile></Profile></PrivateRoute> },
        { path: '/myPost', element: <PrivateRoute><MyPost></MyPost></PrivateRoute> },
        { path: '/crop', Component: Crop },
        { path: '/myInterests', element: <PrivateRoute><MyInterest></MyInterest></PrivateRoute> },
    ],
},])