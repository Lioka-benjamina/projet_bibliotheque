import "../../assets/emprunt.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Header } from "../header/header"
import { Navigation } from "../navigation/navigation"
import { faFilter, faUndo } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { setRendreModal } from "../redux/slice/modalSlice"
import { RendreModal } from "../modal/rendre"
import { useEffect, useState } from "react"
import Select from "react-select"
import { FieldValues, useForm } from "react-hook-form"
import { createEmprunt, findAllEmprunt } from "../redux/asyncThunk/empruntThunk"
import { toast } from "react-toastify"
import { resetCreateState } from "../redux/slice/empruntSlice"

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
        const { rendreModal } = modalState
        const {allMembre} = membreState
        const {allLivre} = livreState
        const {addEmprunt} = empruntState

        const listeAdherants = allMembre
        const [selectAdherant , setSelectedAdherant] = useState("")

        const listeLivre = allLivre
        const [selectLivre , setSelectLivre] = useState("")

        const {handleSubmit , reset , register} = useForm()

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

        // Charger les données nécessaires au chargement du composant
        useEffect(() => {
            dispatch(findAllEmprunt());
        }, [dispatch]);

        
        const openRendreModal = () =>{
            dispatch(setRendreModal({
                active : true,
            }))
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
                                            <tr>
                                                <td>001</td>
                                                <td>Jean Dupont</td>
                                                <td>Langages de l'amour</td>
                                                <td>12/01/25</td>
                                                <td>25/01/25</td>
                                                <td>3jrs</td>
                                                <td>en cours</td>
                                                <td>
                                                    <div className="rendre">
                                                        <button type="submit"><FontAwesomeIcon icon={faUndo} className="iconRendre" onClick={openRendreModal}/></button>
                                                        <p style={{cursor : "pointer"}} onClick={openRendreModal}>à rendre</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>002</td>
                                                <td>Luc Hérvé</td>
                                                <td>tout pour Lui</td>
                                                <td>23/01/25</td>
                                                <td>30/01/25</td>
                                                <td>4jrs</td>
                                                <td>en cours</td>
                                                <td>
                                                    <div className="rendre">
                                                        <button type="submit"><FontAwesomeIcon icon={faUndo} className="iconRendre" onClick={openRendreModal}/></button>
                                                        <p style={{cursor : "pointer"}} onClick={openRendreModal}>à rendre</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                            <div className="newEmpreint">
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
                                <div className="retard">
                                    <div className="title">
                                        <h3>Liste des emprunt en retard</h3>
                                    </div>
                                    <div className="boxList">
                                        <div className="list">
                                            <div className="nom">Ravo eleniste</div>
                                            <div className="livre"><span>Livre : </span>Grace</div>
                                        </div>
                                        <hr />
                                        <div className="list">
                                            <div className="nom">Patrick</div>
                                            <div className="livre"><span>Livre : </span>Prière</div>
                                        </div>
                                        <hr />
                                        <div className="list">
                                            <div className="nom">José</div>
                                            <div className="livre"><span>Livre : </span>théologie systématique</div>
                                        </div>
                                        <hr />
                                        <div className="list">
                                            <div className="nom">Peter pon</div>
                                            <div className="livre"><span>Livre : </span>Amazing grace</div>
                                        </div>
                                        <hr />
                                        <div className="list">
                                            <div className="nom">Diamondra</div>
                                            <div className="livre"><span>Livre : </span>Histoire de l'ancien testament</div>
                                        </div>
                                        <hr />
                                        <div className="list">
                                            <div className="nom">Rabbin</div>
                                            <div className="livre"><span>Livre : </span>Canonique</div>
                                        </div>
                                        <hr />
                                        <div className="list">
                                            <div className="nom">Nambinina</div>
                                            <div className="livre"><span>Livre : </span>Connaitre Dieu</div>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}