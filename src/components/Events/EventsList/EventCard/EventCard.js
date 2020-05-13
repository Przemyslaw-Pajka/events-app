import React from "react";
import "./eventCard.css";

const EventCard = () => (
  <div className="eventCard">
    <div className="eventCardHover">Poznaj więcej szczegółów</div>
    <div className="eventImage">
      <img src="./pkoMaraton.jpg" />
    </div>
    <header className="eventCardHeader">
      <div className="eventCardDate">
        <span>SIE</span> 30
      </div>
      <div className="eventCardTitle">41. PKO Półmaraton</div>
      <div className="eventCardPromoter">
        Organizator: <span>PKO</span>
      </div>
      <div className="eventCardPlace">
        Miejsce: <span>Szczecin</span>
      </div>
    </header>
    <article>
      <p className="eventCardDescription">
        30 sierpnia „Pobiegniemy razem” w 41 edycji PKO Półmaraton Szczecin na
        dystansie: półmaratonu oraz biegu na 10 km. Półmaraton Szczecin przez
        wiele lat pozyskał grono wiernych , lokalnych biegaczy, którym bardzo
        dziękujemy za starty i promocję największej imprezy biegowej w regionie.
      </p>
    </article>
  </div>
);

export default EventCard;
