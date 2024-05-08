/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const needle = require('needle');

const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = body.ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  needle.get(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null)
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }
    body = JSON.parse(body);
    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    } 
    const ipCoords = {
      myIpLatitude: body.latitude,
      myIpLongitude: body.longitude
    }
    callback(null, ipCoords);
  });
 
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  needle.get(url, (error, response, body) => {
    if (error) {
      return callback(error, null)
    }
    body = JSON.parse(body); 
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching the Fly Over Times: ${body}`), null);
      return;
    }
    const responseFlyOver = body.response;
    callback(null, responseFlyOver);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
