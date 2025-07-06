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


-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create demo user (password is 'password')
INSERT INTO users (username, email, password_hash) 
VALUES ('demo', 'demo@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON CONFLICT (username) DO NOTHING;


CREATE TABLE favorites(
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    description TEXT,
    user_id INTEGER,
    title TEXT,
    url_to_image TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
);