import React, { useEffect, useState, useRef } from "react";
import {
  checkTimeToEventStart,
  calculateDifferenceInDays,
} from "modules/modules";
import { ConfirmDeleteModal, EventDetailsModal } from "components/components";

import "./eventCard.css";

export const EventCard = (props) => {
  let [isConfirmOpen, setIsConfirmOpen] = useState(false);
  let [isDetailsOpen, setIsDetailsOpen] = useState(false);
  let [differenceInDays, setDifferenceInDays] = useState(false);

  let node = useRef();

  useEffect(() => {
    setDifferenceInDays(
      calculateDifferenceInDays(props.event.eventDate.startDate.date)
    );
  });

  const detailsOpenHandler = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };

  return (
    <article
      ref={node}
      className="eventCard"
      onClick={(e) => {
        node.current.classList.add("open");
        e.stopPropagation();
      }}
    >
      {isDetailsOpen ? (
        <EventDetailsModal
          detailsOpenHandler={detailsOpenHandler}
          event={props.event}
          indexInArray={props.indexInArray}
          setIsChanged={props.setIsChanged}
        />
      ) : null}
      {/* ******************************************************* */}

      <div className="eventCardHover">
        {isConfirmOpen ? (
          <ConfirmDeleteModal
            setIsConfirmOpen={setIsConfirmOpen}
            deleteEvent={props.deleteEvent}
            eventUniqueKey={props.event.eventUniqueKey}
          />
        ) : (
          <React.Fragment>
            <button
              className="showEventBtn"
              onClick={() => detailsOpenHandler()}
            >
              Poznaj więcej szczegółów
            </button>
            <button
              onClick={() => setIsConfirmOpen(true)}
              className="deleteEventBtn"
            >
              Usuń wydarzenie
            </button>
          </React.Fragment>
        )}
      </div>

      {/* ******************************************************* */}
      <figure className="eventImage">
        {props.event.eventImgLink ? (
          <img
            className="eventImageSrc"
            src={props.event.eventImgLink}
            alt=""
          />
        ) : (
          <img src="./pkoMaraton.jpg" />
        )}
      </figure>
      <header className="eventCardHeader">
        <time
          dateTime={props.event.eventDate.startDate.fullDate}
          className="eventCardDate"
        >
          {/* <span>SIE</span> 30 */}
          {props.event.eventDate ? (
            <React.Fragment>
              <span>{props.event.eventDate.startDate.monthShort}</span>
              <span>{props.event.eventDate.startDate.day}</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <span>SIE</span>
              <span>30</span>
            </React.Fragment>
          )}
        </time>
        <h3 className="eventCardTitle">
          {props.event.eventName ? props.event.eventName : "41. PKO Półmaraton"}
        </h3>
        <div className="eventCardInfo">
          Organizator:
          {props.event.eventPromoter ? (
            <span> {props.event.eventPromoter} </span>
          ) : (
            <span> PKO</span>
          )}
        </div>
        <address className="eventCardInfo">
          Miejsce:
          {props.event.eventLocality ? (
            <span> {props.event.eventLocality} </span>
          ) : (
            <span> Szczecin</span>
          )}
        </address>
        <div className="eventCardInfo">
          {props.event.eventLocality ? (
            <React.Fragment>
              {checkTimeToEventStart(
                differenceInDays,
                props.event.eventDate.endDate.date
              )}
            </React.Fragment>
          ) : (
            <span> Szczecin</span>
          )}
        </div>
      </header>
      <p className="eventCardDescription">
        {props.event.eventDescription ? (
          props.event.eventDescription
        ) : (
          <span>
            30 sierpnia „Pobiegniemy razem” w 41 edycji PKO Półmaraton Szczecin
            na dystansie: półmaratonu oraz biegu na 10 km. Półmaraton Szczecin
            przez wiele lat pozyskał grono wiernych , lokalnych biegaczy, którym
            bardzo dziękujemy za starty i promocję największej imprezy biegowej
            w regionie.
          </span>
        )}
      </p>
    </article>
    //  END OF EventCard
  );
};
