import React, { useState } from "react";
import "./events.css";
import EventsSearch from "./EventsSearch/EventsSearch";
import EventsBuilder from "./EventsBuilder/EventsBuilder";
import EventsList from "./EventsList/EventsList";
import AddEventModal from "./EventsBuilder/AddEventModal/AddEventModal";
const Events = () => {
  const [eventModalOpen, setEventModalOpen] = useState(true);

  const eventModalHandler = () => {
    setEventModalOpen(!eventModalOpen);
  };
  return (
    <main className="mainContent">
      {eventModalOpen ? (
        <AddEventModal eventModalHandler={eventModalHandler} />
      ) : null}
      <EventsSearch />
      <h2>Wydarzenia</h2>
      <div className="eventsContainer">
        <EventsBuilder eventModalHandler={eventModalHandler} />
        <EventsList />
      </div>
    </main>
  );
};
export default Events;
