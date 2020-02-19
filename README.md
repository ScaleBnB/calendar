**Reservation API Documentation**
----

* **URL**: _/property/:propertyId/reservation_
  *  **Description:** Route to retrieve all reservations for a specific property
  *  **Method:**_`GET`_
  *  **Route Parameters:** `propertyId=[integer]`
  *  **Query Parameters:** `false`
  *  **Body:** `false`

* **URL**: _/property/:propertyId/reservation_
  *  **Description:** Route to handle inserting a new reservation for a specific property
  *  **Method:**_`POST`_
  *  **Route Parameters:** `propertyId=[integer]`
  *  **Query Parameters:** `false`
  *  **Body:** `userId=[integer]` `addressId=[integer]` `startDate=[date]` `endDate=[date]` `guestCount=[integer]`

* **URL**: _/property/:propertyId/reservation/:reservationId_
  *  **Description:** Route to handle updating an already existing reservation for a specific property
  *  **Method:**_`PATCH`_
  *  **Route Parameters:** `propertyId=[integer]` `reservationId=[integer]`
  *  **Query Parameters:** `false`
  *  **Body:** `userId=[integer]` `addressId=[integer]` `startDate=[date]` `endDate=[date]` `guestCount=[integer]` 

* **URL**: _/property/:propertyId/reservation/:reservationId_
  *  **Description:** Route to handle deleting a reservation for a specific property
  *  **Method:**_`DELETE`_
  *  **Route Parameters:** `propertyId=[integer]` `reservationId=[integer]`
  *  **Query Parameters:** `false`
  *  **Body:** `false` 
