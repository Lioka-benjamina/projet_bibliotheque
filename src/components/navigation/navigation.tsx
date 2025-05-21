// Navigation.jsx
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBell, 
  faBookReader, 
  faChartLine, 
  faCogs, 
  faColumns, 
  faHandshake, 
  faLifeRing, 
  faSignOut, 
  faUndoAlt, 
  faUser 
} from "@fortawesome/free-solid-svg-icons";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons/faBookBookmark";
import "../../assets/navigation.scss";

export const Navigation = () => {
  // Structure de menu organisée pour faciliter la maintenance
  const menuItems = [
    // Premier groupe - Fonctions principales
    [
      { icon: faColumns, text: "tableau de bord", link: "/accueil" },
      { icon: faBookReader, text: "emprunts", link: "/emprunt" },
      { icon: faUndoAlt, text: "retour", link: "" },
      { icon: faBookBookmark, text: "livres", link: "/livre" },
      { icon: faHandshake, text: "adhérents", link: "/membres" },
    ],
    // Deuxième groupe - Fonctions secondaires
    [
      { icon: faChartLine, text: "statistiques", link: "" },
      { icon: faBell, text: "notifications", link: "" },
      { icon: faLifeRing, text: "support", link: "" },
      { icon: faCogs, text: "paramètres", link: "" },
    ],
    // Troisième groupe - Compte utilisateur
    [
      { icon: faUser, text: "profil", link: "" },
      { icon: faSignOut, text: "déconnexion", link: "" },
    ],
  ];

  return (
    <div className="menu">
      {menuItems.map((group, groupIndex) => (
        <div className="menuContent" key={`group-${groupIndex}`}>
          {group.map((item, itemIndex) => (
            <div className="mc" key={`item-${groupIndex}-${itemIndex}`}>
              <FontAwesomeIcon icon={item.icon} className="fontCol" />
              <Link to={item.link} className="lien">
                {item.text}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};








// import "../../assets/navigation.scss"
// import { faBell, faBookReader, faChartLine, faCogs, faColumns, faHandshake, faLifeRing, faSignIn, faSignOut, faUndoAlt, faUser } from "@fortawesome/free-solid-svg-icons"
// import { faBookBookmark } from "@fortawesome/free-solid-svg-icons/faBookBookmark"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { Link } from "react-router-dom"

// export const Navigation = () =>{
//     return(
//         <>
//             <div className="menu">
//                 <div className="menuContent">
//                     <div className="mc">
//                         <FontAwesomeIcon icon={faColumns} className="fontCol"/>
//                         <Link to={"/accueil"} className="lien">dashboard</Link>
//                     </div>
//                     <div className="mc">
//                         <FontAwesomeIcon icon={faBookReader} className="fontCol"/>
//                         <Link to={"/emprunt"} className="lien">emprunts</Link>
//                     </div>
//                     <div className="mc">
//                         <FontAwesomeIcon icon={faUndoAlt} className="fontCol"/>
//                         <Link to={""} className="lien">retour</Link>
//                     </div>
//                     <div className="mc">
//                         <FontAwesomeIcon icon={faBookBookmark} className="fontCol"/>
//                         <Link to={"/livre"} className="lien">livres</Link>
//                     </div>
//                     <div className="mc">
//                         <FontAwesomeIcon icon={faHandshake} className="fontCol"/>
//                         <Link to={"/membres"} className="lien">adhérents</Link>
//                     </div>
//                 </div>
//                 <div className="menuContent">
//                     <div className="mc">
//                         <FontAwesomeIcon icon={faChartLine} className="fontCol"/>
//                         <Link to={""} className="lien">statistique</Link>
//                     </div>
//                     <div className="mc">
//                         <FontAwesomeIcon icon={faBell} className="fontCol"/>
//                         <Link to={""} className="lien">notification</Link>
//                     </div>
//                     <div className="mc">
//                         <FontAwesomeIcon icon={faLifeRing} className="fontCol"/>
//                         <Link to={""} className="lien">support</Link>
//                     </div>
//                     <div className="mc">
//                         <FontAwesomeIcon icon={faCogs} className="fontCol"/>
//                         <Link to={""} className="lien">paramètre</Link>
//                     </div>
//                 </div>
//                 <div className="menuContent">
//                     <div className="mc">
//                         <FontAwesomeIcon icon={faUser} className="fontCol"/>
//                         <Link to={""} className="lien">profil</Link>
//                     </div>
//                     {/* <div className="mc">
//                         <FontAwesomeIcon icon={faSignIn} className="fontCol"/>
//                         <Link to={""} className="lien">connexion</Link>
//                     </div> */}
//                     <div className="mc">
//                         <FontAwesomeIcon icon={faSignOut} className="fontCol"/>
//                         <Link to={""} className="lien">deconnexion</Link>
//                     </div>
//                 </div>
//             </div> 
//         </>
//     )
// }