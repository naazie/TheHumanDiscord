// middleware/auth.middleware.js
// imports
import { verifyToken } from "../utils/jwt.js";


export function isAuthorised(req, res, next)
{
    try {
        // Read authorization from headers
        const authHeader = req.headers.authorization;

        // If missing → reject
        if(!authHeader)
        {
            throw new Error("header missing");
        }
        // Ensure it starts with Bearer
        // Split by space
        // Extract token
        // If token missing → reject
        // format - Bearer <token>
        const parts = authHeader.split(" ");
        if(parts.length != 2 || (parts[0] != "Bearer" && parts[0] != "bearer"))
        {
            throw new Error("invalid token");
        }

        // Verify token
        const token = parts[1].trim();
        const isValid = verifyToken(token);
        if(!isValid)
        {
            throw new Error("Invalid Token");
        }
        // Attach decoded payload to req.user
        req.user = {
            "id": isValid.id,
            "email": isValid.email
        };
        // Call next()
        next();
    }
    catch(error)
    {
        return res.status(401).json({error: "Invalid or Expired Token"});
    }
}