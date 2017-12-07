const path = require("path");

/**
 * sets configures all env variables for a session
 * @param {string} envPath // path from repository to the env file
 */
module.exports = envPath => {
  require("dotenv").config({ path: path.resolve(__dirname, envPath, ".env") });
  console.log("configured environment");
};
