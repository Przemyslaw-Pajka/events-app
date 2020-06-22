import React, { useContext } from "react";
import plus from "./iconmonstr-plus.svg";

export const EventsBuilder = (props) => {
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
