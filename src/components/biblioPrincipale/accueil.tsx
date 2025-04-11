import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Header } from "../header/header"
import { Navigation } from "../navigation/navigation"
import { faBook, faBookOpen, faExclamationTriangle, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Accueil = () =>{

    const data = {
        labels: ['janvier', 'fevrier', 'mars', 'avril', 'Mai', 'Juin' , 'juillet' , 'Aout','Septembre' , 'Octobre' , 'Novembre' , 'Decembre'],
        datasets: [
          {
            label: 'Nombre de Visiteurs',
            data: [120, 150, 200, 250, 180, 220, 170, 280, 260, 90, 110, 115],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 70, 64, 0.2)',
              'rgba(165, 90, 14, 0.2)',
              'rgba(64, 255, 191, 0.2)',//
              'rgba(255, 64, 255, 0.2)',
              'rgba(70, 255, 64, 0.2)',
              'rgba(255, 64, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 70, 64, 0.6)',
              'rgba(165, 90, 14, 0.7)',
                'rgba(64, 255, 191, 0.64)',
              'rgba(255, 64, 255, 0.73)',
              'rgba(70, 255, 64, 0.65)',
              'rgba(255, 64, 64, 0.6)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
      const options = {
        responsive: true, // Rendre le graphique réactif (s'adapte à la taille de l'écran)
        plugins: {
          title: {
            display: true, // Afficher le titre du graphique
            text: 'Fréquentation Mensuelle de la Bibliothèque',  // Titre du graphique
          },
        },
      };

    return(
        <>
            <div className="principale">
                <Header/>
                <div className="presentation">
                    <Navigation/>
                    <div className="contenu_presentation">
                        <h1 >overview</h1>
                        <div className="actu">
                            <div className="child">
                                <div className="childStat">
                                    <FontAwesomeIcon className="font" icon={faBook}/>
                                    <h3>Livres empruntés</h3>
                                </div>
                                <p>4,257 livres empruntés</p>
                            </div>
                            <div className="child">
                                <div className="childStat">
                                    <FontAwesomeIcon className="font" icon={faExclamationTriangle}/>
                                    <h3>Retards</h3>
                                </div>
                                <p>142 livres en retard</p>
                            </div>
                            <div className="child">
                                <div className="childStat">
                                    <FontAwesomeIcon className="font" icon={faUserPlus}/>
                                    <h3>Nouveaux membres</h3>
                                </div>
                                <p>85 nouveaux adhérents</p>
                            </div>
                            <div className="child">
                                <div className="childStat">
                                    <FontAwesomeIcon className="font" icon={faBookOpen}/>
                                    <h3>Livres disponibles</h3>
                                </div>
                                <p>89285 livres disponible</p>
                            </div>
                        </div>

                        <h2 className="statistique">statistique</h2>
                        <hr />

                        <div className="stat">
                            <Bar data={data} options={options} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}