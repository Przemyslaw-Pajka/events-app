import React from "react";
import "./eventsSearch.css";
export const EventsSearch = (props) => (
  <div className="eventsSearchContainer">
    <label htmlFor="eventsSearchInput" className="eventsSearchLabel">
      Wyszukaj wydarzenie po nazwie lub kategorii:
    </label>
    <div className="eventsSearchBox">
      <input
        id="eventsSearchInput"
        className="eventsSearchInput"
        onChange={(event) => props.eventSearch(event.target.value)}
      />
      <div className="magnifier"></div>
    </div>
  </div>
);