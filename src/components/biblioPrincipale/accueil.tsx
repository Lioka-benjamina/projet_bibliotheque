// Accueil.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBook, 
  faBookOpen, 
  faExclamationTriangle, 
  faUserPlus 
} from "@fortawesome/free-solid-svg-icons";
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

import { Header } from "../header/header";
import { Navigation } from "../navigation/navigation";

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Accueil = () => {
  // Données pour le graphique des statistiques mensuelles
  const data = {
    labels: [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ],
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
          'rgba(64, 255, 191, 0.2)',
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
  
  // Options du graphique
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Fréquentation Mensuelle de la Bibliothèque',
      },
    },
  };

  // Configuration des cartes statistiques
  const statCards = [
    {
      icon: faBook,
      title: "Livres empruntés",
      value: "4,257 livres empruntés",
      active: true
    },
    {
      icon: faExclamationTriangle,
      title: "Retards",
      value: "142 livres en retard",
      active: false
    },
    {
      icon: faUserPlus,
      title: "Nouveaux membres",
      value: "85 nouveaux adhérents",
      active: false
    },
    {
      icon: faBookOpen,
      title: "Livres disponibles",
      value: "89285 livres disponibles",
      active: false
    }
  ];

  return (
    <div className="principale">
      <Header />
      <div className="presentation">
        <Navigation />
        <div className="contenu_presentation">
          <h1>tableau de bord</h1>
          <div className="actu">
            {statCards.map((card, index) => (
              <div className={`child ${card.active ? 'active' : ''}`} key={`stat-card-${index}`}>
                <div className="childStat">
                  <FontAwesomeIcon className="font" icon={card.icon} />
                  <h3>{card.title}</h3>
                </div>
                <p>{card.value}</p>
              </div>
            ))}
          </div>

          <h2 className="statistique">statistiques</h2>
          <hr />

          <div className="stat">
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};