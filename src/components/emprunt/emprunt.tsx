import "../../assets/emprunt.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Header } from "../header/header"
import { Navigation } from "../navigation/navigation"
import { faFilter, faUndo } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { setRendreModal } from "../redux/slice/modalSlice"
import { RendreModal } from "../modal/rendre"
import { useState } from "react"
import Select from "react-select"

export const Emprunt = () =>{
    
        const dispatch = useDispatch()
    
        const modalState = useSelector((state : RootState) => state.modalStore)
        const { rendreModal } = modalState
        
        const openRendreModal = () =>{
            dispatch(setRendreModal({
                active : true,
            }))
        }

        const bookOptions = [
            { value: "jesus_redempteur", label: "Jésus, le rédempteur" },
            { value: "fixe_les_yeux", label: "Fixé les yeux sur LUI" },
            { value: "comment_prier", label: "Comment Prier" }
        ];

        const  [selectedBook, setSelectedBook] :any= useState(null);


        return(
            <>
                <RendreModal/>
                <div className="emprunt">
                    <Header/>
                    <div className="empruntAccueil">
                        <Navigation/>
                        <div className="empruntContent">
                            <div className="actuStat">
                                <h2 className="empt">Emprunt en cours</h2>
                                <div className="statAnal">
                                    <input type="search" name="" id="" placeholder="filtrer la liste..."/>
                                    <FontAwesomeIcon icon={faFilter} className="iconFilter"/>
                                    <button type="submit">filtrer</button>
                                </div>
                                <hr style={{width : "48.5vw"}} />

                                <div className="empruntEnCour">
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>id Emprunt</th>
                                            <th>Nom de l'adhérent</th>
                                            <th>titre du livre</th>
                                            <th>Date d'emprunt</th>
                                            <th>Date de retour prévue</th>
                                            <th>jours restant</th>
                                            <th>Statut</th>
                                            <th>Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>001</td>
                                                <td>Jean Dupont</td>
                                                <td>Langages de l'amour</td>
                                                <td>12/01/25</td>
                                                <td>25/01/25</td>
                                                <td>3jrs</td>
                                                <td>en cours</td>
                                                <td>
                                                    <div className="rendre">
                                                        <button type="submit"><FontAwesomeIcon icon={faUndo} className="iconRendre" onClick={openRendreModal}/></button>
                                                        <p style={{cursor : "pointer"}} onClick={openRendreModal}>à rendre</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>002</td>
                                                <td>Luc Hérvé</td>
                                                <td>tout pour Lui</td>
                                                <td>23/01/25</td>
                                                <td>30/01/25</td>
                                                <td>4jrs</td>
                                                <td>en cours</td>
                                                <td>
                                                    <div className="rendre">
                                                        <button type="submit"><FontAwesomeIcon icon={faUndo} className="iconRendre" onClick={openRendreModal}/></button>
                                                        <p style={{cursor : "pointer"}} onClick={openRendreModal}>à rendre</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>003</td>
                                                <td>Jean pierre</td>
                                                <td>Commentaire Esaie</td>
                                                <td>12/01/25</td>
                                                <td>25/01/25</td>
                                                <td>0jrs</td>
                                                <td>à jours</td>
                                                <td>
                                                    <div className="rendre">
                                                        <button type="submit"><FontAwesomeIcon icon={faUndo} className="iconRendre" onClick={openRendreModal}/></button>
                                                        <p style={{cursor : "pointer"}} onClick={openRendreModal}>à rendre</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>004</td>
                                                <td>Ravo eleniste</td>
                                                <td>Grace </td>
                                                <td>12/01/25</td>
                                                <td>25/01/25</td>
                                                <td>-1jrs</td>
                                                <td>en retard</td>
                                                <td>
                                                    <div className="rendre">
                                                        <button type="submit"><FontAwesomeIcon icon={faUndo} className="iconRendre" onClick={openRendreModal}/></button>
                                                        <p style={{cursor : "pointer"}} onClick={openRendreModal}>à rendre</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>014</td>
                                                <td>Andrehy</td>
                                                <td>Eschatologie </td>
                                                <td>12/01/25</td>
                                                <td>25/01/25</td>
                                                <td>3jrs</td>
                                                <td>en cours</td>
                                                <td>
                                                    <div className="rendre">
                                                        <button type="submit"><FontAwesomeIcon icon={faUndo} className="iconRendre" onClick={openRendreModal}/></button>
                                                        <p style={{cursor : "pointer"}} onClick={openRendreModal}>à rendre</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>001</td>
                                                <td>Jean Dupont</td>
                                                <td>Langages de l'amour</td>
                                                <td>12/01/25</td>
                                                <td>25/01/25</td>
                                                <td>3jrs</td>
                                                <td>en cours</td>
                                                <td>
                                                    <div className="rendre">
                                                        <button type="submit"><FontAwesomeIcon icon={faUndo} className="iconRendre" onClick={openRendreModal}/></button>
                                                        <p style={{cursor : "pointer"}} onClick={openRendreModal}>à rendre</p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>002</td>
                                                <td>Luc Hérvé</td>
                                                <td>tout pour Lui</td>
                                                <td>23/01/25</td>
                                                <td>30/01/25</td>
                                                <td>4jrs</td>
                                                <td>en cours</td>
                                                <td>
                                                    <div className="rendre">
                                                        <button type="submit"><FontAwesomeIcon icon={faUndo} className="iconRendre" onClick={openRendreModal}/></button>
                                                        <p style={{cursor : "pointer"}} onClick={openRendreModal}>à rendre</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                {/* <div className="populaire">
                                    <h3>Livres populaires</h3>
                                    <div className="populaireContent">
                                        <FontAwesomeIcon icon={faThumbsUp}/>
                                        <div className="contenu">
                                            <h4>prince de la paix</h4>
                                            <h5>125 emprunts</h5>
                                        </div>
                                    </div>
                                    <div className="populaireContent">
                                        <FontAwesomeIcon icon={faThumbsUp}/>
                                        <div className="contenu">
                                            <h4>Commentaire du nouveau testament</h4>
                                            <h5>225 emprunts</h5>
                                        </div>
                                    </div>
                                    <div className="populaireContent">
                                        <FontAwesomeIcon icon={faThumbsUp}/>
                                        <div className="contenu">
                                            <h4>Une vie de prière</h4>
                                            <h5>92 emprunts</h5>
                                        </div>
                                    </div>
                                    <div className="populaireContent">
                                        <FontAwesomeIcon icon={faThumbsUp}/>
                                        <div className="contenu">
                                            <h4>tout par grace</h4>
                                            <h5>105 emprunts</h5>
                                        </div>
                                    </div>
                                    <div className="populaireContent">
                                        <FontAwesomeIcon icon={faThumbsUp}/>
                                        <div className="contenu">
                                            <h4>Comment evangéliser</h4>
                                            <h5>95 emprunts</h5>
                                        </div>
                                    </div>
                                    <div className="populaireContent">
                                        <FontAwesomeIcon icon={faThumbsUp}/>
                                        <div className="contenu">
                                            <h4>Prière des incrédule</h4>
                                            <h5>115 emprunts</h5>
                                        </div>
                                    </div>
                                    <div className="populaireContent">
                                        <FontAwesomeIcon icon={faThumbsUp}/>
                                        <div className="contenu">
                                            <h4>L'evangile selon Dieu</h4>
                                            <h5>101 emprunts</h5>
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                            <div className="newEmpreint">
                                <div className="new_empreint_ajout">
                                    <div className="title">
                                        <h3 className="titleContent">Ajouter nouvelle emprunt</h3>
                                    </div>
                                    <form action="">
                                        <div className="formulaire">
                                            <label htmlFor="">Nom de l'emprunteur</label>
                                            <input type="text" name="" id="" placeholder="jean baptist"/>
                                        </div>
                                        <div className="formulaire">
                                            <label htmlFor="">Séléctionnez un livre</label>
                                            <Select
                                                options={bookOptions} 
                                                value={selectedBook}
                                                onChange={setSelectedBook}
                                                placeholder="Choisissez votre livre préféré"
                                                isSearchable className="selekt"
                                            />
                                        </div>
                                        <div className="formulaire">
                                            <label htmlFor="">Date de l'emprunt</label>
                                            <input type="date" name="" id="" />
                                        </div>
                                        <div className="formulaire">
                                            <label htmlFor="">Date de retour</label>
                                            <input type="date" name="" id="" />
                                        </div>
                                        <button>ajouter</button>
                                    </form>
                                </div>
                                <div className="retard">
                                    <div className="title">
                                        <h3>Liste des emprunt en retard</h3>
                                    </div>
                                    <div className="boxList">
                                        <div className="list">
                                            <div className="nom">Ravo eleniste</div>
                                            <div className="livre"><span>Livre : </span>Grace</div>
                                        </div>
                                        <hr />
                                        <div className="list">
                                            <div className="nom">Patrick</div>
                                            <div className="livre"><span>Livre : </span>Prière</div>
                                        </div>
                                        <hr />
                                        <div className="list">
                                            <div className="nom">José</div>
                                            <div className="livre"><span>Livre : </span>théologie systématique</div>
                                        </div>
                                        <hr />
                                        <div className="list">
                                            <div className="nom">Peter pon</div>
                                            <div className="livre"><span>Livre : </span>Amazing grace</div>
                                        </div>
                                        <hr />
                                        <div className="list">
                                            <div className="nom">Diamondra</div>
                                            <div className="livre"><span>Livre : </span>Histoire de l'ancien testament</div>
                                        </div>
                                        <hr />
                                        <div className="list">
                                            <div className="nom">Rabbin</div>
                                            <div className="livre"><span>Livre : </span>Canonique</div>
                                        </div>
                                        <hr />
                                        <div className="list">
                                            <div className="nom">Nambinina</div>
                                            <div className="livre"><span>Livre : </span>Connaitre Dieu</div>
                                        </div>
                                        <hr />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}