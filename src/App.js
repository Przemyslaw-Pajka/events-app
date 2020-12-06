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

  function handleFirstTab(e) {
    if (e.keyCode === 9) {
        document.body.classList.add('user-is-tabbing');

        window.removeEventListener('keydown', handleFirstTab);
        window.addEventListener('mousedown', handleMouseDownOnce);
    }
  }

  function handleMouseDownOnce() {
      document.body.classList.remove('user-is-tabbing');

      window.removeEventListener('mousedown', handleMouseDownOnce);
      window.addEventListener('keydown', handleFirstTab);
  }

  window.addEventListener('keydown', handleFirstTab);
  
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
