// index.js
import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
import { connectMongo } from "./config/mongo.js";
import { redis } from "./config/redis.js";
import { initSocket } from "./config/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5050;


async function startServer() {
  try {
    await connectMongo();
    console.log("MongoDB connected");

    const server = http.createServer(app);

    // server.listen(PORT, () => {
    //   console.log(`Server running on port ${PORT}`);

    const io = initSocket(server);
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
