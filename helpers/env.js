const dotenv = require("dotenv");

dotenv.config();

const { DB_MONGO_HOST, JWT_SECRET } = process.env;

if (!DB_MONGO_HOST) {
  console.log("DB_MONGO_HOST is not set");
  process.exit(1);
}

if (!JWT_SECRET) {
  console.log("DB_MONGO_DATABASE is not set");
  process.exit(1);
}

module.exports = {
  JWT_SECRET,
  DB_MONGO_HOST,
};
