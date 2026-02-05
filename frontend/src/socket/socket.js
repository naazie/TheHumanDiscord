// src/socketsocket.js
import {io} from "socket.io-client";

// backend server;s url
// in this file, connection to our very own backend socket server
const SOCKET_URL = "http://localhost:5050";

export const socket = io(SOCKET_URL , {
    autoConnect: false,
    auth: {
        token: localStorage.getItem("token"),
    },
})