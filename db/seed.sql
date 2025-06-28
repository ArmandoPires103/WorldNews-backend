-- db/seed.sql
\c worldmap_dev




INSERT INTO countries (country, landmarks, cities) VALUES
    ('USA','Statue of Liberty, Grand Canyon', 'New York City, Los Angeles, Chicago'),
    ('Russia','Red Square, Saint Basil''s Cathedral', 'Moscow, Saint Petersburg'),
    ('China', 'Great Wall of China, Forbidden City', 'Beijing, Shanghai, Guangzhou'),
    ('Mexico', 'Chichen Itza, Palenque', 'Mexico City, Cancún, Guadalajara'),
    ('Canada', 'CN Tower, Niagara Falls', 'Toronto, Montreal, Vancouver'),
    ('United Kingdom', 'Big Ben, Stonehenge', 'London, Manchester, Edinburgh'),
    ('Germany',  'Brandenburg Gate, Neuschwanstein Castle', 'Berlin, Munich, Hamburg'),
    ('France',  'Eiffel Tower, Louvre Museum', 'Paris, Marseille, Lyon'),
    ('India', 'Taj Mahal, Red Fort', 'New Delhi, Mumbai, Bangalore'),
    ('Australia', 'Sydney Opera House, Great Barrier Reef', 'Sydney, Melbourne, Brisbane'),
    ('Brazil',  'Christ the Redeemer, Iguazu Falls', 'Rio de Janeiro, São Paulo, Brasília'),
    ('Argentina',  'Perito Moreno Glacier, La Boca Neighborhood', 'Buenos Aires, Córdoba, Rosario'),
    ('Colombia',  'Lost City, Salt Cathedral of Zipaquirá', 'Bogotá, Medellín, Cartagena'),
    ('Peru',  'Machu Picchu, Nazca Lines', 'Lima, Cusco, Arequipa'),
    ('Chile',  'Easter Island, Torres del Paine National Park', 'Santiago, Valparaíso, Concepción'),
    ('Venezuela',  'Angel Falls, Mount Roraima', 'Caracas, Maracaibo, Valencia');

INSERT INTO users (username, password_hash, email, created_at, updated_at, primary_country_id, secondary_country_id)
VALUES
  
    ('demo', '$2b$10$.z68x3792U9LyBwmghfsKexstMO7i0SeNCoDmeJa7bEFPQBnZU3bK', 'demo@example.com', NOW(), NOW(), 1, 2),
    ('user1', '$2b$10$IFccE9DsjTaFSv70Hwcd.OP2UU2S.QyrwabwYxx4wKDH4hYO2INnS', 'user1@example.com', NOW(), NOW(), 1, 2),
    ('user2', 'password456', 'user2@example.com', NOW(), NOW(), 3, 4),
    ('user3', 'password789', 'user3@example.com', NOW(), NOW(), 5, 6);

INSERT INTO favorites (url, description, title, url_to_image, user_id) VALUES
    ('https://example.com/page1', 'Example Page 1', 'Six dead in mass stabbing at Sydney shopping center - CNN', 'https://static1.anpoimages.com/wordpress/wp-content/uploads/2023/03/android-15-ice-cream-vanilla-codename-1.jpg', 1),
    ('https://example.com/page2', 'Example Page 2', 'Rico Wade, Key Outkast Producer and Member of Organized Noize, Dies at 52 - Variety', 'https://static1.anpoimages.com/wordpress/wp-content/uploads/2023/03/android-15-ice-cream-vanilla-codename-1.jpg', 1);