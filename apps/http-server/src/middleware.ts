import { NextFunction , Request, Response} from "express";
import jwt from "jsonwebtoken";
 


//will put into .env later on 
const JWT_SECRET = process.env.JWT_SECRET || "1234567890";


export function middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"] ?? "";


    const decoded = jwt.verify(token, JWT_SECRET);

    if(decoded){
        // @ts-ignore will do it later 
        req.userId = decoded.userId;
        next();

    }else{
        res.status(403).json({
            message: "Unauthorized"
        })
    }

}

