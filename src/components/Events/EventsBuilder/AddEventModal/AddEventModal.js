import React, { useEffect, useContext, useState } from "react";
import {
  postImageToImgur,
  datePicker,
  selectedDates,
  googleMaps as initAutocomplete,
} from "modules/modules";
import CircularProgress from "@material-ui/core/CircularProgress";
import "components/Events/eventModal.css";
import { NewEventContext } from "../../NewEventStore/NewEventStore";
import shortid from "shortid";

export const AddEventModal = (props) => {
  let [newEvent, setNewEvent] = useContext(NewEventContext);
  let [isCircle, setIsCircle] = useState(false);
  let imgContainer;

  useEffect(() => {
    initAutocomplete();
    datePicker();
  }, []);

  const readFile = (file, img) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };
  const saveDataForm = (imgLink) => {
    setNewEvent([
      ...newEvent,
      {
        eventUniqueKey: shortid.generate(),
        eventName: document.getElementById("eventName").value,
        eventDescription: document.getElementById("eventDescription").value,
        eventPromoter: document.getElementById("eventPromoter").value,
        eventLocality: document.getElementById("eventLocality").value,
        eventCoords: {
          lat: document.getElementById("latFld").value,
          lng: document.getElementById("lngFld").value,
        },
        eventDate: JSON.parse(JSON.stringify(selectedDates)),
        eventImgLink: imgLink,
        eventImageObj: JSON.parse(
          JSON.stringify(document.getElementById("eventImage").value)
        ),
        eventCategory: document.getElementById("eventCategory").value,
      },
    ]);
    props.setIsChanged(true);
  };

  return (
    <div className="addEventModal myOwnModal">
      {isCircle ? (
        <React.Fragment>
          <div className="cloud"></div>
          <div className="loadingBox">
            <div className="loadingBoxText">Trwa wysyłanie...</div>
            <CircularProgress />
          </div>
        </React.Fragment>
      ) : null}
      <button
        className="closeEventModal tooltip"
        id="closeEventModal"
        tabIndex="0"
        onClick={() => props.eventModalHandler()}
      >
        X
        <span class="tooltiptext">Naciśnij enter by zamknąć</span>
      </button>
     
      <div className="addEventModalContent myOwnModalContent">
        <h3>Dodaj nowe wydarzenie</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postImageToImgur(imgContainer, setIsCircle).then((link) => {
              saveDataForm(link);
              props.eventModalHandler();
            });
          }}
        >
          <div className="form__row">
            <label>Nazwa wydarzenia:</label>
            <input
              id="eventName"
              type="text"
              placeholder="*"
              maxLength="64"
              required
            />
          </div>
          <div className="form__row">
            <label>Opis wydarzenia:</label>
            <textarea
              id="eventDescription"
              type="text"
              placeholder="*"
              required
            ></textarea>
          </div>
          <div className="form__row">
            <label>Nazwa organizatora:</label>
            <input id="eventPromoter" type="text" placeholder="*" required />
          </div>
          <div className="form__row">
            <label>Data:</label>
            <input
              type="text"
              name="date"
              id="date"
              className="eventDate"
              placeholder="Wybierz datę rozpoczęcia oraz zakończenia wydarzenia"
              required
            />
          </div>
          <div className="form__row">
            <label>Kategoria:</label>
            <select
              id="eventCategory"
              required
              defaultValue={"Wybierz kategorie"}
            >
              <option value="" hidden placeholder="Wybierz kategorie">
                Wybierz kategorie
              </option>
              <option value="Sport">Sport</option>
              <option value="Muzyka">Muzyka</option>
              <option value="Film">Film</option>
              <option value="Wolontariat">Wolontariat</option>
              <option value="Jedzenie">Jedzenie</option>
              <option value="Impreza">Impreza</option>
              <option value="Ogrodnictwo">Ogrodnictwo</option>
              <option value="Zdrowie">Zdrowie</option>
              <option value="Taniec">Taniec</option>
              <option value="Inne">Inne</option>
              <option value="Literatura">Literatura</option>
              <option value="Komedia">Komedia</option>
              <option value="Wydarzenia religijne">Wydarzenia religijne</option>
              <option value="Welness">Welness</option>
              <option value="Odpowiednie dla dzieci">
                Odpowiednie dla dzieci
              </option>
              <option value="Jedzenie">Zakupy</option>
            </select>
          </div>
          <div className="form__row image-container">
            <label>Wybierz zdjęcie wydarzenia:</label>
            <picture>
              <input
                id="eventImage"
                type="file"
                required
                onChange={(event) => {
                  const img = document.getElementById("imagePreview");
                  imgContainer = event.target.files[0];
                  readFile(event.target.files[0], img);
                }}
              />
              <img id="imagePreview" src="no-image.png" />
            </picture>
          </div>
          <div className="form__row image-container">
            {/* <label>Wybrane zdjecie: </label>
            <picture>
              <img id="imagePreview" src="no-image.png" />
            </picture> */}
          </div>
          <div className="form__row">
            <label>Lokalizacja miejscowość:</label>
            <input id="eventLocality" type="text" placeholder="*" disabled />
          </div>
          <input
            id="pac-input"
            className="controls"
            type="text"
            placeholder="Wyszukaj w Mapach Google"
          />
          <div className="form__row map-container">
            <div id="map"></div>
          </div>
          <input type="text" id="latFld" className="latFld" />
          <input type="text" id="lngFld" className="lngFld" />
          <input id="latlng" className="latlng" type="text" />

          <button className="addEventBtn">Dodaj wydarzenie</button>
        </form>
      </div>
    </div>
  );
};
