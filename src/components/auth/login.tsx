import "../../assets/login.scss"
import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { FieldValues, useForm } from "react-hook-form"
import { ApiLogin } from "../redux/asyncThunk/authThunk"
import { useEffect } from "react"
import useSignIn from "react-auth-kit/hooks/useSignIn"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { clearMsg, setCleanAuth } from "../redux/slice/authSlice"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
// Import des icônes
import { FaEnvelope, FaLock, FaSignInAlt, FaUser } from 'react-icons/fa'

export const Login = () =>{
    const dispatch = useDispatch<AppDispatch>()
    const authState =  useSelector((state : RootState)=>state.autStore)
    const { token } = authState

    const signIn = useSignIn()
    const navigate = useNavigate()

    const schema = yup.object({
        email : yup.string().required("Veuillez saisir votre adresse email"),
        password : yup.string().required("Veuillez saisir votre mot de passe").min( 6 , {message : "6 caractères au moins"})
    })

    const {handleSubmit , register , formState: {errors} } = useForm({
        resolver : yupResolver(schema)
    })

    const onSubmit = (data : FieldValues) =>{
        dispatch(clearMsg(""))
        const formData = new FormData()
        formData.append("email", data.email)
        formData.append("password", data.password)

        dispatch(ApiLogin(formData))
    }

    useEffect(()=>{
        if (token.status) {
            const {value : tkn} = token

            signIn({
                auth : {token : tkn}
            })
            navigate("/accueil")
            toast.success("Bienvenue dans votre tableau de bord !")
        }

        return () => {
            dispatch(setCleanAuth())
        }

    },[token.status])
    return(
        <>
        <section id="pageLogin">
            <div className="bienvenue">
                <h1>BIENVENUE DANS MSE CONTROLS</h1>
                <h2>La plateforme qui simplifie votre gestion</h2>
                <p>Notre solution intuitive pour une expérience utilisateur optimale</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="se_connecter">
                    <FaSignInAlt className="header-icon" />
                    <h3>Se connecter</h3>
                </div>
                <div id="content-group">
                    <div id="form-group">
                        <div id="contenteInput" className="input-with-icon">
                            <FaEnvelope className="input-icon" />
                            <input 
                                type="email" 
                                placeholder="Votre adresse email" 
                                {...register("email")}  
                                autoComplete="off"
                            />
                        </div>
                        {
                            errors.email && (
                                <small className="error">{errors.email.message}</small>
                            )
                        }
                    </div>
                    <div id="form-group">
                        <div id="contenteInput" className="input-with-icon">
                            <FaLock className="input-icon" />
                            <input 
                                type="password" 
                                placeholder="Votre mot de passe" 
                                {...register("password")} 
                                autoComplete="off"
                            />
                        </div>
                        {
                            errors.password && (
                                <small className="error">{errors.password.message}</small>
                            )
                        }
                    </div>
                </div>
                {authState.message && <p className="error-message">{authState.message}</p>}
                <div id="contentAction">
                    <button id="btnAction">
                        {authState.loading ? "Connexion en cours..." : "Se connecter"}
                    </button>
                </div>
                <div id="lienVersRegister">
                    <p>
                        Vous n'avez pas de compte ? 
                        <span>
                            <Link to={"/register"} className="lien">
                                <FaUser className="register-icon" /> S'inscrire
                            </Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    </>
    )
}