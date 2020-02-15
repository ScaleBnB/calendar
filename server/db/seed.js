// var db = require("./index.js").connection;
var faker = require('faker');
var Promise = require('bluebird');
const { Pool } = require('pg');

const pool = new Pool({
  "host": "localhost",
  "port": 5432,
  "user":"sanjeevdatta",
  "database" : "calendar",
  "max": 100,
  "connectionTimeoutMillis" : 0,
  "idleTimeoutMillis": 0
})

const PRIMARY_RECORDS_COUNT = Math.pow(10, 7);
const USER_RECORDS_COUNT = Math.pow(10, 6);
const RESERVATION_RECORDS_COUNT = 2 * Math.pow(10, 6);

function buildUserChunk() {
  var user = [];
  for (let i = 0; i < ( USER_RECORDS_COUNT / Math.pow(10, 3) ); i++) {
    var obj = {}; 
    obj['name'] = `'${faker.name.title()}'`;
    user.push(obj);
  }
  return user; 
}

function buildAddressChunk() {
  var address = [];
  console.time('address_build');
  // PRIMARY_RECORDS_COUNT / Math.pow(10, 3)
  for (let i = 0; i < ( 5000 ); i++) {
    var obj = {}; 
    var streetAddr = faker.address.streetAddress();
    var city = faker.address.city();
    var state = faker.address.state();
    var zip = faker.address.zipCode();
    obj['ownerId'] = faker.random.number({min: 1, max: USER_RECORDS_COUNT });
    obj['address'] = `'${streetAddr} ${city} ${state} ${zip}'`;
    obj['baseRate'] = faker.finance.amount(15,1000,2); 
    obj['reviewScore'] = faker.finance.amount(1.00,5.00, 2);
    obj['reviewCount'] = faker.random.number({ min: 10, max: 500 }); 
    obj['minStayLength'] = faker.random.number({ min: 1, max: 14 });
    obj['cleaningFee'] = faker.random.number({ min: 5, max: 25});
    obj['serviceFee'] = faker.random.number({ min: 5, max: 50 }); 
    obj['maxAdults'] = faker.random.number({ min: 1, max: 7 });
    address.push(obj);
  }
  console.timeEnd('address_build');
  return address; 
}

function buildReservationChunk() {
  var reservation = [];
  console.time('reservation_build');
  for (let i = 0; i < ( PRIMARY_RECORDS_COUNT / Math.pow(10, 2) ); i++) {
    var obj = {};
    obj['userId'] = faker.random.number({min: 1, max: PRIMARY_RECORDS_COUNT / 10^3});
    obj['startDate'] = faker.date.recent();
    obj['endDate'] = faker.date.soon(); 
    obj['numAdult'] = faker.random.number({min: 1, max: 6}); 
    obj['numChildren'] = faker.random.number({min: 0, max: 1});
    obj['numInfants'] = faker.random.number({min: 0, max: 1});
    reservation.push(obj);
  }
  console.timeEnd('reservation_build');
}

function convertSeedRecordsToString(arrayOfRecords) {
  var header = Object.keys(arrayOfRecords[0]).join(',');
  var retStr = '';
  arrayOfRecords.forEach(record => {
      var currRow = '(';
      for (key in record) {
        currRow += record[key] + ',';
      }
      retStr += currRow.slice(0, currRow.length - 1) + '),\n';
  });
  // remove the extra ',\n' at end
  return [header, retStr.slice(0, retStr.length-2)]; 
}

async function insertAll(tableName, buildCallback, chunkSize) {
  console.time(`${tableName}_insert`);
  var retArr = []; 
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (var idx = 0; idx < chunkSize; idx++) {
      var insertValues = convertSeedRecordsToString(buildCallback());
      const users = await client.query(`INSERT INTO ${tableName} (${insertValues[0]}) VALUES ${insertValues[1]}`);
      retArr.push(users.length);
    }
    await client.query('COMMIT');
  }
  catch (err) {
    client.query('ROLLBACK');
    return 'Error during user insertion'
  }
  finally {
    client.release(); 
    console.time(`${tableName}_insert`);
    return 'Successfully inserted users'; 
  }
}

// insertAll('users', buildUserChunk, Math.pow(10, 3)); 
insertAll('property', buildAddressChunk, Math.pow(10, 3));
pool.end();   