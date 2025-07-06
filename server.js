require("dotenv").config();
console.log("DB host:", process.env.PG_HOST);
console.log("DB user:", process.env.PG_USER);
console.log("Connection string:", process.env.CONNECTION_STRING);

// DEPENDENCIES
const app = require("./app.js");

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT || 3003;

// LISTEN
app.listen(PORT, () => {
  console.log(`💻 Listening on port ${PORT} 🔖`);
});
