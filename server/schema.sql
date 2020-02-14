DROP DATABASE IF EXISTS calendar;
CREATE DATABASE calendar;

CREATE TABLE user (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  owner BOOLEAN NOT NULL,
);

CREATE TABLE property (
  id SERIAL PRIMARY KEY,
  ownerId varchar(100) NOT NULL,
  homeAddr varchar(255) NOT NULL,
  FOREIGN KEY (ownerId) REFERENCES user(id)
);

CREATE TABLE reservation (
  id SERIAL PRIMARY KEY,
  uId INT NOT NULL,
  pId INT NOT NULL,
  startDate DATE  NOT NULL,
  endDate DATE NOT NULL,
  guestCount INT NOT NULL,
  basePrice INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (uId) REFERENCES user(id),
  FOREIGN KEY (pId) REFERENCES property(id)
);

-- mysql -u root < server/schema.sql