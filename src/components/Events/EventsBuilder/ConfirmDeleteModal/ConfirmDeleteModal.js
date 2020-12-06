import React from "react";
import "../../../../styles/components/confirmDeleteModal.css";

export const ConfirmDeleteModal = (props) => (
  <div className="confirmDeleteModal">
    <p>Czy napewno chcesz usunąć wydarzenie?</p>
    <div className="row">
      <button
        onClick={() => {
          props.setIsConfirmOpen(false);
          props.deleteEvent(props.eventUniqueKey);
        }}
      >
        Tak
      </button>
      <button onClick={() => props.setIsConfirmOpen(false)}>Nie</button>
    </div>
  </div>
);
