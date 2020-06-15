import React, { useContext } from "react";
import { NewEventContext } from "../NewEventStore/NewEventStore";
import plus from "./iconmonstr-plus.svg";

const EventsBuilder = (props) => {
  return (
    <button
      className="eventBuilderCard eventCard"
      id="eventBuilderCard"
      onClick={() => props.eventModalHandler()}
    >
      <img className="plusIcon" src={plus} />
      <p>Dodaj wydarzenie</p>
    </button>
  );
};

export default EventsBuilder;
