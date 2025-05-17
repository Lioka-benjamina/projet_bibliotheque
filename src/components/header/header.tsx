import "../../assets/header.scss";
import { faBars, faBell, faChevronDown, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAdminModal } from "../redux/slice/modalSlice";
import { RootState } from "../redux/store";
import { GereAdmin } from "../modal/gereAdmin";

export const Header = () => {
    const dispatch = useDispatch();
    const { adminModal } = useSelector((state: RootState) => state.modalStore);

    const [isInputVisible, setIsInputVisible] = useState(false);

    const openModalAdmin = () => {
        dispatch(setAdminModal({ active: true }));
    };

    const toggleSearchInput = () => {
        setIsInputVisible(!isInputVisible);
    };

    return (
        <>
            <GereAdmin />
            <header className="header">
                <div className="header-left">
                    <h2 className="logo">M.S.E</h2>
                    <FontAwesomeIcon icon={faBars} className="menu-icon" />
                </div>

                <div className="header-right">
                    <h3 className="dashboard-title">Tableau de bord</h3>

                    <div className="admin-section">
                        <input
                            type="text"
                            className={`search-input ${isInputVisible ? 'visible' : ''}`}
                            placeholder="Rechercher un livre..."
                        />
                        <button className="search-btn" onClick={toggleSearchInput}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>

                        <div className="notification-icon">
                            <FontAwesomeIcon icon={faBell} />
                            <span className="badge">3</span>
                        </div>

                        <img src="/images/profilLuc.jpg" alt="Profil" className="profile-pic" />

                        <button className="dropdown-btn" onClick={openModalAdmin}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
};
