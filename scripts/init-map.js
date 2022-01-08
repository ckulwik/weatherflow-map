let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.052, lng: -118.243 },
    zoom: 8,
  });
}
