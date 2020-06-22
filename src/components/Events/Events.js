import React, { useState, useContext, useEffect, useRef } from "react";
import "./events.css";
import {
  EventsSearch,
  EventsBuilder,
  EventsList,
  AddEventModal,
} from "components/components";

import { NewEventContext } from "./NewEventStore/NewEventStore";
const Events = (props) => {
  let [newEvent, setNewEvent] = useContext(NewEventContext);
  const [eventModalOpen, setEventModalOpen] = useState(false);
  let [resultSearch, setResultSearch] = useState(false);
  let [filtered, setFiltered] = useState(newEvent);
  let [isFiltered, setIsFiltered] = useState(false);
  let [isChanged, setIsChanged] = useState(false);
  let newList = [];

  useEffect(() => {
    setFiltered(newEvent);
  }, [newEvent]);

  useEffect(() => {
    if (isChanged) {
      props.firebase.firebaseDB
        .collection("events")
        .doc("events")
        .set({
          events: JSON.parse(JSON.stringify(newEvent)),
        });
      setIsChanged(false);
    }
  });
  useEffect(() => {
    filterEventsList();
  }, [resultSearch]);

  const eventModalHandler = () => {
    setEventModalOpen(!eventModalOpen);
  };

  const eventSearch = (param) => {
    let item = param.trim();
    if (/\S/.test(item)) {
      setResultSearch(item);
    } else {
      setResultSearch(false);
    }
    setIsFiltered(true);
  };

  const filterEventsList = () => {
    if (resultSearch) {
      newList = newEvent.filter((item) => {
        if (
          item.eventName.toLowerCase().includes(resultSearch.toLowerCase()) ||
          item.eventCategory.toLowerCase().includes(resultSearch.toLowerCase())
        )
          return item;
      });
    } else {
      newList = newEvent;
    }
    setFiltered(newList);
  };

  return (
    <main className="mainContent">
      {eventModalOpen ? (
        <AddEventModal
          eventModalHandler={eventModalHandler}
          firebaseDB={props.firebase.firebaseDB}
          setIsChanged={setIsChanged}
        />
      ) : null}
      <EventsSearch eventSearch={eventSearch} />
      <h2>Wydarzenia</h2>
      <div className="eventsContainer">
        <EventsBuilder eventModalHandler={eventModalHandler} />
        <EventsList
          resultSearch={resultSearch}
          filtered={filtered}
          setIsChanged={setIsChanged}
          setFiltered={setFiltered}
        />
      </div>
    </main>
  );
};
export default Events;
