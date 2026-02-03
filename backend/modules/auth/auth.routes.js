// auth.routes.js
// const express = require('express');
const router = express.Router();
// const AuthController = require("./auth.controller");
import express from "express";
import AuthController from "./auth.controller.js";
import { isAuthorised } from "../../middleware/auth.middleware.js";

// router.post("/register", AuthController.register);
// router.post("/login", AuthController.login);

router.post("/register", AuthController.register.bind(AuthController));
router.post("/login", AuthController.login.bind(AuthController));
router.get("/me", isAuthorised, (req, res) => {
    res.json({
        message: "authenticated",
        user: req.user
    });
});
router.get("/users", isAuthorised, AuthController.getAllUsers.bind(AuthController));

export default router;