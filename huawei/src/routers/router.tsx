import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Protect from "../authentic/Protect";
import Register from "../pages/Register";
import Settings from "../pages/Settings";

export default createBrowserRouter([
    {
        path:'/',
        element:<Protect><Home /></Protect>
    },
    {
        path: '/settings',
        element:<Protect><Settings /></Protect>
    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path:'/register',
        element:<Register />
    }
])