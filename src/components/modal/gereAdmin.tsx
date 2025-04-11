import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useDispatch } from "react-redux"
import { setAdminModal } from "../redux/slice/modalSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons/faTimesCircle"
import { Link } from "react-router-dom"

export const GereAdmin = () =>{
        const dispatch = useDispatch()
        const adminModalState =  useSelector((state : RootState) => state.modalStore)
        const { adminModal } = adminModalState

        const closeAdmin = () =>{
            dispatch(setAdminModal({active : false}))
        }

        return(
            <>
                <div className={`modalAdmin ${adminModal.active ? "active" : ""}`}>
                    <div className="modal">
                        <div className="admin">
                            <img src="./images/profilLuc.jpg" alt="" />
                            <div className="name">
                                <h3>lioka benjamina</h3>
                            </div>
                        </div>
                        <button type="submit" onClick={closeAdmin}><FontAwesomeIcon icon={faTimesCircle} /></button>
                        <div className="lienProfil">
                            <Link to={""} className="lien">Votre profile</Link>
                        </div>
                    </div>
                </div>
            </>
        )
}