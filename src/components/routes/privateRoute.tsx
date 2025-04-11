import { Navigate, Outlet, useLocation } from "react-router-dom"

export const PrivateRoute = () => {
    const token = localStorage.getItem("auth")
    const location = useLocation()

    if(!token){
        return <Navigate to={"/login"}/>
        // return console.log("tsy tafiditra oh");
    }

    return <Outlet/>
}