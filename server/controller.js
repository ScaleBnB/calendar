var models = require('./models/index.js'); 

module.exports = {
  reservation : {
    // Get all reservations associated with a specific property 
    get : (req, res) => {
      models.reservations.get(req.params.propertyId, (e, data) => {
        if (e) {
          res.sendStatus(500);
        } else {
          res.send(data);
        }
      })
    },
    // Insert a new reservation for a specific property
    post : (req, res) => {
      /*
        this data would come from FE theoretically
        (userId, startDate, endDate, guestCount, numAdults, numChildren, numInfants)
      */
     // req.body.data for proxy, req.body 
      models.reservations.post(req.body.data, (e) => {
        if (e && e.message === 'RES_CONFLICT') {
          res.sendStatus(409);
        } else if (e) {
          console.log(e);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      })
    },
    // Update a reservation for a specific property and given reservationId
    patch : (req, res) => {
      /*
        this data would come from FE theoretically
        (userId, startDate, endDate, guestCount, numAdults, numChildren, numInfants)
      */
      const params = { 
        id: req.params.reservationId,
        pid: req.params.propertyId,
        startdate: 'Sun Mar 15 2020',
        enddate: 'Fri Mar 20 2020',
        numadult: 2,
        numchildren: 0,
        numinfants: 0,
      }
      models.reservations.patch(params, (e) => {
        if (e && e.message === `RES_CONFLICT`) {
          res.sendStatus(409);
        } else if (e) {
          res.sendStatus(500);
        }
        else {
          res.sendStatus(202);
        }
      })
    },
    // Delete a reservation for a specific property and given reservationId
    delete : (req, res) => {
      const params = {
        id: req.params.reservationId
      }
      models.reservations.delete(params, (e) => {
        if (e) {
          res.sendStatus(500);
        } else {
          res.sendStatus(204);
        }
      })
    }
  }
}