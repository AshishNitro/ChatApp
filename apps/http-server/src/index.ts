import express from "express";
import { middleware } from "./middleware";  
import jwt from "jsonwebtoken";
import { CreateUserSchema, SignInSchema, CreateRoomSchema } from "@repo/zodsc/types";
import prismaClient from "@repo/database/client";


const app = express();



app.post("/signup", (req, res)=>{

    const username = req.query.username;
    const password = req.query.password;

    
})

app.post("/signin", (req , res)=>{

})

app.post("/room", (req, res)=>{

})


app.get("/chats/:roomId", (req, res) =>{

})


app.get("/room/:slug", (req, res)=>{
    
})


app.listen(3000);