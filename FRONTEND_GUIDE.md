# ChatApp - Complete Setup Guide

## Overview

A full-stack real-time chat application with separate HTTP, WebSocket servers, and a Next.js frontend.

## Architecture

```
ChatApp/
├── apps/
│   ├── web/              # Next.js Frontend (Port 3000)
│   ├── http-server/      # Express HTTP API (Port 3001)
│   └── ws-server/        # WebSocket Server (Port 8080)
├── packages/
│   ├── database/         # Prisma + MongoDB
│   ├── zodsc/           # Zod validation schemas
│   └── sigin/           # JWT secret config
```

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Database

Configure your MongoDB connection in `packages/database/.env`:

```env
DATABASE_URL="mongodb://localhost:27017/chatapp"
```

Generate Prisma client:

```bash
cd packages/database
pnpm db:generate
```

### 3. Start Backend Services

**Terminal 1 - HTTP Server:**
```bash
cd apps/http-server
node src/index.ts
# Runs on http://localhost:3001
```

**Terminal 2 - WebSocket Server:**
```bash
cd apps/ws-server  
node src/index.ts
# Runs on ws://localhost:8080
```

### 4. Start Frontend

**Terminal 3 - Web App:**
```bash
cd apps/web
pnpm dev
# Runs on http://localhost:3000
```

## Features Implemented

### Frontend (`apps/web`)

✅ **Landing Page** (`/`)
- Hero section with features
- Responsive navigation
- Call-to-action buttons

✅ **Authentication**
- Sign Up page with validation
- Sign In page
- JWT token management

✅ **Dashboard** (`/dashboard`)
- Create new rooms
- Room management
- Logout functionality

✅ **Chat Room** (`/room/[slug]`)
- Real-time messaging via WebSocket
- Message history
- Auto-scroll
- Connection status
- Copy room link

### Backend

✅ **HTTP Server** (Port 3001)
- POST `/signup` - User registration
- POST `/signin` - User authentication  
- POST `/room` - Create chat room (auth required)
- GET `/room/:slug` - Get room details (auth required)
- GET `/chats/:roomId` - Get chat history (auth required)

✅ **WebSocket Server** (Port 8080)
- Real-time message broadcasting
- Room join/leave functionality
- Message persistence to database

### Database

✅ **Models**
- User (id, email, password, name, photo)
- Room (id, slug, adminId, createdAt)
- Chat (id, roomId, userId, message)

## User Flow

1. **Sign Up** → Create account with username, password, name
2. **Sign In** → Get JWT token
3. **Dashboard** → Create a chat room
4. **Room** → Share link, chat in real-time
5. **Friends Join** → Multiple users can join same room
6. **Real-Time** → All messages broadcast instantly

## Environment Variables

### Frontend (`apps/web/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```

### Database (`packages/database/.env`)
```env
DATABASE_URL="mongodb://localhost:27017/chatapp"
```

### Backend
JWT_SECRET is configured in `packages/sigin/src/index.ts`

## Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript, CSS Modules
- **Backend:** Node.js, Express, WebSocket (ws)
- **Database:** MongoDB, Prisma
- **Validation:** Zod
- **Auth:** JWT

## Development Commands

```bash
# Install all dependencies
pnpm install

# Type check all packages
pnpm -w exec tsc --noEmit

# Generate Prisma client
cd packages/database && pnpm db:generate

# Run frontend dev server
cd apps/web && pnpm dev

# Build frontend for production
cd apps/web && pnpm build

# Start production frontend
cd apps/web && pnpm start
```

## API Endpoints

### Authentication
- `POST /signup` - Body: `{ username, password, name }`
- `POST /signin` - Body: `{ username, password }`

### Rooms (Requires Authorization Header)
- `POST /room` - Body: `{ name }` - Returns: `{ roomId, slug }`
- `GET /room/:slug` - Returns room details
- `GET /chats/:roomId` - Returns message history

### WebSocket Messages

**Client → Server:**
```typescript
// Join room
{ type: 'join_room', roomId: string }

// Leave room  
{ type: 'leave_room', roomId: string }

// Send message
{ type: 'chat', roomId: string, message: string }
```

**Server → Client:**
```typescript
// Receive message
{ type: 'chat', message: string, roomId: string }
```

## Next Steps

Potential enhancements:
- [ ] User profiles and avatars
- [ ] Typing indicators
- [ ] Online user list
- [ ] Message read receipts
- [ ] File/image uploads
- [ ] Message search
- [ ] Room invitations
- [ ] Email verification
- [ ] Password reset
- [ ] Rate limiting
- [ ] Message editing/deletion
- [ ] Emoji reactions

## Troubleshooting

**WebSocket not connecting?**
- Ensure ws-server is running on port 8080
- Check browser console for connection errors
- Verify JWT token is valid

**API errors?**
- Ensure http-server is running on port 3001
- Check MongoDB connection
- Verify Prisma client is generated

**TypeScript errors?**
- Run `pnpm install` to sync dependencies
- Regenerate Prisma client: `cd packages/database && pnpm db:generate`
- Check import paths

## Project Structure Details

```
apps/web/app/
├── page.tsx                    # Landing page
├── home.module.css            # Landing styles
├── signup/
│   ├── page.tsx              # Sign up form
│   └── auth.module.css       # Auth form styles
├── signin/
│   └── page.tsx              # Sign in form
├── dashboard/
│   ├── page.tsx              # Dashboard with room creation
│   └── dashboard.module.css  # Dashboard styles
├── room/[slug]/
│   ├── page.tsx              # Real-time chat interface
│   └── room.module.css       # Chat styles
└── lib/
    ├── api.ts                # HTTP API client
    └── useWebSocket.ts       # WebSocket hook
```

## License

ISC
