import { faBell, faBookReader, faChartLine, faCogs, faColumns, faHandshake, faLifeRing, faSignIn, faSignOut, faUndoAlt, faUser } from "@fortawesome/free-solid-svg-icons"
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons/faBookBookmark"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import "../../assets/navigation.scss"

export const Navigation = () =>{
    return(
        <>
            <div className="menu">
                <div className="menuContent">
                    <div className="mc">
                        <FontAwesomeIcon icon={faColumns} className="fontCol"/>
                        <Link to={"/accueil"} className="lien">dashboard</Link>
                    </div>
                    <div className="mc">
                        <FontAwesomeIcon icon={faBookReader} className="fontCol"/>
                        <Link to={"/emprunt"} className="lien">emprunts</Link>
                    </div>
                    <div className="mc">
                        <FontAwesomeIcon icon={faUndoAlt} className="fontCol"/>
                        <Link to={""} className="lien">retour</Link>
                    </div>
                    <div className="mc">
                        <FontAwesomeIcon icon={faBookBookmark} className="fontCol"/>
                        <Link to={"/livre"} className="lien">livres</Link>
                    </div>
                    <div className="mc">
                        <FontAwesomeIcon icon={faHandshake} className="fontCol"/>
                        <Link to={"/membres"} className="lien">adhérents</Link>
                    </div>
                </div>
                <div className="menuContent">
                    <div className="mc">
                        <FontAwesomeIcon icon={faChartLine} className="fontCol"/>
                        <Link to={""} className="lien">statistique</Link>
                    </div>
                    <div className="mc">
                        <FontAwesomeIcon icon={faBell} className="fontCol"/>
                        <Link to={""} className="lien">notification</Link>
                    </div>
                    <div className="mc">
                        <FontAwesomeIcon icon={faLifeRing} className="fontCol"/>
                        <Link to={""} className="lien">support</Link>
                    </div>
                    <div className="mc">
                        <FontAwesomeIcon icon={faCogs} className="fontCol"/>
                        <Link to={""} className="lien">paramètre</Link>
                    </div>
                </div>
                <div className="menuContent">
                    <div className="mc">
                        <FontAwesomeIcon icon={faUser} className="fontCol"/>
                        <Link to={""} className="lien">profil</Link>
                    </div>
                    <div className="mc">
                        <FontAwesomeIcon icon={faSignIn} className="fontCol"/>
                        <Link to={""} className="lien">connexion</Link>
                    </div>
                    <div className="mc">
                        <FontAwesomeIcon icon={faSignOut} className="fontCol"/>
                        <Link to={""} className="lien">deconnexion</Link>
                    </div>
                </div>
            </div> 
        </>
    )
}