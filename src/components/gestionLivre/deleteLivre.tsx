import { useDispatch } from "react-redux"
import "../../assets/deleteLivre.scss"
import { AppDispatch, RootState } from "../redux/store"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { setDeleteLivre } from "../redux/slice/modalSlice"

const LivreDelete = () =>{

    const dispatch = useDispatch<AppDispatch>()
    const modalState = useSelector((state : RootState) => state.modalStore)
    const {deleteLivreModal} = modalState

    const close = () =>{
        dispatch(setDeleteLivre({
            active : false
        }))
    }

    const confirmDelete = () =>{
        dispatch(setDeleteLivre({...deleteLivreModal , confirm : true}))
    }



    return(
        <>
            <div className={`livreDelete ${deleteLivreModal.active ? "active" : ""}`}>
            {/* <div className="livreDelete "> */}
                <div className="overlay"></div>
                <div className="modal">
                    <h5>Suppression</h5>
                    <hr />
                    <p>voulez-vous vraiment supprimer cette livre?</p>
                    <div className="action">
                        <button onClick={close}>annuler</button>
                        <button onClick={confirmDelete}>confirmer</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LivreDelete