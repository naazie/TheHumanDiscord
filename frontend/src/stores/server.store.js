// src/stores/server.store.js
import {create} from "zustand";
import { fetchServer } from "../components/service/servers.service.js";

export const useServerStore = create((set) => ({
    servers: [],
    activeServer: null,
    isLoading: false,

    loadServers: async () => {
        set({isLoading: true});
        try {
            const res = await fetchServer();
            console.log("servers response:", res.servers);
            set({servers: res.servers, isLoading: false});
            if (res.servers.length > 0)
                set({ activeServer: res.servers[0] });
        } catch (error) {
            console.error("Failed to load servers", error);
            set({ isLoading: false });
        }
    },
    setActiveServer: (server) => set({ activeServer: res.servers[0] }),
}))