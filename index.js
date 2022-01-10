const REQ_URL =
  "https://api.weatherflow.com/wxengine/rest/spot/getSpotDetailSetByZoomLevel?lat_min=33.82&lat_max=34.18&lon_min=-119.13&lon_max=-117.93&zoom=11&wf_token=d24d7c08a1e0136dca93e86cd38455a4&units_wind=mph&units_temp=f&units_distance=mi";
const AIR_TEMP_INDEX = 7;
const HUMIDITY_INEDX = 15;
const PERFECTION_INDICATOR = -1;
const TEMPERATURE = "Temperature";
const HUMIDITY = "Humidity";
const PERFECTION_INDEX = "Perfection Index";
const PERFECT_TEMP = 75;
const PERFECT_HUMIDITY = 35;
const NO_DATA = "No Data";
const Q_MARK_URL =
  "https://music-web-app-songs.s3.us-east-2.amazonaws.com/image843.png";

let map;
let markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.052, lng: -118.343 },
    zoom: 10,
  });
}

function calculatePerfectionIndex(spot) {
  const temp = getPointData(spot, AIR_TEMP_INDEX);
  const humidity = getPointData(spot, HUMIDITY_INEDX);
  if (temp === NO_DATA || humidity === NO_DATA) {
    return NO_DATA;
  }
  const tempOffset = (temp / PERFECT_TEMP / PERFECT_TEMP) * 10;
  const humidityOffset = (humidity / PERFECT_HUMIDITY / PERFECT_HUMIDITY) * 3;
  return Math.round((1 - tempOffset - humidityOffset) * 100).toString() + "%";
}

function getPointData(spot, pointDataIndex) {
  if (pointDataIndex !== PERFECTION_INDICATOR) {
    return (
      spot?.stations[0]?.data_values[0][pointDataIndex]?.toString() ?? NO_DATA
    );
  } else {
    return calculatePerfectionIndex(spot);
  }
}

function updatePoints(pointDataIndex) {
  // remove any existing points
  markers.forEach((marker) => {
    marker.setMap(null);
  });
  markers = [];

  axios
    .get(REQ_URL)
    .then((response) => {
      response.data.spots.forEach((spot) => {
        const pointData = getPointData(spot, pointDataIndex);
        let marker = new google.maps.Marker({
          position: { lat: spot.lat, lng: spot.lon },
          title: pointData,
          animation: google.maps.Animation.DROP,
          icon: pointData === NO_DATA ? Q_MARK_URL : "",
        });
        markers.push(marker);
        marker.setMap(map);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

// initial load with air temp
updatePoints(AIR_TEMP_INDEX);

// event listener for drop down menu
window.onload = function () {
  document.getElementById("Weather-options").onchange = function () {
    if (this.value === TEMPERATURE) {
      updatePoints(AIR_TEMP_INDEX);
    } else if (this.value === HUMIDITY) {
      updatePoints(HUMIDITY_INEDX);
    } else if (this.value === PERFECTION_INDEX) {
      updatePoints(PERFECTION_INDICATOR);
    }
  };
};
