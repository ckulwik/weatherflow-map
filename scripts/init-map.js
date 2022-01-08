const reqUrl =
  "https://api.weatherflow.com/wxengine/rest/spot/getSpotDetailSetByZoomLevel?lat_min=33.82&lat_max=34.18&lon_min=-119.13&lon_max=-117.93&zoom=11&wf_token=d24d7c08a1e0136dca93e86cd38455a4&units_wind=mph&units_temp=f&units_distance=mi";

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.052, lng: -118.343 },
    zoom: 9,
  });

  // var marker = new google.maps.Marker({
  //   position: { lat: 34.052, lng: -118.243 },
  //   title: "Location Place or Anything that you want to tooltip while hovering",
  // });

  // marker.setMap(map);
}

axios
  .get(reqUrl)
  .then((response) => {
    response.data.spots.forEach((spot) => {
      var marker = new google.maps.Marker({
        position: { lat: spot.lat, lng: spot.lon },
        title: spot.name,
      });
      console.log(spot);

      marker.setMap(map);
    });
  })
  .catch((error) => {
    console.log(error);
  });
