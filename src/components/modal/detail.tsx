import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useDispatch } from "react-redux"

export const DetailModal = () =>{
    const dispatch = useDispatch()

    const modalState = useSelector((state:RootState) =>state.modalStore)
    }

    return(
        <>
            <div className={`detailModal ${detailModal.active ? "active" : ""}`}>
                <div className="overlay"></div>
                <div className="modal">
                    <h3 className="title">Détail du livre emprunté</h3>
                    <hr />
                    <p><span>Nom de l'adhérant : </span>jean Dupont</p>
                    <p><span>Titre du livre : </span>Les langages de l'amour</p>
                    <p><span>Auteur  : </span>Gary Chapman</p>
                    <p><span>Date d'emprunt  : </span>01/12/2025</p>
                    <p><span>Date prévu de retour  : </span>15/12/2025</p>
                    <p><span>Auteur  : </span>jean Dupont</p>
                    <p><span>Auteur  : </span>jean Dupont</p>
                    <button type="submit" onClick={closeDetail}>close</button>
                </div>
            </div>
        </>
    )
}