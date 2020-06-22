function getCityLocation(cityLocation) {
  document.getElementById("eventLocality").value = cityLocation;
}
export default function initAutocomplete(isNavigatorNeed = true, eventCoords) {
  const google = window.google;
  let infoWindow = new google.maps.InfoWindow();
  var geocoder = new google.maps.Geocoder();
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
    mapTypeId: "roadmap",
  });
  var pos;
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        if (isNavigatorNeed) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        } else {
          pos = {
            lat: parseFloat(eventCoords.lat),
            lng: parseFloat(eventCoords.lng),
          };
        }
        document.getElementById("latFld").value = pos.lat;
        document.getElementById("lngFld").value = pos.lng;

        marker.setPosition(pos);
        infoWindow.setContent("Location found.");

        infoWindow.open(map);

        geocodeLatLng(geocoder, map, infoWindow, marker, pos);

        map.setCenter(pos);
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  // Create the search box and link it to the UI element.
  var input = document.getElementById("pac-input");
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function () {
    searchBox.setBounds(map.getBounds());
  });

  var marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: { lat: 59.327, lng: 18.067 },
  });

  // add a click event handler to the map object
  google.maps.event.addListener(map, "click", function (event) {
    var geocoder = new google.maps.Geocoder();

    // display the lat/lng in your form's lat/lng fields
    document.getElementById("latFld").value = event.latLng.lat();
    document.getElementById("lngFld").value = event.latLng.lng();

    // place a marker
    placeMarker(event.latLng, geocoder, infoWindow, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    var marker_position = event.latLng;
    toggleBounce();
    marker.setPosition(marker_position);
  });

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", function () {
    var places = searchBox.getPlaces();
    map.setCenter(places[0].geometry.location);
    document.getElementById("latFld").value = places[0].geometry.location.lat();
    document.getElementById("lngFld").value = places[0].geometry.location.lng();
    if (places.length === 0) {
      return;
    }

    // For each place, get the icon, name and location.

    var marker_position = places[0].geometry.location;

    marker.setPosition(marker_position);
    //
    geocodeLatLng(geocoder, map, infoWindow, marker, {
      lat: places[0].geometry.location.lat(),
      lng: places[0].geometry.location.lng(),
    });
    //
    toggleBounce();
    // map.fitBounds(bounds);
  });
  function placeMarker(location, geocoder, infoWindow, pos) {
    marker.position = location;
    marker.map = map;

    geocodeLatLng(geocoder, map, infoWindow, marker, pos);
    map.setCenter(location);
  }

  function toggleBounce() {
    window.setTimeout(function () {
      marker.setAnimation(null);
    }, 800);
    marker.setAnimation(google.maps.Animation.BOUNCE);
  } //
}
function geocodeLatLng(geocoder, map, infowindow, marker, pos) {
  var input = document.getElementById("latlng").value;
  var latlngStr = input.split(",", 2);
  var latlng = {
    lat: pos.lat,
    lng: pos.lng,
  };

  geocoder.geocode({ location: latlng }, function (results, status) {
    if (status === "OK") {
      if (results[0]) {
        map.setZoom(11);

        let filtered = results[0].address_components.filter((element) => {
          for (let i in element.types) {
            return element.types[i] === "locality";
          }
        });
        getCityLocation(filtered[0].long_name);

        infowindow.setContent(results[0].formatted_address);
        infowindow.open(map, marker);
      } else {
        window.alert("No results found");
      }
    } else {
      window.alert("Geocoder failed due to: " + status);
    }
  });
}
