import React, { useContext, useState, useEffect } from "react";
import EventCard from "./EventCard/EventCard";
import { NewEventContext } from "../NewEventStore/NewEventStore";

const EventsList = (props) => {
  let [newEvent, setNewEvent] = useContext(NewEventContext);

  const deleteEvent = (key) => {
    let newList = [...newEvent];

    let searchedQuery = newList.filter((event) => {
      return event.eventUniqueKey != key;
    });

    props.setIsChanged(true);
    setNewEvent(searchedQuery);
  };

  return (
    <React.Fragment>
      {props.filtered.map((elementEvent, index) => {
        return (
          <EventCard
            key={elementEvent.eventUniqueKey}
            indexInArray={index}
            deleteEvent={deleteEvent}
            event={elementEvent}
            filtered={props.filtered}
            setFiltered={props.setFiltered}
            setIsChanged={props.setIsChanged}
          />
        );
      })}
    </React.Fragment>
  );
};

export default EventsList;
