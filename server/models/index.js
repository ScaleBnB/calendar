var { pool } = require('../db/connection.js');

// helper function to validate if new reservation doesn't conflict with already existing ones
function reservationConflictExists(userStartDate, userEndDate, currRes, id) {
  var datefied = currRes.rows.map(row => [Date.parse(row.startdate), Date.parse(row.enddate), (row.id)]);
  var conflictsArr = datefied.filter(dateTuple => ((dateTuple[0] <= Date.parse(userStartDate) && Date.parse(userStartDate) <= dateTuple[1]) || 
    (dateTuple[0] <= Date.parse(userEndDate) && Date.parse(userEndDate) <= dateTuple[1]))); 
  // if conflict exists and id doesn't match row we are trying to update potentially
  if (conflictsArr.length !== 0 && conflictsArr[0][2] !== Number.parseInt(id)) {
    return true; 
  } 
  return false; 
}

module.exports = {
  reservations : {
    get : function(param, callback) {
      pool
        .query(`SELECT startdate, enddate FROM reservation WHERE pid = ${param};`)
        .then(res => callback(null, res.rows))
        .catch(e => callback(e, null));
    },

    post : function({ uid, pid, startdate, enddate, numadult, numchildren, numinfants }, callback) {
      pool
        .query(`SELECT startdate, enddate FROM reservation WHERE pid = ${pid}`)
        .then(res => {
          if (reservationConflictExists(startdate, enddate, res)) { 
            throw new Error(`RES_CONFLICT`); 
          }
          return pool.query(`INSERT INTO RESERVATION(uid, pid, startdate, enddate, numadult, numchildren, numinfants) 
            VALUES (${uid}, ${pid}, \'${startdate}\', \'${enddate}\', ${numadult}, ${numchildren}, ${numinfants});`)
        })
        .then(res => { callback(null, 'POST/ success'); })
        .catch(e => { callback(e, null); });
    },

    patch : function({ id, pid, startdate, enddate, numadult, numchildren, numinfants }, callback) {
      pool
        .query(`SELECT id, startdate, enddate FROM reservation where pid = ${pid}`)
        .then(res => {
          if (reservationConflictExists(startdate, enddate, res, id)) { 
            throw new Error(`RES_CONFLICT`); 
          }
          return pool.query(`UPDATE reservation SET startdate=\'${startdate}\', enddate=\'${enddate}\', numadult=${numadult},
          numchildren=${numchildren}, numinfants=${numinfants} WHERE id = ${id};`)
        })
        .then(res => { callback(null, 'PATCH/ success')})
        .catch(e => { callback(e, null) });
    },

    delete : function({ id }, callback) {
      pool
        .query(`DELETE FROM reservation where id=${id}`)
        .then(res => { callback(null, 'DELETE/ success')})
        .catch(e => callback(e, null));
    }
  }
}