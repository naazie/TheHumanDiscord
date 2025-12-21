// auth.controller.js
// const AuthService = require("./auth.service");
import AuthService from "./auth.service.js";

class AuthController {
    async register(req, res) {
        try {
            // req contains the parameters that we need from the frontend 
            const {username, email, password} = req.body;
            const user = await AuthService.registerUser({username: username, email: email, password: password});
            // user is returned from service & cointains id, email, username
            res.status(201).json({success: true, user}); 
            // 201 - created
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await AuthService.loginUser({email: email, password: password});
            res.status(200).json({success: true, user});
            //  200 - ok
            // user is returned from service & cointains id, email, username
        } catch (error) {
            res.status(400).json({error: error.message});
        }
    }
}

export default new AuthController();