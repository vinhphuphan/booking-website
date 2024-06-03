**Booking Website**

Welcome to the backend repository for the booking website built with NestJS. This backend server provides the necessary APIs to support the booking functionalities of the website.

<p align="center"><img style="align: center;" src="https://raw.githubusercontent.com/vinhphuphan/booking-website/main/client/hotel_images/Screenshot%202024-06-03%20225617.png" width=full></p>

**Database**

The `database` folder contains schema design and SQL code to design and implement the database.  Here's an overview of the main tables in our database:

* `user`: Stores user information such as name, email, password, and other relevant details.
* `listing`: Contains details about hotel listings, including room name, description, price, amenities, and location.
* `comment`: Contains information about available food items such as name, price, and description.
* `reservation`: Allows users to book the hotels. Contains arrivalDate, departureDate , number of guest and user who books the hotel.
* `location`: Stores information about different locations, including the location name, city, country, and associated hotel listings.
