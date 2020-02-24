import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  vus: 500,
  duration: "30s",
}


 
// ---------------------------------------------------------------------------------  GET LOAD TEST

// export default function() {
//   var pid = Math.floor(Math.random() * 10000000)
//   let res = http.get(`http://localhost:3004/property/${pid}/reservation`);
//   check(res, {
//     "status was 200": (r) => r.status == 200
//   });
//   sleep(0.05);
// };



// ---------------------------------------------------------------------------------  POST LOAD TEST

export default function() {
  let userData = {
    uid: Math.floor(Math.random() * 1000000),
    pid: Math.floor(Math.random() * 10000000),
    startdate: 'Thu Aug 6 2020',
    enddate: 'Sat Aug 8 2020',
    numadult: 2,
    numchildren: 0,
    numinfants: 0,
  }
  var payload = JSON.stringify(userData);
  var params =  { headers: { "Content-Type": "application/json" } }
  let res = http.post(`http://localhost:3004/property/${userData.pid}/reservation`, payload, params);
  check(res, {
    "status was 200 or 409": (r) => r.status !== 500
  });
  sleep(0.001);
};

