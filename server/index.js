const express = require('express');
const app = express();
const db = require('./db');
var controller = require('./controller.js');

// middleware:
var morgan = require('morgan');
var parser = require('body-parser')

// apply middlware
app.use(morgan('dev'));
app.use(parser.json());

const path = require('path');

const PORT = 3001;

// Serve static files. Any requests for specific files will be served if they exist in the provided folder
app.use(express.static(path.join(__dirname, '../client/dist')));
// Start the server on the provided port
app.listen(PORT, () => console.log('Listening on port: ' + PORT));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/month', (req, res) => {
    //console.log('query', req.query);
    var params = req.query;
    //res.sendStatus(200);
    db.getMonthAvalibility(params, (err, data) => {
      if(err) {
        console.log(`error @ getMonthAvalibility`);
        res.sendStatus(404);
      } else {
        console.log('data @ index', data);
        var individualDayArr = [];
        data.forEach(item => {
          var startDate = item.startDate;
          var endDate = item.endDate;
          console.log(item.startDate, item.endDate);
      
          while (startDate <= endDate) {
            let indDate = startDate.toISOString().split("T")[0];
            individualDayArr.push(indDate);
            startDate.setDate(startDate.getDate() + 1);
          }
        });

        let month_year = `${params.year}-${params.month}`;
        var a = individualDayArr.filter(item => item.includes(month_year));

        console.log('filtered', a);
        res.json(a);
      }
    });
  });

  /*
    Route to handle retrieving all reservations for a given property 
      - get req parameters (should be an addressId)
      - send back all relevant reservation information
      - should be similar to legacy route
  */
  app.get('/reservation/:reservationId', controller.reservation.get);

  /*
    Route to handle retrieving all reservations for a given user
      - get req parameters 
      - send back all reservations associated with a specific userId
  */
  app.get('/user/:userid/reservation', controller.reservation.get);


  /* 
    Route to handle inserting a new reservation
      - get req parameters (addressId, userId, startDate, endDate, guestCount)
      - send back if insert was successful
  */
  app.post('/reservation', controller.reservation.post);

  /*
    Route to handle updating a new reservation
      - get req parameters (addressId, userId, startDate, endDate, guestCount)
      - send back if update was successful
  */
  app.put('/reservation/:id', controller.reservation.put);

  /*
    Route to handle deleting a new reservation
      - get req parameters (reservationId)
      - send back if delete was successful
  */
  app.delete('/reservation/:id', controller.reservation.delete);

