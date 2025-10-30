import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Sort events by descending date
  const byDateDesc =
    data?.focus?.sort((evtA, evtB) =>
      new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
    ) || [];

  // Auto-switch to next slide every 5 seconds
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };

  useEffect(() => {
    nextCard();
  }, [index, byDateDesc.length]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.id || `event-${idx}`}>
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
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={event.id || `radio-${radioIdx}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  onChange={() => setIndex(radioIdx)}
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