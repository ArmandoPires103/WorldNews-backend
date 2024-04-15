-- db/schema.sql
DROP DATABASE IF EXISTS worldmap_dev;

CREATE DATABASE worldmap_dev;


\c worldmap_dev;


CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    country TEXT NOT NULL,
    landmarks TEXT,
    cities TEXT
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    primary_country_id INTEGER,
    secondary_country_id INTEGER,
    FOREIGN KEY (primary_country_id) REFERENCES countries(id),
    FOREIGN KEY (secondary_country_id) REFERENCES countries(id)
);



CREATE TABLE favorites(
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    description TEXT,
    user_id INTEGER,
    title TEXT,
    url_to_image TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);