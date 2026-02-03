import { useEffect } from "react";
import { useSocket } from "../context/SocketContext.jsx";
import toast from "react-hot-toast";
import { usePresenceStore } from "../stores/presence.store.js";

export const usePresenceSocket = () => {
    const socket = useSocket();
    const onlineUser = usePresenceStore((s) => s.userOnline);
    const offlineUser = usePresenceStore((s) => s.userOffline);

    const onlineHandler = (data) => {
        console.log("online handler running", data)
        onlineUser(data.userId);
    }

    const offlineHandler = (data) => {
        offlineUser(data.userId);
    }
    
    useEffect(() => {
        socket.on("user-online", onlineHandler);
        socket.on("user-offline", offlineHandler);

        return () => {
            socket.off("user-online", onlineHandler);
            socket.off("user-offline", offlineHandler);
        };
    }, [socket, onlineUser, offlineUser])
};