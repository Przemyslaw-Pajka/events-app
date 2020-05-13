import React from "react";
import "./eventsSearch.css";
const EventsSearch = () => (
  <div className="eventsSearchContainer">
    <label htmlFor="eventsSearchInput" className="eventsSearchLabel">
      Wyszukaj wydarzenie:
    </label>
    <input id="eventsSearchInput" className="eventsSearchInput" />
    <div className="magnifier"></div>
  </div>
);

export default EventsSearch;
