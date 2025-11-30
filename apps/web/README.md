# ChatApp Frontend

A modern, real-time chat application built with Next.js 16, React 19, and WebSockets.

## Features

- 🎨 **Modern UI** - Clean and responsive design with CSS modules
- ⚡ **Real-Time Messaging** - Instant message delivery via WebSocket
- 🔐 **Authentication** - Secure signup and signin
- 🏠 **Room Management** - Create and join chat rooms
- 📱 **Responsive** - Works perfectly on mobile and desktop
- 🌙 **Dark Mode** - Automatic dark mode support

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Backend services running (HTTP Server on port 3001, WebSocket on port 8080)

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Configure environment:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:8080
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Pages

- `/` - Landing page with features
- `/signup` - Create new account
- `/signin` - Login to account
- `/dashboard` - Create chat rooms
- `/room/[slug]` - Real-time chat room

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- WebSocket API
- CSS Modules

## Build & Deploy

```bash
# Production build
pnpm build

# Start production server
pnpm start

# Type checking
pnpm check-types
```

