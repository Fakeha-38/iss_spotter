// // index.js

// // The code below is temporary and can be commented out.
// const { fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// // fetchCoordsByIP('162.245.144.188', (error, coordinates) => {
// //   if (error) {
// //     console.log("It didn't work!" , error);
// //     return;
// //   }

// //   console.log('It worked! Returned coordinates:' , coordinates);
// // });
// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, response) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! The satellite will Fly over on these times: ', response);
// });


const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});