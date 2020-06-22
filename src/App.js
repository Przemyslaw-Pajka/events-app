import React from "react";
import fb from "./firebase/firebase";
import "./App.css";
import "./MapStyle.css";
import Header from "./components/Header/Header";
import Events from "./components/Events/Events";
import { NewEventProvider } from "./components/Events/NewEventStore/NewEventStore";

function App() {
  const firestoreApp = fb.appInit();
  const firebaseDB = fb.dbInit();

  return (
    <div className="App">
      <Header />
      <NewEventProvider firebaseDB={firebaseDB}>
        <Events firebase={{ firestoreApp, firebaseDB }} />
      </NewEventProvider>
    </div>
  );
}

export default App;
