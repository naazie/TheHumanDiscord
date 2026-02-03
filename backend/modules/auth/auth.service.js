// auth.service.js
// const User = require("./auth.model");
import User from "./auth.model.js";
import { signToken } from "../../utils/jwt.js";

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isPasswordStrong(password) {
    if(password.length < 8)
        return false;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return passwordRegex.test(password);
}

class AuthService {
    async registerUser({ username, email, password }) {
        // get ip -> check if it is valid -> check if user exits - if exists throw err -> else save the use in db 
        // checking ip
        if(!isValidEmail(email))
        {
            throw new Error("Email is invalid");
        }
        // check if user exits
        const userExists = await User.findOne({email: email});
        if(userExists)
        {
            throw new Error("User already exists");
        }

        // save user in db, to do this 
        // 1. check pw & hash it
        if(!isPasswordStrong(password)){
            throw new Error("The password should be of 8 characters minimum & contain a lowercase letter, uppercase letter, number and a special character")
        }
        // pw is hashed in model
        // const hashPw = await bcrypt.hash(password, 10);
        
        // check if username is unique
        const isUsernamePresent = await User.findOne({username: username});
        if(isUsernamePresent) {
            throw new Error("Username is already present");
        }
        const newUser = await User.create({
            username: username,
            email: email,
            password: password
        })

        // before returning i will add jsonweb token 
        const token = signToken({id: newUser._id});
        
        // user created now i wanrt to return only required details so it wil be id, mail and username
        return {
            "user": {
                "id": newUser._id,
                "username": newUser.username,
                "email": newUser.email
            },
            token,
        };
    }

    async loginUser({ email, password }) {
        // check if user email exists -> if exists -> bcrypt pw & compare woth stored hash -> logged in if the hash matches
        // 1. check if email exists
        // so i will find user first to check if the user weith this mail exists
        if(!isValidEmail(email))
        {
            throw new Error("The entered email is not valid");
        }
        const existingUser = await User.findOne({email: email}).select("+password");;
        if(!existingUser)
        {
            throw new Error("Please check credentials again");
        }

        // comparinf login is in model so using taht
        const isMatch = await existingUser.comparePassword(password);
        if(!isMatch)
        {
            throw new Error("Please check credentials again");
        }

        const token = signToken({id: existingUser._id});
        return {
            "user": {
                "id": existingUser._id,
                "username": existingUser.username,
                "email": existingUser.email
            },
            token,
        };
    }

    async getAllUsers() {
        const users = await User.find({}, "_id username");
        return users;
    }
}

export default new AuthService();
