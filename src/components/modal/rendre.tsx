import { useSelector } from "react-redux" 
import { AppDispatch, RootState } from "../redux/store" 
import { useDispatch } from "react-redux" 
import { setRendreModal } from "../redux/slice/modalSlice" 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome" 
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose"
import { retournerEmprunt, prolongerEmprunt, findAllEmprunt } from "../redux/asyncThunk/empruntThunk"
import { useEffect } from "react"
import { resetRetourState, resetProlongationState } from "../redux/slice/empruntSlice"
import { toast } from "react-toastify"

// Ajout des interfaces nécessaires
interface Membre {
    id: number
    nom: string
    prenom: string
    numero_mobile: number
    email: string
    genre: string
    image: string
    date_adhesion: Date
}

interface Livre {
    id: number
    titre: string
    auteur: string
    categorie: string
    editeur: string
}

interface Emprunt {
    id: number
    membre: Membre
    livre: Livre
    date_emprunt: Date
    date_retour: Date
}

export const RendreModal = () => {
    const dispatch = useDispatch<AppDispatch>()
    
    const modalState = useSelector((state: RootState) => state.modalStore)
    const empruntState = useSelector((state: RootState) => state.empruntStore)
    
    const { rendreModal } = modalState
    const { allEmprunt, retourEmprunt: retourState, prolongationEmprunt } = empruntState
    
    // Trouver l'emprunt correspondant à l'ID
    const empruntSelectionne = allEmprunt && allEmprunt.data && Array.isArray(allEmprunt.data) 
        ? allEmprunt.data.find((emprunt: Emprunt) => emprunt.id === rendreModal.id)
        : null
    
    // Calculer le nombre de jours restants et le statut
    const jourRestant = empruntSelectionne 
        ? Math.ceil((new Date(empruntSelectionne.date_retour).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
        : 0
    
    const statut = jourRestant < 0 ? "en retard" : jourRestant === 0 ? "à rendre aujourd'hui" : `${jourRestant} jours restants`
    
    // Gérer le succès du retour d'emprunt
    useEffect(() => {
        if (retourState.success) {
          toast.success("Livre retourné avec succès !");
          closeRendre();
          dispatch(resetRetourState());
          dispatch(findAllEmprunt()); // Cette ligne est importante
        }
    }, [retourState.success, dispatch]);
    
    // Gérer le succès de la prolongation
    useEffect(() => {
        if (prolongationEmprunt.success) {
            toast.success("Emprunt prolongé avec succès !")
            closeRendre()
            dispatch(resetProlongationState())
            dispatch(findAllEmprunt())  // Rafraîchir la liste des emprunts
        }
    }, [prolongationEmprunt.success, dispatch])
    
    const closeRendre = () => {
        dispatch(setRendreModal({
            id: rendreModal.id,  // Conserver l'ID existant
            active: false
        }))
    }
    
    // Fonctions pour gérer les actions
    const handleRetour = () => {
        console.log("ID de l'emprunt à retourner:", rendreModal.id);
        if (rendreModal.id) {
            dispatch(retournerEmprunt(rendreModal.id))
        } else {
            toast.error("Impossible de retourner cet emprunt")
        }
    }
    
    const handleProlonger = () => {
        if (rendreModal.id) {
            dispatch(prolongerEmprunt(rendreModal.id))
        } else {
            toast.error("Impossible de prolonger cet emprunt")
        }
    }
    
    const handleContacter = () => {
        // Vérifier si nous avons les informations de l'adhérent
        if (empruntSelectionne && empruntSelectionne.membre) {
            // Ouvrir l'application de messagerie par défaut
            window.location.href = `mailto:${empruntSelectionne.membre.email}?subject=Retour de livre - ${empruntSelectionne.livre.titre}&body=Bonjour ${empruntSelectionne.membre.prenom} ${empruntSelectionne.membre.nom},%0D%0A%0D%0ANous vous rappelons que le livre "${empruntSelectionne.livre.titre}" doit être retourné à la bibliothèque.%0D%0A%0D%0ABien cordialement,%0D%0AL'équipe de la bibliothèque`
        } else {
            toast.error("Informations de contact non disponibles")
        }
    }
    
    return (
        <>
            <div className={`modalRendre ${rendreModal.active ? "active" : ""}`}>
                <div className="overlay"></div>
                <div className="modal">
                    <h3>Livre à rendre</h3>
                    <hr />
                    <div className="text">
                        {empruntSelectionne ? (
                            <>
                                <p><span>Titre : </span>{empruntSelectionne.livre.titre}</p>
                                <p><span>Emprunteur : </span>{empruntSelectionne.membre.nom} {empruntSelectionne.membre.prenom}</p>
                                <p><span>Date d'emprunt : </span>{new Date(empruntSelectionne.date_emprunt).toLocaleDateString()}</p>
                                <p><span>Date de retour : </span>{new Date(empruntSelectionne.date_retour).toLocaleDateString()}</p>
                                <p><span>Statut : </span>{statut}</p>
                            </>
                        ) : (
                            <p>Information non disponible</p>
                        )}
                    </div>
                    <div className="action">
                        <button 
                            type="submit" 
                            onClick={handleRetour}
                            disabled={retourState.loading}
                        >
                            {retourState.loading ? "Traitement..." : "Rendre maintenant"}
                        </button>
                        <button 
                            type="submit" 
                            onClick={handleProlonger}
                            disabled={prolongationEmprunt.loading}
                        >
                            {prolongationEmprunt.loading ? "Traitement..." : "Prolonger l'emprunt"}
                        </button>
                        <button 
                            type="submit" 
                            onClick={handleContacter}
                        >
                            Contacter l'adhérent
                        </button>
                    </div>
                    <button className="close" onClick={closeRendre}><FontAwesomeIcon icon={faClose} /></button>
                </div>
            </div>
        </>
    )
}