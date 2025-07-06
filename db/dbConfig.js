const pgp = require('pg-promise')();

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'worldmap_dev',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
};

const db = pgp(dbConfig);

// Test the connection
db.connect()
  .then(obj => {
    console.log('✅ Database connection successful');
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('❌ Database connection error:', error.message);
  });

module.exports = db;
