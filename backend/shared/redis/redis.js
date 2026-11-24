// import Redis from "ioredis"

//  const redis = new Redis(process.env.REDIS_URL)

//  redis.on("connect",()=>{
//     console.log("Redis connected");
    
//  })


//  export default redis


import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    return Math.min(times * 1000, 5000);
  },
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("ready", () => {
  console.log("Redis ready");
});

redis.on("error", (err) => {
  console.error("Redis error:", err.message);
});

redis.on("close", () => {
  console.log("Redis connection closed");
});

export default redis;

