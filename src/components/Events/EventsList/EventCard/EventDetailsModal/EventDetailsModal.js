import React, { useEffect, useState, useContext } from "react";
import {
  postImageToImgur,
  datePicker,
  selectedDates,
  googleMaps as initAutocomplete,
} from "modules/modules";
import { NewEventContext } from "../../../NewEventStore/NewEventStore";
import CircularProgress from "@material-ui/core/CircularProgress";
import "components/Events/eventModal.css";

export const EventDetailsModal = (props) => {
  let [newEvent, setNewEvent] = useContext(NewEventContext);
  let [isCircle, setIsCircle] = useState(false);
  let [eventState, setEventState] = useState({ ...props.event });
  let imgContainer;
  let tempImgLink = props.event.eventImgLink;
  let isImgChanged = false;

  useEffect(() => {
    //initAutoComplete takes 2 arguments only in EventDetailsModal
    initAutocomplete(false, props.event.eventCoords);
    datePicker();
    //window.datePicker() it working temporary
  }, []);
  const readFile = (file, img) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  };
  let saveDataForm = (imgLink = false) => {
    newEvent[props.indexInArray] = {
      eventUniqueKey: props.event.eventUniqueKey,
      eventName: document.getElementById("eventName").value,
      eventDescription: document.getElementById("eventDescription").value,
      eventPromoter: document.getElementById("eventPromoter").value,
      eventLocality: document.getElementById("eventLocality").value,
      eventCoords: {
        lat: document.getElementById("latFld").value,
        lng: document.getElementById("lngFld").value,
      },
      eventDate: selectedDates.startDate.fullDate
        ? JSON.parse(JSON.stringify(selectedDates))
        : props.event.eventDate,
      eventImgLink: imgLink ? imgLink : tempImgLink,
      eventImageObj: JSON.parse(
        JSON.stringify(document.getElementById("eventImage").value)
      ),
      eventCategory: document.getElementById("eventCategory").value,
    };

    setNewEvent([...newEvent]);
    props.setIsChanged(true);
  };
  const handleChange = (val, attr) => {
    setEventState({ ...eventState, [attr]: val });
  };
  return (
    <div className="eventDetailsModal myOwnModal">
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
        className="closeEventModal"
        onClick={(e) => {
          e.stopPropagation();
          props.detailsOpenHandler();
        }}
      >
        X
      </button>
      <div className="addEventModalContent myOwnModalContent">
        <h3>
          Zapoznaj się ze szczegółami wydarzenia. Możesz je także edytować.
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isImgChanged) {
              postImageToImgur(imgContainer, setIsCircle).then((link) => {
                saveDataForm(link);
                props.detailsOpenHandler();
              });
            } else {
              saveDataForm();
              setIsCircle(true);
              setTimeout(() => {
                setIsCircle(false);
                props.detailsOpenHandler();
              }, 1100);
            }
          }}
        >
          <div className="form__row">
            <label>Nazwa wydarzenia:</label>
            <input
              id="eventName"
              type="text"
              placeholder={props.event.eventName}
              value={eventState.eventName}
              onChange={(e) => handleChange(e.target.value, "eventName")}
              maxLength="64"
              required
            />
          </div>
          <div className="form__row">
            <label>Opis wydarzenia:</label>
            <textarea
              id="eventDescription"
              type="text"
              placeholder={props.event.eventDescription}
              value={eventState.eventDescription}
              onChange={(e) => handleChange(e.target.value, "eventDescription")}
              required
            ></textarea>
          </div>
          <div className="form__row">
            <label>Nazwa organizatora:</label>
            <input
              id="eventPromoter"
              type="text"
              placeholder={props.event.eventPromoter}
              value={eventState.eventPromoter}
              onChange={(e) => handleChange(e.target.value, "eventPromoter")}
              required
            />
          </div>
          <div className="form__row">
            <label>Data:</label>
            <input
              type="text"
              name="date"
              id="date"
              className="eventDate"
              placeholder={
                props.event.eventDate.startDate.fullDate +
                " - " +
                props.event.eventDate.endDate.fullDate
              }
              value={
                props.event.eventDate.startDate.fullDate +
                " - " +
                props.event.eventDate.endDate.fullDate
              }
              onChange={(e) => setEventState(e.target)}
              required
            />
          </div>
          <div className="form__row">
            <label>Kategoria:</label>
            <select
              id="eventCategory"
              placeholder={props.event.eventCategory}
              defaultValue={props.event.eventCategory}
              required
            >
              <option
                placeholder={props.event.eventCategory}
                value={eventState.eventCategory}
                disabled
                hidden
              >
                {props.event.eventCategory}
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
                onChange={(event) => {
                  const img = document.getElementById("imagePreview");
                  imgContainer = event.target.files[0];
                  readFile(event.target.files[0], img);
                  isImgChanged = true;
                }}
              />
              <img id="imagePreview" src={props.event.eventImgLink} />
            </picture>
          </div>
          <div className="form__row image-container"></div>
          <div className="form__row">
            <label>Lokalizacja miejscowość:</label>
            <input
              id="eventLocality"
              type="text"
              placeholder="*"
              value={props.event.eventLocality}
              disabled
            />
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
          <input
            type="text"
            id="latFld"
            defaultValue={parseFloat(props.event.eventCoords.lat)}
            className="latFld"
          />
          <input
            type="text"
            id="lngFld"
            defaultValue={parseFloat(props.event.eventCoords.lng)}
            className="lngFld"
          />
          <input
            id="latlng"
            className="latlng"
            type="text"
            defaultValue="40.714224,-73.961452"
          />
          <button className="addEventBtn">Zmień wydarzenie</button>
        </form>
      </div>
    </div>
  );
};
