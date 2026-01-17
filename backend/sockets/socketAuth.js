// socket/socketAuth.js
import jwt from "jsonwebtoken";
import User from "../modules/auth/auth.model.js";

export const authenticateSocket = async (socket, next) => {
    try {
        // format socket.handshake.auth.token
        const token = socket.handshake.auth?.token;
        if(!token)
        {
            return next(new Error("Authentication Error"));
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decode.id).select("_id username");
        if(!user)
            return next(new Error("User not found"));

        socket.user = {
            id: user._id.toString(),
            username: user.username
        };
        next();
    } catch (error) {
        return next(new Error("Invalid Token"));
    }
}