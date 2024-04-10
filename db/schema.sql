-- db/schema.sql
DROP DATABASE IF EXISTS worldmap_dev;

CREATE DATABASE worldmap_dev;


\c worldmap_dev;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    primary_countries TEXT,
    secondary_countries TEXT
);


CREATE TABLE countries (
    id SERIAL PRIMARY KEY,
    country TEXT NOT NULL,
    time TIMESTAMP WITH TIME ZONE NOT NULL,
    landmarks TEXT,
    cities TEXT
);

CREATE TABLE favorites(
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    description TEXT
);