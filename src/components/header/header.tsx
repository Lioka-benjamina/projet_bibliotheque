import "../../assets/header.scss"
import { faBars, faBell, faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setAdminModal } from "../redux/slice/modalSlice"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { GereAdmin } from "../modal/gereAdmin"

export const Header = () =>{
    const dispatch = useDispatch()
    const  adminModalState = useSelector((state :  RootState) => state.modalStore)
    const {adminModal} = adminModalState

    const [isInputVisible , SetIsInputVisible] = useState(false)

    const openModalAdmin = () =>{
        dispatch(setAdminModal(
            {
                active : true
            }
        ))
    }


    const clickSearch = () =>{
            SetIsInputVisible(!isInputVisible)
            // console.log(isInputVisible);
    }
    return(
        <>
            <GereAdmin/>
           <div className="topHead">
                <div className="title">
                    <h2>M.S.E</h2>
                    < FontAwesomeIcon icon={faBars}/>
                </div>
                <div className="headG">
                    <div className="dash">
                        <h3>Tableau de bord</h3>
                    </div>
                    <div className="infoAdmin">
                        <input type="text" name="" id="" style={{
                            opacity: isInputVisible ? 1 : 0, // Contrôle de la visibilité via opacity
                            width: isInputVisible ? '30vw' : '0', // Contrôle de la largeur de l'input
                            padding: isInputVisible ? '.5vw 1vw .5vw 2vw' : '0', // Gestion de l'espace interne
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            transition: 'all 0.5s ease-out', // Transition fluide pour toutes les propriétés
                            pointerEvents: isInputVisible ? 'auto' : 'none', // Désactive l'input quand il est caché
                            }} placeholder="livre édification......."/>
                        <button type="submit" onClick={clickSearch}>
                            <FontAwesomeIcon className="icon" icon={faSearch}/>
                        </button>
                        <FontAwesomeIcon className="icon" icon={faBell}/>
                        <div className="notif"><h3>3</h3></div>
                        <img src="/images/profilLuc.jpg" alt="" />
                        <button style={{cursor : "pointer"}} type="submit" onClick={openModalAdmin}><FontAwesomeIcon className="iconCherch" icon={faChevronDown}/></button>
                    </div>
                </div>
           </div>
        </>
    )
}