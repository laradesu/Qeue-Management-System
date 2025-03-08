const redis = require("redis");
const client = redis.createClient({
  host: "localhost", // Redis server host
  port: 6379, // Redis server port
});
module.exports = { client };
