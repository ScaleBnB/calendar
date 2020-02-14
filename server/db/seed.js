// var db = require("./index.js").connection;
var faker = require("faker");

const PRIMARY_RECORDS_COUNT = 1000000;
/*
  create 1M data for address table
*/

function buildAddressSeed() {
  var address = [];
  console.time('address_build');
  for (let i = 0; i < PRIMARY_RECORDS_COUNT; i++) {
    var obj = {}; 
    var streetAddr = faker.address.streetAddress();
    var city = faker.address.city();
    var state = faker.address.state();
    var zip = faker.address.zipCode();
    var ownerId = faker.random.number({min: 1, max: 150000});
    var baseRate = faker.finance.amount(15,1000,2,"$");
    obj['ownerId'] = ownerId; 
    obj['address'] = streetAddr + ", " + city + ", " + state + " " + zip + " ";
    obj['baseRate'] = baseRate; 
    address.push(obj);
  }
  console.timeEnd('address_build');
}

function buildUserSeed() {
  var user = [];
  console.time('user_build');
  for (let i = 0; i < PRIMARY_RECORDS_COUNT/500; i++) {
    var obj = {}; 
    var userName = faker.name.findName();
    var owner = faker.random.boolean();
    obj['userName'] = userName;
    obj['owner'] = owner;
    user.push(obj);
  }
  console.timeEnd('user_build');
}

console.time('total_time');
buildAddressSeed();
buildUserSeed(); 
console.timeEnd('total_time');