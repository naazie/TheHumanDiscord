import toast from "react-hot-toast";
import { create } from "zustand";
import { onlineUsers } from "../../../backend/sockets/presence.store";

export const usePresenceStore = create((set) => ({
    onlineUsers: new Set(),
    
    setOnlineUsers: (ids) => {
        set({onlineUsers: new Set(ids)});
    },

    userOnline: (userId) => {
        set((s) => {
            const next = new Set(s.onlineUsers);
            next.add(userId);
            return {onlineUsers: next};
        })
    },

    userOffline: (userId) => {
        set((s) => {
            const next = new Set(s.onlineUsers);
            next.delete(userId);
            return {onlineUsers: next};
        })
    },
}))