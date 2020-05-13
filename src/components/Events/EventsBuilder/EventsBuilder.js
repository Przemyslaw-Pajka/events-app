import React from "react";
import plus from "./iconmonstr-plus.svg";

const EventsBuilder = (props) => {
  return (
    <button
      className="eventBuilderCard eventCard"
      id="eventBuilderCard"
      onClick={() => props.eventModalHandler()}
    >
      <img className="plusIcon" src={plus} />
      <p>Add Event</p>
    </button>
  );
};

export default EventsBuilder;
