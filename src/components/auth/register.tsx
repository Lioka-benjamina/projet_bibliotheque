import { useDispatch, useSelector } from "react-redux"
import {FieldValues, useForm} from "react-hook-form"
import { AppDispatch, RootState } from "../redux/store"
import { ApiRegister } from "../redux/asyncThunk/authThunk"
import useSignIn from "react-auth-kit/hooks/useSignIn"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../../assets/register.scss"
import { toast } from "react-toastify"
import { setCleanAuth } from "../redux/slice/authSlice"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

export const Register = () =>{
    const dispatch = useDispatch<AppDispatch>()
    const autState = useSelector((state : RootState)=>state.autStore)
    const {token} = autState
    const navigate = useNavigate()

    const signIn = useSignIn()

    const schema = yup.object({
        nom: yup.string().required("le champs nom est requis"),
        prenom: yup.string().required("le champs prenom est requis"),
        email: yup.string().required("le champs email est requis"),
        role: yup.string().required("le champs role est requis"),
        password: yup.string().required("le champs mot de passe est requis")
        .min(6, {message: "Le mot de passe doit etre contenir 6 caractères"}),
        passwordConfirm: yup.string().required("la confirmation mot de passe est requis")
    })

    const {register , handleSubmit , formState : {errors} } = useForm({
        resolver : yupResolver(schema)
    })

    const onSubmit = (data: FieldValues) => {
        const formData = new FormData()

        formData.append("nom", data.nom)
        formData.append("prenom", data.prenom)
        formData.append("email", data.email)
        formData.append("role", data.role)
        formData.append("password", data.password)
        formData.append("passwordConfirm", data.passwordConfirm)

        dispatch(ApiRegister(formData))
    }

    useEffect(() => {
        if(token.status){
            const {value: tkn} = token

            signIn({
                auth: {token: tkn}
            })

            navigate("/accueil")
            toast.success("Vous êtes authentifié")
        }
        
        return () => {
            dispatch(setCleanAuth())
        }
        
    }, [token.status])
    
    return(
        <>
        <section id="pageRegister">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="se_connecter">
                    <h3>S'inscrire'</h3>
                </div>
                <div id="content-group">
                    <div id="form-group">
                        <div id="contenteInput">
                            <input type="text" placeholder="votre nom" {...register("nom")} />
                        </div>
                        {
                            errors.nom && (
                                <small className="error">{errors.nom.message}</small>
                            )
                        }
                    </div>
                    <div id="form-group">
                        <div id="contenteInput">
                            <input type="text" placeholder="votre prenom" {...register("prenom")} />
                        </div>
                        {
                            errors.prenom && (
                                <small className="error">{errors.prenom.message}</small>
                            )
                        }
                    </div>
                    <div id="form-group">
                        <div id="contenteInput">
                            <input type="email" placeholder="Adresse email" {...register("email")} />
                        </div>
                        {
                            errors.email && (
                                <small className="error">{errors.email.message}</small>
                            )
                        }
                    </div>
                    <div id="form-group">
                        <div id="contenteInput">
                            <input type="text" placeholder="role" {...register("role")} />
                        </div>
                        {
                            errors.role && (
                                <small className="error">{errors.role.message}</small>
                            )
                        }
                    </div>
                    <div id="form-group">
                        <div id="contenteInput">
                            <input type="password" placeholder="votre mot de passe" {...register("password")} />
                        </div>
                        {
                            errors.password && (
                                <small className="error">{errors.password.message}</small>
                            )
                        }
                    </div>
                    <div id="form-group">
                        <div id="contenteInput">
                            <input type="password" placeholder="confirmer votre mot de passe" {...register("passwordConfirm")} />
                        </div>
                        {
                            errors.passwordConfirm && (
                                <small className="error">{errors.passwordConfirm.message}</small>
                            )
                        }
                    </div>
                </div>
                <div id="contentAction">
                    <button id="btnAction">S'inscrire</button>
                </div>
            </form>
        </section>
    </>
    )
}