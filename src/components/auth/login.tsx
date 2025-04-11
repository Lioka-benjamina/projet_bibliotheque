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

export const Login = () =>{
    const dispatch = useDispatch<AppDispatch>()
    const authState =  useSelector((state : RootState)=>state.autStore)
    const { token } = authState

    const signIn = useSignIn()
    const navigate = useNavigate()

    const schema = yup.object({
        email : yup.string().required("Remplir le champ email"),
        password : yup.string().required("Remplir le champ mot de pass").min( 6 , {message : "6 caractères au moins"})
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
            toast.success("tafiditra ingahy oooohhhhh")
        }

        return () => {
            dispatch(setCleanAuth())
        }

    },[token.status])
    return(
        <>
        <section id="pageLogin">
            <div className="bienvenue">
                <h1>BIENVENUE DANS MSE Controls </h1>
                <h2>Ici , on gère . on s'amuse</h2>
                <p>Notre bibliothèque préférer</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="se_connecter">
                    <h3>Se connecter</h3>
                </div>
                <div id="content-group">
                    <div id="form-group">
                        {/* <label htmlFor="">Email</label> */}
                        <div id="contenteInput">
                            <input type="email" placeholder="Adresse email" {...register("email")}  autoComplete="off"/>
                        </div>
                        {
                            errors.email && (
                                // <div></div>
                                <small className="error" style={{color : "red",fontFamily:"calibri",fontSize : ".8vw"}}>{errors.email.message}</small>
                            )
                        }
                    </div>
                    <div id="form-group">
                        {/* <label htmlFor="">Mot de passe</label> */}
                        <div id="contenteInput">
                            <input type="password" placeholder="votre mot de passe" {...register("password")} autoComplete="off"/>
                        </div>
                        {
                            errors.password && (
                                <div></div>
                                // <small className="error" style={{color : "red",fontFamily:"calibri",fontSize : ".8vw"}}>{errors.password.message}</small>
                            )
                        }
                    </div>
                </div>
                <p>{authState.message}</p>
                <div id="contentAction">
                    <button id="btnAction">{authState.loading    ? "Connexion en cours" : "Se connecter"}</button>
                </div>
                <div id="lienVersRegister">
                    <p>Vous n'avez pas un compte ? <span><Link to={"/register"} className="lien">S'inscrire</Link></span></p>
                </div>
            </form>
        </section>
    </>
    )
}