DROP DATABASE IF EXISTS calendar;
CREATE DATABASE calendar; 

\c calendar

CREATE TABLE Users (
  id SERIAL,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE Property (
  id SERIAL,
  ownerId INT NOT NULL,
  address varchar(255) NOT NULL,
  baseRate FLOAT NOT NULL,
  reviewScore FLOAT NOT NULL,
  reviewCount INT NOT NULL,
  minStayLength INT NOT NULL,
  cleaningFee INT NOT NULL,
  serviceFee INT NOT NULL,
  maxAdults INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (ownerId) REFERENCES Users(id)
);

CREATE TABLE Reservation (
  id SERIAL,
  uId INT NOT NULL,
  pId INT NOT NULL,
  startDate varchar(20)  NOT NULL,
  endDate varchar(20) NOT NULL,
  numAdult INT NOT NULL,
  numChildren INT NOT NULL,
  numInfants INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (uId) REFERENCES Users(id),
  FOREIGN KEY (pId) REFERENCES Property(id)
);

-- mysql -u root < server/schema.sql