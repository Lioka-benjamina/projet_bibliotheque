import "../../assets/emprunt.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Header } from "../header/header"
import { Navigation } from "../navigation/navigation"
import { faFilter, faL, faUndo } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { setRendreModal } from "../redux/slice/modalSlice"
import { RendreModal } from "../modal/rendre"
import React, { useEffect, useState } from "react"
import Select from "react-select"
import { FieldValues, useForm } from "react-hook-form"
import { createEmprunt, findAllEmprunt } from "../redux/asyncThunk/empruntThunk"
import { toast } from "react-toastify"
import { resetCreateState } from "../redux/slice/empruntSlice"
import Pagination from "../pagination/paginationList"
import { FaBookOpen, FaClock, FaEnvelope, FaExclamationTriangle, FaUser } from "react-icons/fa"

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

interface Livre {
    id : number
    titre : string
    auteur : string
    categorie : string
    editeur : string
}

interface Emprunt {
    id : number
    membre : Membre
    livre :Livre
    date_emprunt : Date
    date_retour : Date
    
}

// Ajoutez cette interface pour définir le type des options du Select
interface SelectOption {
    value: string | number;
    label: string;
}

export const Emprunt = () =>{
    
        const dispatch = useDispatch<AppDispatch>()
        const membreState = useSelector((state : RootState) => state.membreStore)
        const livreState = useSelector((state : RootState)=>state.livreStore)
        const empruntState = useSelector((state : RootState)=>state.empruntStore)
        const modalState = useSelector((state : RootState) => state.modalStore)
        const {handleSubmit , reset , register} = useForm()
        const [empruntsEnRetard, setEmpruntsEnRetard] = useState<Emprunt[]>([]);


        const { rendreModal } = modalState
        const {allMembre} = membreState
        const {allLivre} = livreState
        const {addEmprunt , allEmprunt} = empruntState
        const listeEmprunt = allEmprunt.data

        
        const listeAdherants = allMembre
        const [selectAdherant , setSelectedAdherant] = useState("")
        
        const listeLivre = allLivre
        const [selectLivre , setSelectLivre] = useState("")
        

        // CREATE
        const onSubmit = (data: FieldValues) => {
            console.log("Données soumises:", { selectAdherant, selectLivre, date_emprunt: data.date_emprunt, date_retour: data.date_retour });
            
            // Vérification plus explicite des valeurs
            if (!selectAdherant || !selectLivre || !data.date_emprunt || !data.date_retour) {
                toast.error("Veuillez sélectionner les champs");
                return;
            }
            
            // Création et envoi du FormData
            const formData = new FormData();
            formData.append("membre", selectAdherant);
            formData.append("livre", selectLivre);
            formData.append("date_emprunt", data.date_emprunt);
            formData.append("date_retour", data.date_retour);
            
            // Ajoutez un log pour voir ce qui est envoyé
            console.log("FormData créé, contenu:");
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
        
            dispatch(createEmprunt(formData));
        };

        
        useEffect(()=>{
            if(addEmprunt.create_ok){
                toast.success("emprunt ajouter")
                reset()
                setSelectLivre("")
                setSelectedAdherant("")
                dispatch(resetCreateState())
            }
        },[addEmprunt.create_ok,dispatch,reset])

        useEffect(() => {
            // Vérifiez si le modal est fermé et réinitialisez son état
            if (!rendreModal.active) {
              dispatch(setRendreModal({
                id: null,
                active: false
              }));
            }
          }, [rendreModal.active, dispatch]);
        
        // Charger les données nécessaires au chargement du composant
        useEffect(() => {
            dispatch(findAllEmprunt());
        }, [dispatch]);



        useEffect(() => {
            if (listeEmprunt && Array.isArray(listeEmprunt)) {
                // Filtrer les emprunts en retard
                const retards = listeEmprunt.filter((emprunt: Emprunt) => {
                    const joursRestants = Math.ceil(
                        (new Date(emprunt.date_retour).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    );
                    return joursRestants < 0;
                });
                setEmpruntsEnRetard(retards);
            }
        }, [listeEmprunt]);

        
        const openRendreModal = (id : number) =>{
            dispatch(setRendreModal({
                id : id ,
                active : true,
            }))
            // console.log(id);
        }
        
        // Options de sélection sécurisées
        const getMembreOptions = (): SelectOption[] => {
            if (!allMembre || !allMembre.data || !Array.isArray(allMembre.data)) {
                return [];
        }
        return allMembre.data.map((adherent: Membre) => ({
            value: adherent.id,
            label: `${adherent.nom} ${adherent.prenom}`
        }));
    };
    
    const getLivreOptions = (): SelectOption[] => {
        if (!allLivre || !allLivre.data || !Array.isArray(allLivre.data)) {
            return [];
        }
        return allLivre.data.map((livre: Livre) => ({
            value: livre.id,
            label: livre.titre
        }));
    };
    
    // Trouver le membre et le livre sélectionnés de manière sécurisée
    const getSelectedMembre = () => {
        if (!allMembre?.data || !Array.isArray(allMembre.data) || !selectAdherant) {
            return null;
        }
        const membre = allMembre.data.find(m => m.id === parseInt(selectAdherant));
        return membre ? { value: selectAdherant, label: `${membre.nom} ${membre.prenom}` } : null;
    };

    
    const getSelectedLivre = () => {
        if (!allLivre?.data || !Array.isArray(allLivre.data) || !selectLivre) {
            return null;
        }
        const livre = allLivre.data.find(l => l.id === parseInt(selectLivre));
        return livre ? { value: selectLivre, label: livre.titre } : null;
    };
    
    //  P AGINATION
    // const dataParPage = 3
    // const [dataPage , setDataPage]=  useState<Emprunt[]>([])
    // const [status , setStatus] = useState(false)

    // const listeEmprunt = status ? dataPage : allEmprunt.data.slice(0 , dataParPage)



        return(
            <>
                <RendreModal/>
                <div className="emprunt">
                    <Header/>
                    <div className="empruntAccueil">
                        <Navigation/>
                        <div className="empruntContent">
                            <div className="actuStat">
                                <h2 className="empt">Emprunt en cours</h2>
                                <div className="statAnal">
                                    <input type="search" name="" id="" placeholder="filtrer la liste..."/>
                                    <FontAwesomeIcon icon={faFilter} className="iconFilter"/>
                                    <button type="submit">filtrer</button>
                                </div>
                                <hr style={{width : "48.5vw"}} />

                                <div className="empruntEnCour">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>id Emprunt</th>
                                                <th>Nom de l'adhérent</th>
                                                <th>titre du livre</th>
                                                <th>Date d'emprunt</th>
                                                <th>Date de retour prévue</th>
                                                <th>jours restant</th>
                                                <th>Statut</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listeEmprunt && Array.isArray(listeEmprunt) && listeEmprunt.map((emprunt : Emprunt)=>{
                                                    const nomAdherant =  `${emprunt.membre.nom} ${emprunt.membre.prenom}`
                                                    const titreLivre = emprunt.livre.titre
                                                    const dateEmprunt = new Date(emprunt.date_emprunt).toLocaleDateString();
                                                    const dateRetour = new Date(emprunt.date_retour).toLocaleDateString();

                                                    const jour_restant = Math.ceil(
                                                        (new Date(emprunt.date_retour).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                                                    )

                                                    const status = jour_restant < 0 ? "en retard" : jour_restant > 0 ? "en cours" : "à rendre aujourd'hui"

                                                    return(
                                                        <tr key={emprunt.id}>
                                                            <td>{emprunt.id}</td>
                                                            <td>{nomAdherant}</td>
                                                            <td>{titreLivre}</td>
                                                            <td>{dateEmprunt}</td>
                                                            <td>{dateRetour}</td>
                                                            <td>{jour_restant} jrs</td>
                                                            <td>{status}</td>
                                                            <td>
                                                                <div className="rendre">
                                                                    <button type="submit"><FontAwesomeIcon icon={faUndo} className="iconRendre" onClick={()=>openRendreModal(emprunt.id)}/></button>
                                                                    <p style={{cursor : "pointer"}} onClick={()=>openRendreModal(emprunt.id)}>{status === "en retard" ? "contacter l'adhérent" : "à rendre"}</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                                {/* <Pagination<Emprunt> 
                                    dataParPage={dataParPage} 
                                    data={listeEmprunt} 
                                    dataActuel={setDataPage} 
                                    setStatus={setStatus}
                                    /> */}

                            <div className="newEmpreint">
                                {/* AJOUT */}
                                <div className="new_empreint_ajout">
                                    <div className="title">
                                        <h3 className="titleContent">Ajouter nouvelle emprunt</h3>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="formulaire">
                                            <label htmlFor="">Nom de l'emprunteur</label>
                                            <Select
                                                options={getMembreOptions()}
                                                value={getSelectedMembre()}
                                                onChange={(selectedOption: SelectOption | null) => 
                                                    selectedOption && setSelectedAdherant(selectedOption.value.toString())}
                                                placeholder="Tapez le nom de l'adhérent"
                                                isSearchable
                                                className="selekt"
                                            />
                                        </div>
                                        <div className="formulaire">
                                            <label htmlFor="">Séléctionnez un livre</label>
                                            <Select
                                                options={getLivreOptions()}
                                                value={getSelectedLivre()}
                                                onChange={(selectedOption: SelectOption | null) => 
                                                    selectedOption && setSelectLivre(selectedOption.value.toString())}
                                                placeholder="Choisissez votre livre préféré"
                                                isSearchable
                                                className="selekt"
                                            />
                                        </div>
                                        <div className="formulaire">
                                            <label htmlFor="">Date de l'emprunt</label>
                                            <input type="date" id="" {...register("date_emprunt", { required: true })} />
                                        </div>
                                        <div className="formulaire">
                                            <label htmlFor="">Date de retour</label>
                                            <input type="date" id="" {...register("date_retour", { required: true })} />
                                        </div>
                                        <button type="submit">ajouter</button>
                                    </form>
                                </div>

                                {/* RETARD */}
                                <div className="retard">
                                    <div className="title">
                                        <h3>
                                            <FaExclamationTriangle className="icon" />
                                            Liste des emprunts en retard
                                        </h3>
                                    </div>
                                    <div className="boxList">
                                        {empruntsEnRetard.length > 0 ? (
                                            empruntsEnRetard.map((emprunt: Emprunt) => {
                                                const joursRetard = Math.abs(Math.ceil(
                                                    (new Date(emprunt.date_retour).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                                                ));
                                                
                                                return (
                                                    <React.Fragment key={emprunt.id}>
                                                        <div className="list">
                                                            <div className="nom">
                                                                <FaUser className="icon-user" />
                                                                {`${emprunt.membre.nom} ${emprunt.membre.prenom}`}
                                                            </div>
                                                            <div className="livre">
                                                                <FaBookOpen className="icon-book" />
                                                                <span>Livre : </span>{emprunt.livre.titre}
                                                            </div>
                                                            <div className="date">
                                                                <FaClock className="icon-clock" />
                                                                En retard de {joursRetard} jour{joursRetard > 1 ? 's' : ''}
                                                            </div>
                                                            <div className="actions">
                                                                <button>
                                                                    <FaEnvelope />
                                                                </button>
                                                                <button className="warning" onClick={() => openRendreModal(emprunt.id)}>
                                                                    <FaExclamationTriangle />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <hr />
                                                    </React.Fragment>
                                                );
                                            })
                                        ) : (
                                            <div className="list">
                                                <div className="nom">Aucun emprunt en retard</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}