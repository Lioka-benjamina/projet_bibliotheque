import { Link } from "react-router-dom"
import "../../assets/livre.scss"
import { Header } from "../header/header"
import { Navigation } from "../navigation/navigation"
import { useEffect, useState } from "react"
import Select  from "react-select"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye, faPen, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { FieldValues, useForm } from "react-hook-form"
import { AppDispatch, RootState } from "../redux/store"
import { createLivre, deleteLivre, findAllLivre } from "../redux/asyncThunk/livreThunk"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import LivreDelete from "./deleteLivre"
import { setDeleteLivre} from "../redux/slice/modalSlice"
import { setCleanLivre, setCleanSearchLivre, setFilterByCategorie, setSearchLivre } from "../redux/slice/livreSlice"
import Pagination from "../pagination/paginationList"

interface Livre {
    id : number
    titre : string
    auteur : string
    categorie : string
    editeur : string
}

export const GestionLivre = () =>{
    const livreCategorie = [
        {value : "Edification" , label : "Edification"},
        {value : "Doctrine" , label : "Doctrine"},
        {value : "Introduction" , label : "Introducion de la bible"},
        {value : "Psychologie" , label : "Psychologie"},
        {value : "Roman" , label : "Roman"},
        {value : "Histoire" , label : "Histoire"},
        {value : "commentaire" , label : "commentaire"}
    ];
    // const [selectCategorie , setSelectCategorie] : any = useState(null)

    const [isInputVisible , SetIsInputVisible] = useState(false)
    const [searchInput, setSearchInput] = useState("")


    const clickSearch = () =>{
        SetIsInputVisible(!isInputVisible)
    }

    const dispatch = useDispatch<AppDispatch>()
    const livreState = useSelector((state : RootState) => state.livreStore)
    const {addLivre , allLivre , removeLivre} = livreState

    const modalState = useSelector((state : RootState) => state.modalStore)
    const {deleteLivreModal} = modalState

    
    
    // AJOUT
    const {handleSubmit , register ,setValue, getValues, reset , formState : {errors}} = useForm()
    const onSubmit = (data : FieldValues) =>{
        const formData = new FormData()
        
        formData.append("titre" , data.titre)
        formData.append("auteur" , data.auteur)
        formData.append("categorie" , data.categorie)
        formData.append("editeur" , data.editeur)
        
        dispatch(createLivre(formData))
        
    }
    
    useEffect(()=>{
        if(addLivre.create_ok){
            toast.success("Ajout d'un livre succès")
            reset()
        }
    },[addLivre.create_ok])


    
    // OPEN MODAL

    const openDeleteLivre = (id : number) =>{
        dispatch(setDeleteLivre({
            id : id,
            active : true
        }))
    }


    useEffect(()=>{
        if(deleteLivreModal.confirm){
            dispatch(deleteLivre(Number(deleteLivreModal.id)))
        }

        return()=>{
            dispatch(setCleanLivre())
        }
    },[deleteLivreModal.confirm])
    
    
    useEffect(()=>{
        if(removeLivre.delete_ok){
            toast.success("livre supprimé")
            dispatch(setDeleteLivre({...deleteLivreModal ,  active : false, confirm : false}))
        }
    },[removeLivre.delete_ok])
    
    useEffect(()=>{
        if(allLivre.status == "find" ||addLivre.create_ok || removeLivre.delete_ok){
            dispatch(findAllLivre())
        }
    },[
        allLivre.status ,
        removeLivre.delete_ok,
        addLivre.create_ok
    ])
    
    //PAGINATION
    
    const dataParPage = 5
    const [dataPage, setDataPage] = useState<Livre[]>([])
    const [status, setStatus] = useState(false)
    
    const filtered = allLivre.search ? allLivre.filteredData : allLivre.data;
    const listeLivre = status ? dataPage : filtered.slice(0, dataParPage);


    //SEARCH
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInput(value)
        dispatch(setSearchLivre(value)); //Envoie la valeur au slice pour filtrer
        setStatus(false) // 👈 Important : on sort du mode pagination quand on relance une recherche

        return() =>{
            setCleanSearchLivre()
        }
    }
    
    
    return(
        <>
            <LivreDelete/>
            <div className="livre">
                <Header/>
                <div className="corpsLivre">
                    <Navigation/>
                    <div className="principale">
                        {/* HEAD */}
                        <div className="headLivre">
                            <div className="titleLivre">
                                <div className="boxlivre">
                                    <h2>Nos livres</h2>
                                </div>
                                <div className="search">
                                    <input type="text" name="" id=""
                                        onChange={handleSearchChange} 
                                        style={{
                                            opacity: isInputVisible ? 1 : 0, // Contrôle de la visibilité via opacity
                                            width: isInputVisible ? '30vw' : '0', // Contrôle de la largeur de l'input
                                            padding: isInputVisible ? '.5vw 1vw .5vw 2vw' : '0', // Gestion de l'espace interne
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            transition: 'all 0.5s ease-out', // Transition fluide pour toutes les propriétés
                                            pointerEvents: isInputVisible ? 'auto' : 'none', // Désactive l'input quand il est caché
                                        }} placeholder="livre édification......."/>
                                    <button type="button" onClick={clickSearch}>
                                        <FontAwesomeIcon className="icon" icon={faSearch}/>
                                    </button>
                                </div>
                            </div>
                            <div className="contentLink">
                                <Link to={""} className="lien" onClick={() => dispatch(setFilterByCategorie("Edification"))}>Edification</Link>
                                <Link to={""} className="lien" onClick={() => dispatch(setFilterByCategorie("Doctrine"))}>Doctrine</Link>
                                <Link to={""} className="lien" onClick={() => dispatch(setFilterByCategorie("Introduction"))}>Introduction de la bible</Link>
                                <Link to={""} className="lien" onClick={() => dispatch(setFilterByCategorie("Psychologie"))}>Psychologie</Link>
                                <Link to={""} className="lien" onClick={() => dispatch(setFilterByCategorie("Roman"))}>Roman</Link>
                                <Link to={""} className="lien" onClick={() => dispatch(setFilterByCategorie("Histoire"))}>Histoire</Link>
                            </div>
                            <hr />
                        </div>

                        {/* BODY */}
                        <div className="bodyLivre">
                            <table>
                                <thead>
                                    <tr>
                                        <th>titre</th>
                                        <th>auteur</th>
                                        <th>catégorie</th>
                                        <th>éditeur</th>
                                        <th>disponibilité</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {
                                    listeLivre.length ? (
                                        listeLivre.map(liste =>
                                            <tbody key={liste.id}>
                                                <tr>
                                                    <td>{liste.titre}</td>
                                                    <td>{liste.auteur}</td>
                                                    <td>{liste.categorie}</td>
                                                    <td>{liste.editeur}</td>
                                                    <td>Disponible</td>
                                                    <td>
                                                        <div className="action">
                                                            <button>
                                                                <FontAwesomeIcon icon={faEye} className="font_action"/>
                                                            </button>
                                                            <button>
                                                                <FontAwesomeIcon icon={faPen} className="font_action"/>
                                                            </button>
                                                            <button type="submit">
                                                                <FontAwesomeIcon icon={faTrash} className="font_action" onClick={()=>openDeleteLivre(liste.id)}/>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    ) : 
                                    <div className="aucun">
                                        <p>aucun livre</p>
                                    </div>
                                }
                            </table>
                        </div>
                            <Pagination<Livre> 
                                dataParPage={dataParPage} 
                                data={filtered} 
                                dataActuel={setDataPage} 
                                setStatus={setStatus}
                            />

                        {/* ADD */}
                        <div className="addLivre">
                            <div className="title">
                                <h2>Ajouter un livre</h2>
                            </div>
                            <hr />
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="ligneForm">
                                    <div className="inputContent">
                                        <label htmlFor="">Titre</label>
                                        <input type="text" {...register("titre")} id="" placeholder="titre du livre"/>
                                    </div>
                                    <div className="inputContent">
                                        <label htmlFor="">auteur</label>
                                        <input type="text" {...register("auteur")} id="" placeholder="qui est l'auteur"/>
                                    </div>
                                </div>
                                <div className="ligneForm">
                                    <div className="inputContent">
                                        <label htmlFor="">catégorie</label>
                                        <Select 
                                            options = {livreCategorie}
                                            onChange = {(selectedOption) => setValue("categorie",selectedOption?.value)}
                                            placeholder="Choisissez le catégorie"
                                            isSearchable 
                                            className="selekt"
                                            // menuPlacement="auto"
                                            styles={{
                                                menu: (base) => ({
                                                    ...base,
                                                    maxHeight: "8vw",
                                                    overflowY: "auto",
                                                }),
                                                menuList: (base) => ({
                                                    ...base,
                                                    "::-webkit-scrollbar": {
                                                        width: "6px",
                                                    },
                                                    "::-webkit-scrollbar-thumb": {
                                                        backgroundColor: "#4caf50",
                                                        borderRadius: "10px",
                                                    },
                                                    "::-webkit-scrollbar-track": {
                                                        backgroundColor: "#f0f0f0",
                                                        borderRadius: "10px",
                                                    },
                                                }),
                                            }}
                                        />
                                        <input type="hidden" {...register("categorie", { required: "La catégorie est requise" })} />
                                    </div>
                                    <div className="inputContent">
                                        <label htmlFor="">éditeur</label>
                                        <input type="text" {...register("editeur")} id="" placeholder="l'éditeur ?"/>
                                    </div>
                                </div>
                                <div className="ligneForm">
                                    <button className="ajout" type="submit">ajouter</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}