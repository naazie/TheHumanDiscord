import { useEffect } from "react";
import { useSocket } from "../context/SocketContext.jsx";
import toast from "react-hot-toast";
import { useMessageStore } from "../stores/message.store.js";

export const useMessageSocket = () => {
    const socket = useSocket();
    const addMessageSocket = useMessageStore((s) => s.addMessageSocket);

    const sendMessageSocket = (channelId, content) => {
        if(!channelId || !content.trim())
        {
            return;
        }
        const doEmit = () => socket.emit("send-message", {channelId, content});

        if (socket.connected) {
            doEmit();
        } else {
            socket.once("connect", doEmit);
        }
    } 

    useEffect(() => {
        const handler = (message) => {
            addMessageSocket(message);
        }

        socket.on("new-message", handler);

        return () => 
            socket.off("new-message", handler);
    }, [socket, addMessageSocket])
    return { sendMessageSocket };
};