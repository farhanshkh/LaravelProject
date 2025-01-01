import { createBrowserRouter } from "react-router-dom";
import Login from "./view/login.jsx";
import Register from "./view/register.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Users from "./view/users.jsx";
import UserForm from "./view/Userfrom.jsx";
import Twofactorlogin from "./view/twofactorlogin.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/users/new",
                element: <UserForm key="userCreate" />,
            },
            {
                path: "/users/:id",
                element: <UserForm key="userUpdate" />,
            },
        ],
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                path: "/twofactor",
                element: <Twofactorlogin />,
            },
        ],
    },
]);

export default router;
