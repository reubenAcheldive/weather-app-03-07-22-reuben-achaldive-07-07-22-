export const getCurrentGeoLocation = (currentLocation: any) => {
  if (currentLocation) return;
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

function successCallback(position: GeolocationPosition) {
const {latitude,longitude} = position.coords;
console.log(latitude, longitude)
}
function errorCallback() {
  return console.error("ERROR");
}
