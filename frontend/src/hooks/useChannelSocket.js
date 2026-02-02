import { useEffect } from "react";
import { useSocket } from "../context/SocketContext.jsx";
import toast from "react-hot-toast";

export const useChannelSocket = ({channelId}) => {
    const socket = useSocket();
    useEffect(() => {
        if(!channelId) {
            return;
        }

        const joinChannel = () => {
            console.log("Joining channel:", channelId);
            socket.emit("join-channel", {channelId});
        };
        
        if(socket.connected && socket.auth) {
            joinChannel();
        }
        else {
            socket.once("connect", joinChannel);
        }

        return () => {
            // can add socket.emit(leave channel) but currently i dont have it in backend so not added 
            socket.emit("leave-channel", {channelId});
            // may be needed for typind presence
        }
    }, [channelId]);
    return null; //not rendering anythong
};