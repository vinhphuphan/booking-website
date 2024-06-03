USE airbnb_clone;

-- Insert data into User table
INSERT INTO User (name, email, password, phone, birthday, gender, role) VALUES
('John Doe', 'johndoe@example.com', 'password123', '123-456-7890', '1990-01-01', TRUE, 'user'),
('Jane Smith', 'janesmith@example.com', 'password456', '987-654-3210', '1985-05-15', FALSE, 'user'),
('Admin User', 'admin@example.com', 'adminpassword', '555-555-5555', '1970-12-31', TRUE, 'admin');

-- Insert data into Location table
INSERT INTO Location (locationName, city, country, image) VALUES
('Downtown Apartment', 'New York', 'USA', 'image1.jpg'),
('Beach House', 'Los Angeles', 'USA', 'image2.jpg'),
('Mountain Cabin', 'Denver', 'USA', 'image3.jpg');

-- Insert data into Listing table
INSERT INTO Listing (roomName, guests, bedrooms, beds, bathrooms, description, price, washingMachine, ironingBoard, tv, airConditioner, wifi, kitchen, parking, pool, iron, locationId, image) VALUES
('Cozy Apartment', 4, 2, 2, 1, 'A cozy apartment in the heart of the city', 150, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, 1, 'apartment.jpg'),
('Luxury Beach House', 8, 4, 4, 3, 'A luxurious beach house with ocean views', 500, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, 2, 'beachhouse.jpg'),
('Rustic Mountain Cabin', 6, 3, 3, 2, 'A rustic cabin in the mountains', 300, FALSE, TRUE, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, 3, 'cabin.jpg');

-- Insert data into Reservation table
INSERT INTO Reservation (listingId, arrivalDate, departureDate, numberOfGuests, userId) VALUES
(1, '2024-06-01 14:00:00', '2024-06-07 10:00:00', 4, 1),
(2, '2024-07-15 15:00:00', '2024-07-20 11:00:00', 6, 2),
(3, '2024-08-10 16:00:00', '2024-08-17 12:00:00', 5, 1);

-- Insert data into Comment table
INSERT INTO Comment (listingId, userId, commentDate, content, rating) VALUES
(1, 1, '2024-06-08', 'Great location and very comfortable.', 5),
(2, 2, '2024-07-21', 'Amazing views and very spacious!', 4),
(3, 1, '2024-08-18', 'Loved the cabin, very peaceful and relaxing.', 5);
