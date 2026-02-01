// index.js
import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app.js";
import { connectMongo } from "./config/mongo.js";
import { redis } from "./config/redis.js";
import { initSocket } from "./config/socket.js";


const PORT = process.env.PORT || 5050;

import dns from "node:dns"
dns.setDefaultResultOrder('ipv4first');


async function startServer() {
  try {
    // console.log(process.env.MONGO_URI)
    await connectMongo();
    console.log("MongoDB connected");
    const server = http.createServer(app);

    // server.listen(PORT, () => {
    //   console.log(`Server running on port ${PORT}`);

    const io = initSocket(server);
    app.set("io", io);
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    // });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
