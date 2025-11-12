import { createBrowserRouter } from "react-router";
import Root from "../Component/Root/Root";
import Home from "../Component/Home/Home";
import Login from "../Component/Login/Login";

export const router = createBrowserRouter([{
    path: '/',
    Component: Root,
    children: [{
        index: true, path: '/', Component: Home
    },
    { path: '/login', Component: Login }
    ],
},])