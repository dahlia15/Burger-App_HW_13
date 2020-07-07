DROP DATABASE IF EXISTS burger_db;

-- Create the database movie_planner_db and specified it for use.
CREATE DATABASE burger_db;

USE burger_db;

-- Create the table plans.
CREATE TABLE burgerList (
  id int NOT NULL AUTO_INCREMENT,
  burger varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO burgerList (burger) VALUES ('Veggie Burger'), ('Cheese Burger') , ('Hamburger'), ('Beyond Burger');