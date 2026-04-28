import { io } from "socket.io-client";

// In production, this would be the actual backend URL
// For local development, it's typically http://localhost:5000
const SOCKET_URL = import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:5050";

export const socket = io(SOCKET_URL, {
    autoConnect: true,
    reconnection: true,
});

socket.on("connect", () => {
    console.log("Connected to Real-time Sync Server");
});

socket.on("disconnect", () => {
    console.log("Disconnected from Real-time Sync Server");
});
