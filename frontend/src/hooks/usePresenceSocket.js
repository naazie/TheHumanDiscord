import { useEffect } from "react";
import { useSocket } from "../context/SocketContext.jsx";
import toast from "react-hot-toast";
import { usePresenceStore } from "../stores/presence.store.js";

export const usePresenceSocket = () => {
    const socket = useSocket();
    const onlineUser = usePresenceStore((s) => s.userOnline);
    const offlineUser = usePresenceStore((s) => s.userOffline);
    const setOnlineUsers = usePresenceStore((s) => s.setOnlineUsers);

    const onlineHandler = (data) => {
        console.log("online handler running", data)
        onlineUser(data.userId);
    }

    const offlineHandler = (data) => {
        offlineUser(data.userId);
    }

    const usersHandler = ({users}) => {
        console.log("ALL ONLINE USERS: ", users)
        setOnlineUsers(users);
    }
    
    useEffect(() => {
         
        socket.on("user-online", onlineHandler);
        socket.on("user-offline", offlineHandler);
        socket.on("online-users", usersHandler);

        socket.emit("get-online-users");

        return () => {
            socket.off("user-online", onlineHandler);
            socket.off("user-offline", offlineHandler);
            socket.off("online-users", usersHandler);
        };
    }, [socket, onlineUser, offlineUser, setOnlineUsers])
};