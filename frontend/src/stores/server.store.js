// src/stores/server.store.js
import {create} from "zustand";
import { fetchMembers, fetchServer } from "../components/service/servers.service.js";

export const useServerStore = create((set, get) => ({
    servers: [],
    activeServer: null,
    isLoading: false,
    membersByServer: {}, 
    isLoadingMembers: false,

    getMembers: (serverId) => {
        if(!serverId)
            return [];
        return get().membersByServer[serverId] ?? [];
    },

    loadMembers: async(serverId) => {
        if(!serverId)
            return;
        const cached = get().membersByServer[serverId];
        if(cached)
            return;

        set({isLoadingMembers: true});
        // set({isLoading: true});

        try {
            const res = await fetchMembers(serverId);
            set((state) => ({
                membersByServer: {
                    ...state.membersByServer,
                    [serverId]: res.data.members, 
                },
                isLoadingMembers: false,
            }));
        } catch (error) {
            console.error(`Failed to load members:  ${error.error}`);
            set({ isLoading: false });
        }
    },

    loadServers: async () => {
        set({isLoading: true});
        try {
            const res = await fetchServer();
            set({servers: res.servers, isLoading: false});
            if (res.servers.length > 0)
                set({ activeServer: res.servers[0] });
        } catch (error) {
            console.error("Failed to load servers", error);
            set({ isLoading: false });
        }
    },
    setActiveServer: (server) => {
        console.log(server._id);
        set({ activeServer: server })}
}))