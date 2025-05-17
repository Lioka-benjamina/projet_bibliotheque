import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../../assets/add.scss"
import { 
    faCameraRetro, 
    faClose, 
    faEnvelope, 
    faMale, 
    faFemale,
    faPhoneAlt, 
    faUser 
} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { setAddModal } from "../redux/slice/modalSlice"
import { FieldValues, useForm } from "react-hook-form"
import { createMembre } from "../redux/asyncThunk/membreThunk"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { setCleanMembre } from "../redux/slice/membreSlice"


interface Membre {
    nom : string
    prenom : string
    numero_mobile : number
    email : string
    genre : string
    image : string
    date_adhesion : Date
}

const AddMembre = () =>{

    const dispatch = useDispatch<AppDispatch>()
    const modalState = useSelector((state:RootState) =>state.modalStore)
    const {addModal} = modalState

    const membreState = useSelector((state:RootState) =>state.membreStore)
    const {addMembre} = membreState

    const {handleSubmit, register, reset, formState: {errors}} = useForm()
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const onSubmit = (data: FieldValues) =>{
        const formData = new FormData()

        formData.append("nom", data.nom)
        formData.append("prenom", data.prenom)
        formData.append("numero_mobile", data.numero)
        formData.append("email", data.email)
        formData.append("genre", data.genre)

        dispatch(createMembre(formData))
    }

    const closeAddModal = () =>{
        dispatch(setAddModal({active: false}))
    }

    // Simulated image upload handling
    const handleImageUpload = () => {
        // This would normally open a file dialog
        // For demo purposes, we'll just show a success message
        toast.info("Fonctionnalité d'upload prête à utiliser")
    }

    useEffect(() => {
        if(addMembre.create_ok){
            toast.success("Ajout d'un nouveau membre réussi")
            closeAddModal()
            reset()
            setCleanMembre()
        }
    },[addMembre.create_ok])

    return (
        <>
            <div className={`modalAdd ${addModal.active ? "active" : ""}`}>
                <div className="overlay" onClick={closeAddModal}></div>
                <div className="modal">
                    <div className="titleAndClose">
                        <h3>Ajouter un nouveau membre</h3>
                        <div className="btn_close">
                            <button className="close" onClick={closeAddModal}>
                                <FontAwesomeIcon icon={faClose}/>
                            </button>
                        </div>
                    </div>
                    <hr />
                    <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-container">
                            <label htmlFor="nom">Nom</label>
                            <input 
                                type="text" 
                                id="nom"
                                className="input" 
                                placeholder="Nom du nouveau membre" 
                                {...register("nom", { required: "Le nom est requis" })}
                            />
                            <i><FontAwesomeIcon icon={faUser} className="fontMembre"/></i>
                            <span className="underline"></span>
                            {errors.nom && <p className="error-message">{errors.nom.message?.toString()}</p>}
                        </div>
                        
                        <div className="input-container">
                            <label htmlFor="prenom">Prénom</label>
                            <input 
                                type="text" 
                                id="prenom"
                                className="input" 
                                placeholder="Prénom du nouveau membre" 
                                {...register("prenom", { required: "Le prénom est requis" })}
                            />
                            <i><FontAwesomeIcon icon={faUser} className="fontMembre"/></i>
                            <span className="underline"></span>
                            {errors.prenom && <p className="error-message">{errors.prenom.message?.toString()}</p>}
                        </div>
                        
                        <div className="input-container">
                            <label htmlFor="numero">Numéro de téléphone</label>
                            <input 
                                type="text" 
                                id="numero"
                                className="input" 
                                placeholder="+261 XX XX XXX XX" 
                                {...register("numero", { 
                                    required: "Le numéro est requis",
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Veuillez entrer uniquement des chiffres"
                                    }
                                })}
                            />
                            <i><FontAwesomeIcon icon={faPhoneAlt} className="fontMembre"/></i>
                            <span className="underline"></span>
                            {errors.numero && <p className="error-message">{errors.numero.message?.toString()}</p>}
                        </div>
                        
                        <div className="input-container">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email"
                                className="input" 
                                placeholder="exemple@email.com" 
                                {...register("email", { 
                                    required: "L'email est requis",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Adresse email invalide"
                                    }
                                })}
                            />
                            <i><FontAwesomeIcon icon={faEnvelope} className="fontMembre"/></i>
                            <span className="underline"></span>
                            {errors.email && <p className="error-message">{errors.email.message?.toString()}</p>}
                        </div>
                        
                        <div className="input-container">
                            <label htmlFor="genre">Genre</label>
                            <select 
                                id="genre"
                                className="input" 
                                {...register("genre", { required: "Le genre est requis" })}
                            >
                                <option value="">Sélectionner un genre</option>
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                                <option value="Autre">Autre</option>
                            </select>
                            <i>
                                <FontAwesomeIcon 
                                    icon={faMale} 
                                    className="fontMembre"
                                />
                            </i>
                            <span className="underline"></span>
                            {errors.genre && <p className="error-message">{errors.genre.message?.toString()}</p>}
                        </div>
                        
                        <div className="image-container">
                            <div className="image">
                                <img src="../../../public/images/profilLuc.jpg" alt="Photo de profil" />
                            </div>
                            <button 
                                type="button" 
                                className="fichier" 
                                onClick={handleImageUpload}
                            >
                                <FontAwesomeIcon icon={faCameraRetro} className="fontCam"/>
                            </button>
                        </div>
                        
                        <button type="submit" className="btn_action">
                            Ajouter le membre
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddMembre