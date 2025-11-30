import express from "express";
import { middleware } from "./middleware";  
import jwt from "jsonwebtoken";
import { CreateUserSchema, SignInSchema, CreateRoomSchema } from "@repo/zodsc/types";
import prismaClient from "@repo/database/client";
import { JWT_SECRET } from "@repo/sigin/config";


const app = express();
app.use(express.json());



app.post("/signup", async (req, res)=>{

    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        console.log(parsedData.success);
        res.json({
            message: "Incorreect data",
            
        })
        return;
    }

    try{
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data?.username,
                name: parsedData.data.name,
                password: parsedData.data.password,
            }
        })
        res.json({
            userId: user.id})

    } catch(err){
        res.status(411).json({
            message: "user aleady exists , try diffrent username "
        })
    }
    
    

    
})

app.post("/signin", (req , res)=>{


    const parsedData = SignInSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect data"
        })
        return;

    }
    const user = prismaClient.user.findFirst({
        where:{
            email: parsedData.data.username,
            password: parsedData.data.password
        }
    })
    if(!user){
        res.status(403).json({
            message:"NOt authorized"
        })
        return;

    }

    const token = jwt.sign({
        userId:user?.id
    }, JWT_SECRET);
    res.json({
        token
    }) 

})

app.post("/room", middleware, async (req, res)=>{

    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect data"
        })
        return;
    }

    const userId = (req as any).userId;
    try{
    const room = await prismaClient.room.create({
        data:{
            name: parsedData.data.name,
            adminId: userId
        }
    })
    res.json({
        roomId: room.id

    })

 } catch(err){
        res.status(411).json({
            message: "error  room already exisits "
        })
    }



})


app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomId = Number(req.params.roomId);
        console.log(req.params.roomId);
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 1000
        });

        res.json({
            messages
        })
    } catch(e) {
        console.log(e);
        res.json({
            messages: []
        })
    }
    
})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})


app.listen(3001);