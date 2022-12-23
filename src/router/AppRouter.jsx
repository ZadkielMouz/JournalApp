import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom"
import { LoginPage, RegisterPage } from "../auth/pages"
import { JournalPage } from "../journal/pages/JournalPage"


export const AppRouter = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            children: [
                {
                    path: "/",
                    element: <JournalPage />
                },
                {
                    path: "*",
                    element: <Navigate to={"/"} />
                }
            ]
        },
        {
            path: "auth",
            children: [
                {
                    path: "/auth/",
                    element: <Navigate to={"login"} />
                },
                {
                    path: "login",
                    element: <LoginPage />
                },
                {
                    path: "register",
                    element: <RegisterPage />
                },
                {
                    path: "*",
                    element: <Navigate to={"login"} />
                }
            ]
        },
        
    ])

    

    return (
        <RouterProvider router={router} />
    )
}
