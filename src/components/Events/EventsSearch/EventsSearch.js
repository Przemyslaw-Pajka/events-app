import React from "react";
import "./eventsSearch.css";
const EventsSearch = (props) => (
  <div className="eventsSearchContainer">
    <label htmlFor="eventsSearchInput" className="eventsSearchLabel">
      Wyszukaj wydarzenie:
    </label>
    <input
      id="eventsSearchInput"
      className="eventsSearchInput"
      onChange={(event) => props.eventSearch(event.target.value)}
    />
    <div className="magnifier"></div>
  </div>
);

export default EventsSearch;
