import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./mediaQueries.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

//TODO: eventCardHover. Jesli klikniemy na mobilce to pokazuje sie eventCardHover. Teraz dziala odrazu przy 1 kliknieciu odpala sie opcja
//FIXME: MOBILNE: jeśli kliknę na eventCard to wyswietla sie eventCardHover, jesli klikne w element na zewnatrz to eventCardHover sie chowa
// DESKTOP: jesli najade kursorem na eventCard to wysiwetla sie eventCardHover, jesli zjade kursorem gdzie indziej to eventCardHover sie chowa
//TODO: Poprawić responsywność
//TODO: Na samum końcu Code Review
//TODO: Upload na serwer
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
