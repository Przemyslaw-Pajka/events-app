import React, { useContext, useState, useEffect } from "react";
import { EventCard } from "components/components";
import { NewEventContext } from "../NewEventStore/NewEventStore";

export const EventsList = (props) => {
  let [newEvent, setNewEvent] = useContext(NewEventContext);
  const deleteEvent = (key) => {
    let newList = [...newEvent];

    let searchedQuery = newList.filter((event) => {
      return event.eventUniqueKey != key;
    });

    props.setIsChanged(true);
    setNewEvent(searchedQuery);
  };

  useEffect(() => {
    document.addEventListener(
      "click",
      (e) => {
        let isEventOpenExist = document.getElementsByClassName(
          "eventCard open"
        )[0];
        if (e.target.closest(".eventCard.open")) {
          return true;
        } else if (
          e.target.closest(".eventCard.open") === null &&
          isEventOpenExist
        ) {
          document
            .getElementsByClassName("eventCard open")[0]
            .classList.remove("open");
        }
      },
      true
    );
  }, []);

  return (
    <React.Fragment>
      {props.filtered.map((elementEvent, index) => {
        return (
          <EventCard
            key={elementEvent.eventUniqueKey}
            indexInArray={index}
            deleteEvent={deleteEvent}
            event={elementEvent}
            setFiltered={props.setFiltered}
            setIsChanged={props.setIsChanged}
          />
        );
      })}
    </React.Fragment>
  );
};
