// iss_promised.js
const needle = require('needle');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return needle('get','https://api.ipify.org?format=json')
  .then((response) => {
    const ip = response.body.ip;
    return ip;
  });
};

//a function fetching the coordinates by giving the ip address returned from previous function
const fetchCoordsByIP = function(ip) {
  return needle(`http://ipwho.is/${ip}`)
  .then((response) => {
    const body = response.body;
    const ipCoords = {
      latitude: body.latitude,
      longitude: body.longitude
    };
    return ipCoords;
  });
};

//a function returning flyover times for particular coords (returned from the previous function)
const fetchISSFlyOverTimes = function(coords) {
  const { latitude: lat, longitude: lon } = coords;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`;
  return needle(url)
  .then((response) => {
    const timeArr = response.body.response;
    return timeArr;
  });
};
//a function calling all the promises to return the time array
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then((ip) => {
    return fetchCoordsByIP(ip);
  })
  .then((coords) => {
    return fetchISSFlyOverTimes(coords);
  })
  .then((timeArr) => {
    return timeArr;
  })
};                 
module.exports = { nextISSTimesForMyLocation };