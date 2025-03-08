const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) => {
  console.error("Redis client error", error);
});

client.set("myKey", "myValue", (error, reply) => {
  if (error) {
    console.error(error);
  } else {
    console.log("Key-value pair set in Redis");
    client.get("myKey", (error, value) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Value retrieved from Redis:", value);
        client.del("myKey", (error, reply) => {
          if (error) {
            console.error(error);
          } else {
            console.log("Key deleted from Redis");
            client.quit(() => {
              console.log("Redis connection closed");
              // Perform any additional cleanup or exit the application here
            });
          }
        });
      }
    });
  }
});
