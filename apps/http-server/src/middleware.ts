import { NextFunction , Request, Response} from "express";
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/sigin/config";
//import { JWT_SECRET } from "@repo/backend-common/config";
 


//will put into .env later on 



export function middleware(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers["authorization"] ?? "";
    
    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith("Bearer ") 
        ? authHeader.substring(7) 
        : authHeader;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        if(decoded && decoded.userId){
            // @ts-ignore will do it later 
            req.userId = decoded.userId;
            next();
        } else {
            res.status(403).json({
                message: "Unauthorized"
            })
        }
    } catch(error) {
        res.status(403).json({
            message: "Invalid token"
        })
    }
}

