import { socket } from "../socket/socket.js";
// import {  useContext, useEffect } from "react";
import React, { createContext, useContext, useEffect } from "react";

const SocketContext = createContext(null);

export const SocketProvider = ({children}) => {
    useEffect(() => {
        if(!socket.connected) {
            socket.connect();
            socket.on("connect", () => {
                console.log("Socket connected:", socket.id);
            })
        }

        const handleConnectError = (err) => {
            console.error("Socket Error:", err.message);
        }; 

        socket.on("connect_error", handleConnectError);

        return () => {
            socket.off("connect_error", handleConnectError);
        };
    }, [])
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}

export const useSocket = () => {
    const socket = useContext(SocketContext);
    if(!socket)
        throw new Error("use useSocket inside it's provider dummy");
    return socket;
}
