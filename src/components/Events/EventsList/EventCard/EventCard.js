import React, { useEffect, useState, useRef } from "react";
import {
  checkTimeToEventStart,
  calculateDifferenceInDays,
} from "modules/modules";
import { ConfirmDeleteModal, EventDetailsModal } from "components/components";

import "../../../../styles/components/eventCard.css";

export const EventCard = (props) => {
  let [isConfirmOpen, setIsConfirmOpen] = useState(false);
  let [isDetailsOpen, setIsDetailsOpen] = useState(false);
  let [differenceInDays, setDifferenceInDays] = useState(false);

  let thisEventCard = useRef();

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
      ref={thisEventCard}
      className="eventCard"
      onClick={(e) => {
        thisEventCard.current.classList.add("open");
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
        <img className="eventImageSrc" src={props.event.eventImgLink} alt="" />
      </figure>
      <header className="eventCardHeader">
        <time
          dateTime={props.event.eventDate.startDate.fullDate}
          className="eventCardDate"
        >
          <React.Fragment>
            <span>{props.event.eventDate.startDate.monthShort}</span>
            <span>{props.event.eventDate.startDate.day}</span>
          </React.Fragment>
        </time>
        <h3 className="eventCardTitle">{props.event.eventName}</h3>
        <div className="eventCardInfo">
          Organizator:
          <span> {props.event.eventPromoter} </span>
        </div>
        <address className="eventCardInfo">
          Miejsce:
          <span> {props.event.eventLocality} </span>
        </address>
        <div className="eventCardInfo">
          <React.Fragment>
            {checkTimeToEventStart(
              differenceInDays,
              props.event.eventDate.endDate.date
            )}
          </React.Fragment>
        </div>
      </header>
      <p className="eventCardDescription">{props.event.eventDescription}</p>
    </article>
    //  END OF EventCard
  );
};
