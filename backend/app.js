// app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";

import AuthRoutes from "./modules/auth/auth.routes.js";
import ServerRoutes from "./modules/server/server.routes.js";
import ChannelRoutes from "./modules/channels/channel.routes.js";
import MessageRoutes from "./modules/message/message.routes.js";

const app = express();

// global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

// rputes
app.use("/api/auth", AuthRoutes);
app.use("/api/server", ServerRoutes);
app.use("/api", ChannelRoutes);
app.use("/api", MessageRoutes);

// health check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

export default app;