import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  // On récupère les données du contexte global (les événements par exemple)
  const { data } = useData();

  // On initialise un état local "index" pour savoir quelle carte est actuellement affichée
  const [index, setIndex] = useState(0);

  // On trie les événements par date décroissante (les plus récents en premier)
  const byDateDesc =
    data?.focus?.sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    ) || [];

  // Fonction pour passer automatiquement à la carte suivante après 5 secondes
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), // Si on n’est pas à la fin du tableau, on passe à la carte suivante, sinon on revient à 0
      5000 // Durée d’attente avant de changer de slide (5 secondes)
    );
  };

  // useEffect sert à déclencher nextCard quand l’index ou la longueur de la liste change
  useEffect(() => {
    nextCard();
  }, [index, byDateDesc.length]); //  Les dépendances évitent de relancer l’effet à chaque rendu

  return (
    <div className="SlideCardList">
      {/* On parcourt toutes les cartes triées */}
      {byDateDesc?.map((event, idx) => (
        <div key={event.id || `event-${idx}`}>
          {/* On affiche uniquement la carte correspondant à l’index courant */}
          <div
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {/* getMonth formate la date pour afficher le mois en texte */}
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          {/* Pagination (petits boutons ronds en bas du carrousel) */}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={event.id || `radio-${radioIdx}`} // On utilise un id unique si possible
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // Si l’index correspond, ce bouton est coché
                  onChange={() => setIndex(radioIdx)} // Permet de changer manuellement de carte en cliquant
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
