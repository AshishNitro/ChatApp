import {WebSocketServer} from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/sigin/config';
import { PrismaClient } from '@repo/database/client';   


const wss = new WebSocketServer({port: 8080});

interface User{
    ws: WebSocket,
    rooms: string[],
    userId: string
}
const user: User[] = [];


