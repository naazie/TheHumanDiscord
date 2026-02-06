// modules/server/server.routes.js
import { isAuthorised } from "../../middleware/auth.middleware.js";
import { isServerMember, isOwner } from "../../middleware/server.middleware.js";
import serverController from "./server.controller.js";
import express from "express";
const router = express.Router();

// post: / -> create server
// get: / -> get all servers i'm part og
// get: /:id -> get server by id

router.post("/", isAuthorised, (req, res) => serverController.createServer(req, res));
router.get("/", isAuthorised, (req, res) => serverController.getUserServers(req, res));
router.get("/:serverId", isAuthorised, (req, res) => serverController.getServerById(req, res));
router.get("/:serverId/members", isAuthorised, (req, res) => serverController.fetchMembers(req, res));
router.delete("/:serverId", isAuthorised, isServerMember, isOwner, (req, res) => serverController.deleteServer(req, res));
router.patch("/:serverId", isAuthorised, isServerMember, isOwner, (req, res) => serverController.updateServerName(req, res));

export default router;