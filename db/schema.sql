CREATE DATABASE reviews;
USE reviews;

CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  author_name varchar(50) NOT NULL,
  author_photo varchar(100) NOT NULL,
  rating int NOT NULL,
  purchased boolean NOT NULL,
  body varchar(1000) NOT NULL,
  photo varchar(100) NOT NULL,
  prodId varchar(10) NOT NULL,
  createdAt timestamp
);