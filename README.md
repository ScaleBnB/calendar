**Reservation API Documentation**
----

* **URL**: _/reservation/:reservationId_
    * **Method:**
      _`GET`_
    *  **URL Params**
      **Required:**
      `reservationId=[integer]`
      **Optional:**
      `N/A`
    * **Data Params**
      `N/A`
    * **Notes:** Route to handle retrieving all reservations for a given property 

* **URL**: _/user/:userid/reservation_
    * **Method:**
      _`GET`_
    *  **URL Params**
      **Required:**
      `userId=[integer]`
      **Optional:**
      `N/A`
    * **Data Params**
      `N/A`
    * **Notes:** Route to handle retrieving all reservations for a given user

* **URL**: _/reservation_
    * **Method:**
      _`POST`_
    *  **URL Params**
      **Required:**
      `N/A`
      **Optional:**
      `N/A`
    * **Data Params**
      `userId=[integer]`
      `addressId=[integer]`
      `startDate=[date]`
      `endDate=[date]`
      `guestCount=[integer]`
    * **Notes:** Route to handle inserting a new reservation

* **URL**: _/reservation/:id_
    * **Method:**
      _`PUT`_
    *  **URL Params**
      **Required:**
      `reservationId=[integer]`
      **Optional:**
      `N/A`
    * **Data Params**
      `userId=[integer]`
      `addressId=[integer]`
      `startDate=[date]`
      `endDate=[date]`
      `guestCount=[integer]`
    * **Notes:** Route to handle updating a new reservation  

* **URL**: _/reservation/:id_
    * **Method:**
      _`PUT`_
    *  **URL Params**
      **Required:**
      `reservationId=[integer]`
      **Optional:**
      `N/A`
    * **Data Params**
      `N/A`
    * **Notes:** Route to handle updating a new reservation  
