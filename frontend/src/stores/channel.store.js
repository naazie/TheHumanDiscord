// src/store/channel.store.js
import api from "../utils/axios.js";
import { create } from "zustand";
import { fetchChannels } from "../components/service/channel.service.js";

export const useChannelStore = create((set) =>( {
    channels: [],
    isLoading: false,
    activeChannel: null,

    loadChannels: async(serverId) => {
        if(!serverId) 
            return;
        set({isLoading: true});

        try {
            const res = await fetchChannels(serverId);
            set({channels: res.data, isLoading: false});
            console.log(res.data);
            if (res.data.length > 0) {
                set({ activeChannel: res.data[0] });
            }
        } catch (error) {
            toast.error(`Failed to load channels:  ${error.error.message}`);
            set({ isLoading: false });
        }
    },  
    setActiveChannel: (channel) => set({ activeChannel: channel }),
}));