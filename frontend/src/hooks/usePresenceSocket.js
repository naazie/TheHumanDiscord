import { useEffect } from "react";
import { useSocket } from "../context/SocketContext.jsx";
import toast from "react-hot-toast";
import { usePresenceStore } from "../stores/presence.store.js";

export const usePresenceSocket = () => {
    const socket = useSocket();
    const onlineUser = usePresenceStore((s) => s.userOnline);
    const offlineUser = usePresenceStore((s) => s.userOffline);

    const onlineHandler = (userId) => {
        onlineUser(userId);
    }

    const offlineHandler = (userId) => {
        offlineUser(userId);
    }
    
    useEffect(() => {
        socket.on("user-online",onlineHandler(userId));
        socket.on("user-offline", offlineHandler(userId));

        return () => {
            socket.off("user-online");
            socket.off("user-offline");
        };
    }, [socket, userOnline, userOffline])
};