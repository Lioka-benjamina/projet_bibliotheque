import { Route, Routes } from "react-router-dom"
import { Accueil } from "../biblioPrincipale/accueil"
import { Emprunt } from "../emprunt/emprunt"
import { GestionLivre } from "../gestionLivre/livre"
import { PrivateRoute } from "../routes/privateRoute"
import { Register } from "../auth/register"
import { Login } from "../auth/login"
import { Membre } from "../membres/membre"

export const Router = () => {
    return(
        <>
            <Routes>
                <Route element={<PrivateRoute/>}>
                    <Route path="/" element={< Accueil/>}></Route>
                    <Route path="/accueil" element={< Accueil/>}></Route>
                    <Route path="/emprunt" element={< Emprunt/>}></Route>
                    <Route path="/livre" element={<GestionLivre/>}></Route>
                    <Route path="/membres" element={<Membre/>}></Route>
                </Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
            </Routes>
        </>
    )
}