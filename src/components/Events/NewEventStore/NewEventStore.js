import React, { useState, createContext, useEffect } from "react";

export const NewEventContext = createContext();

export const NewEventProvider = (props) => {
  let [newEvent, setNewEvent] = useState([]);

  useEffect(() => {
    const getMarker = async () => {
      const snapshot = await props.firebaseDB.collection("events").get();
      return snapshot.docs.map((doc) => doc.data());
    };

    getMarker().then((data) => {
      if (data[0].events === undefined) {
        return false;
      } else {
        setNewEvent(data[0].events);
      }
    });
  }, []);

  return (
    <NewEventContext.Provider value={[newEvent, setNewEvent]}>
      {props.children}
    </NewEventContext.Provider>
  );
};
