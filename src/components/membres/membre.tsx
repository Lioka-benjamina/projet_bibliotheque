import { useDispatch } from "react-redux"
import "../../assets/membre.scss"
import { Header } from "../header/header"
import AddMembre from "../modal/ajout"
import { Navigation } from "../navigation/navigation"
import { AppDispatch, RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { setAddModal, setDeleteModal } from "../redux/slice/modalSlice"
import { useEffect, useState } from "react"
import { deleteMembre, findAllMembre } from "../redux/asyncThunk/membreThunk"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faPen, faTrash, faSearch, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import Delete from "../modal/delete"
import { setCleanMembre, setSearchMembre } from "../redux/slice/membreSlice"
import { toast } from "react-toastify"
import Pagination from "../pagination/paginationList"

interface Membre {
    id : number
    nom : string
    prenom : string
    numero_mobile : number
    email : string
    genre : string
    image : string
    date_adhesion : Date
}

export const Membre = () =>{

    const dispatch = useDispatch<AppDispatch>() 
    const modalState = useSelector((state : RootState)=>state.modalStore)
    const { deleteModal } = modalState

    const membreState = useSelector((state : RootState)=>state.membreStore)
    const {allMembre , addMembre , removeMembre , loading} = membreState
    
    
    const openModalAdd = () =>{
        dispatch(setAddModal({active : true}))
    }
    
    const handleDelete = (id : number) =>{
        dispatch(setDeleteModal({
            id : id,
            active : true
        }))
    }
    
    useEffect(()=>{
        if(deleteModal.confirm){
            dispatch(deleteMembre(Number(deleteModal.id)))
        }
        
        return()=>{
            dispatch(setCleanMembre())
        }
    },[deleteModal.confirm])

    useEffect(() => {
        if (removeMembre.delete_ok) {
            toast.success("Membre supprimé avec success")
            dispatch(setDeleteModal({ ...deleteModal, active: false , id : null}))
        }
    }, [removeMembre.delete_ok])
    
    
    
    useEffect(()=>{
        if(allMembre.status == "find" || addMembre.create_ok || removeMembre.delete_ok){
            dispatch(findAllMembre())
        }
    },[
        allMembre.status,
        addMembre.create_ok,
        removeMembre.delete_ok
    ])
    
    //FILTRE et pagination
    const dataParPage = 8
    const [dataPage , setDataPage ] = useState<Membre[]>([])
    const [status , setStatus] = useState(false)



    const filterData = allMembre.search ? allMembre.dataFilter : allMembre.data
    const listeMembre = status ? dataPage : filterData.slice(0 , dataParPage)
    
    const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) =>{
        const value = e.target.value
        dispatch(setSearchMembre(value))
    }

    return(
        <>
            <Delete/>
            <AddMembre/>
            <div className="membre">
                <Header/>
                <div className="corpsMembre">
                    <Navigation/>
                    <div className="principaleMembre">
                        <div className="titleAndAjout">
                            <h3>Liste des adhérants</h3>
                            <div className="search-container">
                                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                                <input 
                                    type="text" 
                                    placeholder="Rechercher un membre..." 
                                    onChange={handleSearch} 
                                    className="recherche"
                                />
                            </div>
                            <button className="ajout" onClick={openModalAdd}>
                                Ajouter
                            </button>
                        </div>
                        <hr />
                        <div className="listePersonne">
                            {
                                listeMembre.length ? (
                                    listeMembre.map(liste =>
                                        <div className="personne" key={liste.id}>
                                            <div className="imageAndNom">
                                                <div className="img">
                                                    <img src="../../../public/images/profilLuc.jpg" alt="" />
                                                </div>
                                                <div className="name">
                                                    <h4>{liste.nom}</h4>
                                                    <h4>{liste.prenom}</h4>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="info">
                                                <p>E-mail : <span>{liste.email}</span></p>
                                            </div>
                                            <div className="info">
                                                <p>numéro mobile : <span>+261 {liste.numero_mobile}</span></p>
                                            </div>
                                            <div className="info">
                                                <p>Sexe : <span>{liste.genre}</span></p>
                                            </div>
                                            <div className="action">
                                                <button className="btn_action" title="Voir les détails">
                                                    <FontAwesomeIcon icon={faEye} className="font_action"/>
                                                </button>
                                                <button className="btn_action" title="Modifier">
                                                    <FontAwesomeIcon icon={faPen} className="font_action"/>
                                                </button>
                                                <button className="btn_action" onClick={()=>handleDelete(liste.id)} title="Supprimer">
                                                    <FontAwesomeIcon icon={faTrash} className="font_action"/>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                ) : 
                                <div className="aucunMembre">
                                    <p>{loading ? "Chargement en cours..." : "Aucun membre trouvé"}</p>
                                </div>
                            }
                        </div>
                        <Pagination<Membre> 
                            dataParPage={dataParPage} 
                            data={filterData} 
                            dataActuel={setDataPage} 
                            setStatus={setStatus}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}