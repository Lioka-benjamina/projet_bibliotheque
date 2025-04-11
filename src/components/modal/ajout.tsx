import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../../assets/add.scss"
import { faCameraRetro, faClose, faEnvelope, faMale, faPhoneAlt, faUser } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { setAddModal } from "../redux/slice/modalSlice"
import { FieldValues, useForm } from "react-hook-form"
import { createMembre } from "../redux/asyncThunk/membreThunk"
import { useEffect } from "react"
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

    const {handleSubmit,register,reset , formState : {errors}} = useForm()

    const onSubmit = (data: FieldValues) =>{
        const formData = new FormData

        formData.append("nom" , data.nom)
        formData.append("prenom" , data.prenom)
        formData.append("numero_mobile" , data.numero)
        formData.append("email" , data.email)
        formData.append("genre" , data.genre)

        dispatch(createMembre(formData))
    }

    const closeAddModal = () =>{
        dispatch(setAddModal({active : false}))
    }

    useEffect(()=>{
        if(addMembre.create_ok){
            toast("ajout d'un nouveau membre reussi")
            closeAddModal()
            reset()
            setCleanMembre()
        }
    },[addMembre.create_ok])

    useEffect(()=>{
        if(addMembre.create_ok){
        }
    },[addMembre.create_ok])

    return (
        <>
            <div className={`modalAdd ${addModal.active ? "active" : ""}`}>
                <div className="overlay"></div>
                <div className="modal">
                    <div className="titleAndClose">
                        <h3>Ajouter un nouveau membre</h3>
                        <div className="btn_close">
                            <button className="close" onClick={closeAddModal}><FontAwesomeIcon icon={faClose}/></button>
                        </div>
                    </div>
                    <hr />
                    <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-container">
                            <label htmlFor="">Nom</label>
                            <input type="text" className="input" placeholder="Nom du nouveau membre" {...register("nom")}/>
                            <i><FontAwesomeIcon icon={faUser} className="fontMembre"/></i>
                            <span className="underline"></span>
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Prenom</label>
                            <input type="text" className="input" placeholder="Prénom du nouveau membre" {...register("prenom")}/>
                            <i><FontAwesomeIcon icon={faUser} className="fontMembre"/></i>
                            <span className="underline"></span>
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Numero</label>
                            <input type="text" className="input" placeholder="Numero mobile" {...register("numero")}/>
                            <i><FontAwesomeIcon icon={faPhoneAlt} className="fontMembre"/></i>
                            <span className="underline"></span>
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Email</label>
                            <input type="email" className="input" placeholder="Adresse mail" {...register("email")}/>
                            <i><FontAwesomeIcon icon={faEnvelope} className="fontMembre"/></i>
                            <span className="underline"></span>
                        </div>
                        <div className="input-container">
                            <label htmlFor="">Genre</label>
                            <input type="text" className="input" placeholder="genre du nouveau membre" {...register("genre")}/>
                            <i><FontAwesomeIcon icon={faMale} className="fontMembre"/></i>
                            <span className="underline"></span>
                        </div>
                        <div className="image-container">
                            <div className="image">
                                <img src="../../../public/images/profilLuc.jpg" alt="" />
                            </div>
                            <button className="fichier"><FontAwesomeIcon icon={faCameraRetro} className="fontCam"/></button>
                        </div>
                        <button className="btn_action">Ajouter</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddMembre