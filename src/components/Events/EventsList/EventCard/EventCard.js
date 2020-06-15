import React, { useEffect, useState } from "react";
import ConfirmDeleteModal from "../../EventsBuilder/ConfirmDeleteModal/ConfirmDeleteModal";
import EventDetailsModal from "./EventDetailsModal/EventDetailsModal";
import "./eventCard.css";

const EventCard = (props) => {
  let [isConfirmOpen, setIsConfirmOpen] = useState(false);
  let [isDetailsOpen, setIsDetailsOpen] = useState(false);
  let [differenceInDays, setDifferenceInDays] = useState(false);
  let today = new Date();

  const readFile = (file, img) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
  };
  useEffect(() => {
    const imgContainer = document.querySelectorAll(".eventImageSrc");
    // const loadingImg = props.event.eventImageObj.imgContainer
    //   ? readFile(
    //       props.event.eventImageObj.imgContainer,
    //       imgContainer[imgContainer.length - 1]
    //     )
    //   : null;

    var today = new Date();

    var dateToday = new Date(today);

    var dd = today.getDate();

    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = mm + "/" + dd + "/" + yyyy;

    dateToday = new Date(today);
    const dateStartEvent = new Date(props.event.eventDate.startDate.date);
    const Difference_In_Time = dateStartEvent.getTime() - dateToday.getTime();
    const Difference_In_Days = (
      Difference_In_Time /
      (1000 * 3600 * 24)
    ).toFixed(0);
    setDifferenceInDays(Difference_In_Days);
  });
  const detailsOpenHandler = () => {
    setIsDetailsOpen(!isDetailsOpen);
  };
  const checkTimeToEventStart = () => {
    const textToHTML = (text) => {
      return <div dangerouslySetInnerHTML={{ __html: text }} />;
    };
    if (differenceInDays == 1) {
      return textToHTML(
        `Rozpoczyna się za: <span>${differenceInDays} dzień</span>`
      );
    } else if (differenceInDays > 1) {
      return textToHTML(
        `Rozpoczyna się za: <span>${differenceInDays} dni</span>`
      );
    } else if (differenceInDays == 0) {
      return textToHTML(`Rozpoczyna się już <span>dzisiaj</span>`);
    } else if (
      differenceInDays < 0 &&
      new Date(props.event.eventDate.endDate.date) >= today
    ) {
      return textToHTML(`<span>Wydarzenie trwa!</span>`);
    } else if (new Date(props.event.eventDate.endDate.date) <= today) {
      return textToHTML(`<span>Wydarzenie zakończyło się!</span>`);
    }
  };
  return (
    <div className="eventCard">
      {isDetailsOpen ? (
        <EventDetailsModal
          detailsOpenHandler={detailsOpenHandler}
          event={props.event}
          indexInArray={props.indexInArray}
          filtered={props.filtered}
          setIsChanged={props.setIsChanged}
        />
      ) : null}
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
      <div className="eventImage">
        {props.event.eventImgLink ? (
          <img className="eventImageSrc" src={props.event.eventImgLink} />
        ) : (
          <img src="./pkoMaraton.jpg" />
        )}
      </div>
      <header className="eventCardHeader">
        <div className="eventCardDate">
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
        </div>
        <div className="eventCardTitle">
          {props.event.eventName ? props.event.eventName : "41. PKO Półmaraton"}
        </div>
        <div className="eventCardInfo">
          Organizator:
          {props.event.eventPromoter ? (
            <span> {props.event.eventPromoter} </span>
          ) : (
            <span> PKO</span>
          )}
        </div>
        <div className="eventCardInfo">
          Miejsce:
          {props.event.eventLocality ? (
            <span> {props.event.eventLocality} </span>
          ) : (
            <span> Szczecin</span>
          )}
        </div>
        <div className="eventCardInfo">
          {props.event.eventLocality ? (
            <React.Fragment>{checkTimeToEventStart()}</React.Fragment>
          ) : (
            <span> Szczecin</span>
          )}
        </div>
      </header>
      <article>
        <p className="eventCardDescription">
          {props.event.eventDescription ? (
            props.event.eventDescription
          ) : (
            <span>
              30 sierpnia „Pobiegniemy razem” w 41 edycji PKO Półmaraton
              Szczecin na dystansie: półmaratonu oraz biegu na 10 km. Półmaraton
              Szczecin przez wiele lat pozyskał grono wiernych , lokalnych
              biegaczy, którym bardzo dziękujemy za starty i promocję
              największej imprezy biegowej w regionie.
            </span>
          )}
        </p>
      </article>
    </div>
  );
};

export default EventCard;
