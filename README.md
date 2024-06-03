<h2 align="center">Booking Website API</h2>

👋 Welcome to the backend repository for the booking website built with NestJS. This backend server provides the necessary APIs to support the booking functionalities of the website.

<p align="center"><img style="align: center;" src="https://raw.githubusercontent.com/vinhphuphan/booking-website/main/client/hotel_images/Screenshot%202024-06-03%20225617.png" width=full></p>

**Database**

The `database` folder contains schema design and SQL code to design and implement the database.  Here's an overview of the main tables in our database:

* `user`: Stores user information such as name, email, password, and other relevant details.
* `listing`: Contains details about hotel listings, including room name, description, price, amenities, and location.
* `comment`: Contains information about available food items such as name, price, and description.
* `reservation`: Allows users to book the hotels. Contains arrivalDate, departureDate , number of guest and user who books the hotel.
* `location`: Stores information about different locations, including the location name, city, country, and associated hotel listings.

**⚙️ Features**

* User Authentication
* Hotel Listings
* Reservation Management
* Commenting and Rating
* Location Information
* Image Upload
* Pagination and Filtering

**💻 Technologies Used**

[![My Skills](https://skillicons.dev/icons?i=nestjs,prisma,mysql,postman)](https://skillicons.dev)

**Setup**

1. Clone this repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=your_database_url
CLOUDINARY_URL=your_cloudinary_url
JWT_SECRET=your_jwt_secret
```
4. Replace your_database_url, your_cloudinary_url, and your_jwt_secret with your actual database URL, Cloudinary URL, and JWT secret key, respectively.

5. Start the server

```bash
npm start
```
