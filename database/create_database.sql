CREATE DATABASE airbnb_clone;

USE airbnb_clone;

-- User table
CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    birthday DATE,
    gender BOOLEAN,
    avatar VARCHAR(255),
    refreshToken VARCHAR(255),
    role VARCHAR(50)
);

-- Location table
CREATE TABLE Location (
    id INT PRIMARY KEY AUTO_INCREMENT,
    locationName VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    image VARCHAR(255)
);

-- Listing table
CREATE TABLE Listing (
    id INT PRIMARY KEY AUTO_INCREMENT,
    roomName VARCHAR(255) NOT NULL,
    guests INT NOT NULL,
    bedrooms INT NOT NULL,
    beds INT NOT NULL,
    bathrooms INT NOT NULL,
    description TEXT,
    price INT NOT NULL,
    washingMachine BOOLEAN,
    ironingBoard BOOLEAN,
    tv BOOLEAN,
    airConditioner BOOLEAN,
    wifi BOOLEAN,
    kitchen BOOLEAN,
    parking BOOLEAN,
    pool BOOLEAN,
    iron BOOLEAN,
    locationId INT,
    image VARCHAR(255),
    FOREIGN KEY (locationId) REFERENCES Location(id)
);

-- Reservation table
CREATE TABLE Reservation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    listingId INT NOT NULL,
    arrivalDate DATETIME NOT NULL,
    departureDate DATETIME NOT NULL,
    numberOfGuests INT NOT NULL,
    userId INT NOT NULL,
    FOREIGN KEY (listingId) REFERENCES Listing(id),
    FOREIGN KEY (userId) REFERENCES User(id)
);

-- Comment table
CREATE TABLE Comment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    listingId INT NOT NULL,
    userId INT NOT NULL,
    commentDate DATE,
    content TEXT,
    rating INT,
    FOREIGN KEY (listingId) REFERENCES Listing(id),
    FOREIGN KEY (userId) REFERENCES User(id)
);
