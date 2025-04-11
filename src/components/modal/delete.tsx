import { useDispatch, useSelector } from "react-redux"
import "../../assets/delete.scss"
import { AppDispatch, RootState } from "../redux/store"
import { setDeleteModal } from "../redux/slice/modalSlice"

const Delete = () =>{

    const dispatch = useDispatch<AppDispatch>()
    const modalState = useSelector((state:RootState) => state.modalStore)
    const {deleteModal} = modalState

    const confirmDelete = () =>{
        dispatch(setDeleteModal({...deleteModal , confirm : true}))
    }

    const closeModalDelete = () =>{
        dispatch(setDeleteModal({active : false}))
    }

    return(
        <>
            <div className={`modalDelete ${deleteModal.active ? "active" : ""}`}>
                <div className="overlay"></div>
                <div className="modal">
                    <h3>suppression</h3>
                    <hr />
                    <div className="message">
                        <p>Voulez-vous supprimer cet membre ?</p>
                    </div>
                    <div className="action">
                        <button className="btn_action" onClick={closeModalDelete}>annuler</button>
                        <button className="btn_action" onClick={confirmDelete}>confirmer</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Delete