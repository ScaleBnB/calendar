**Reservation API Documentation**
----

* **URL**: _/reservation/:reservationId_
    *  **Description:** Route to handle retrieving a reservation for a given id (in progress)
    *  **Method:**_`GET`_
    *  **Route Parameters:**`reservationId=[integer]`
    *  **Query Parameters:**`false`
    *  **Body:**`false`

* **URL**: _/reservation_
    *  **Description:** Route to handle inserting a new reservation
    *  **Method:**_`POST`_
    *  **Route Parameters:**`false`
    *  **Query Parameters:**`false`
    *  **Body:** `userId=[integer]` `addressId=[integer]` `startDate=[date]` `endDate=[date]` `guestCount=[integer]`

* **URL**: _/reservation/:reservationId_
    *  **Description:** Route to handle updating an already existing reservation 
    *  **Method:**_`PATCH`_
    *  **Route Parameters:**`reservationId=[integer]`
    *  **Query Parameters:**`false`
    *  **Body:** `userId=[integer]` `addressId=[integer]` `startDate=[date]` `endDate=[date]` `guestCount=[integer]` 

* **URL**: _/reservation/:reservationId_
    *  **Description:** Route to handle deleting a new reservation
    *  **Method:**_`DELETE`_
    *  **Route Parameters:**`reservationId=[integer]`
    *  **Query Parameters:**`false`
    *  **Body:** `false` 
