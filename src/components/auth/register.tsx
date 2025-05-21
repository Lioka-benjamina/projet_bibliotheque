import { useDispatch, useSelector } from "react-redux"
import { FieldValues, useForm } from "react-hook-form"
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
// Import des icons de react-icons
import { FaUserAlt, FaEnvelope, FaLock, FaUserTag, FaUserCircle, FaSignInAlt } from "react-icons/fa"

export const Register = () => {
    const dispatch = useDispatch<AppDispatch>()
    const autState = useSelector((state: RootState) => state.autStore)
    const { token } = autState
    const navigate = useNavigate()

    const signIn = useSignIn()

    const schema = yup.object({
        nom: yup.string().required("Le champ nom est requis"),
        prenom: yup.string().required("Le champ prénom est requis"),
        email: yup.string().required("Le champ email est requis").email("Format d'email invalide"),
        role: yup.string().required("Le champ rôle est requis"),
        password: yup.string().required("Le champ mot de passe est requis")
            .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères" }),
        passwordConfirm: yup.string()
            .required("La confirmation du mot de passe est requise")
            .oneOf([yup.ref('password')], "Les mots de passe ne correspondent pas")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
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
        if (token.status) {
            const { value: tkn } = token

            signIn({
                auth: { token: tkn }
            })

            navigate("/accueil")
            toast.success("Vous êtes authentifié")
        }

        return () => {
            dispatch(setCleanAuth())
        }

    }, [token.status, dispatch, navigate, signIn, token])

    return (
        <>
            <section id="pageRegister">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="se_connecter">
                        <h3>S'inscrire</h3>
                    </div>
                    <div id="content-group">
                        <div id="form-group">
                            <div id="contenteInput">
                                <FaUserAlt className="icon" />
                                <input type="text" placeholder="Votre nom" {...register("nom")} />
                            </div>
                            {
                                errors.nom && (
                                    <small className="error">{errors.nom.message}</small>
                                )
                            }
                        </div>
                        <div id="form-group">
                            <div id="contenteInput">
                                <FaUserCircle className="icon" />
                                <input type="text" placeholder="Votre prénom" {...register("prenom")} />
                            </div>
                            {
                                errors.prenom && (
                                    <small className="error">{errors.prenom.message}</small>
                                )
                            }
                        </div>
                        <div id="form-group">
                            <div id="contenteInput">
                                <FaEnvelope className="icon" />
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
                                <FaUserTag className="icon" />
                                <input type="text" placeholder="Rôle" {...register("role")} />
                            </div>
                            {
                                errors.role && (
                                    <small className="error">{errors.role.message}</small>
                                )
                            }
                        </div>
                        <div id="form-group">
                            <div id="contenteInput">
                                <FaLock className="icon" />
                                <input type="password" placeholder="Votre mot de passe" {...register("password")} />
                            </div>
                            {
                                errors.password && (
                                    <small className="error">{errors.password.message}</small>
                                )
                            }
                        </div>
                        <div id="form-group">
                            <div id="contenteInput">
                                <FaLock className="icon" />
                                <input type="password" placeholder="Confirmer votre mot de passe" {...register("passwordConfirm")} />
                            </div>
                            {
                                errors.passwordConfirm && (
                                    <small className="error">{errors.passwordConfirm.message}</small>
                                )
                            }
                        </div>
                    </div>
                    <div id="contentAction">
                        <button id="btnAction">
                            <FaSignInAlt />
                            S'inscrire
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}