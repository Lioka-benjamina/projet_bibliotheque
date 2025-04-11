import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useDispatch } from "react-redux"
import { setRendreModal } from "../redux/slice/modalSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose"

export const RendreModal = () =>{
    const dispatch = useDispatch()

    const modalState = useSelector((state:RootState) =>state.modalStore)
    const {rendreModal} = modalState

    const closeRendre = () =>{
        dispatch(setRendreModal({
            active :  false
        }))
    }

    return(
        <>
            <div className={`modalRendre ${rendreModal.active ? "active" : ""}`}>
                <div className="overlay"></div>
                <div className="modal">
                    <h3>livre à rendre</h3>
                    <hr />
                    <p><span>titre : </span>Grace</p>
                    <p><span>statut : </span>à rendre aujourd'hui</p>
                    <div className="action">
                        <button type="submit">Rendre maintenant</button>
                        <button type="submit">Prolonger l'emprunt</button>
                        <button type="submit">Signaler un problème</button>
                    </div>
                    <FontAwesomeIcon icon={faClose} className="close" onClick={closeRendre}/>
                </div>
            </div>
        </>
    )
}