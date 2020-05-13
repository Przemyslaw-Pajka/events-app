import React, { useEffect } from "react";
import "./addEventModal.css";
const AddEventModal = (props) => {
  useEffect(() => {
    window.initAutocomplete();
  }, []);
  return (
    <div className="addEventModal">
      <button
        className="closeEventModal"
        id="closeEventModal"
        onClick={() => props.eventModalHandler()}
      >
        X
      </button>
      <div className="addEventModalContent">
        <h3>Dodaj nowe wydarzenie</h3>
        <form>
          <div className="form__row">
            <label>Nazwa wydarzenia:</label>
            <input type="text" placeholder="*" required />
          </div>
          <div className="form__row">
            <label>Opis wydarzenia:</label>
            <input type="text" placeholder="*" required />
          </div>
          <div className="form__row">
            <label>Nazwa organizatora:</label>
            <input type="text" placeholder="*" required />
          </div>
          <div className="form__row">
            <label>Lokalizacja:</label>
            <input
              id="cityLocationInput"
              type="text"
              placeholder="*"
              required
            />
          </div>
          {}
          <input
            id="pac-input"
            className="controls"
            type="text"
            placeholder="Wyszukaj w Mapach Google"
          />
          <div id="map"></div>
          <input type="text" id="latFld" className="latFld" />
          <input type="text" id="lngFld" className="lngFld" />
          <input id="latlng" type="text" value="40.714224,-73.961452"></input>
          {}
          <div className="form__row">
            <label>Data:</label>
            <input type="text" name="date" id="date" required />
          </div>
          <div className="form__row">
            <label>Zdjęcie wydarzenia:</label>
            <button className="uploadFile">
              Wybierz zdjęcie
              <input type="file" title="&nbsp;" required />
            </button>
          </div>
          <picture>
            <img
              id="imagePreview"
              src="https://cdn.pixabay.com/photo/2015/06/19/21/24/the-road-815297__340.jpg"
            />
          </picture>
          <div className="form__row">
            <label>Kategoria:</label>
            <select required>
              <option selected="selected" disabled>
                Wybierz kategorie
              </option>
              <option value="Sport">Sport</option>
              <option value="Muzyka">Muzyka</option>
              <option value="Film">Film</option>
              <option value="Wolontariat">Wolontariat</option>
              <option value="Odpowiednie dla dzieci">
                Odpowiednie dla dzieci
              </option>
            </select>
          </div>
          <button
            className="addEventBtn"
            onClick={() => props.eventModalHandler()}
          >
            Dodaj wydarzenie
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
