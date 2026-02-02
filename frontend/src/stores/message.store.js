// src/stores/message.store.js
import { create } from "zustand";
import { fetchMessages, sendMessage } from "../components/service/message.service.js";
import toast from "react-hot-toast";

export const useMessageStore = create((set, get) => ({
    messages: [],
    isLoading: false,
    activeMessage: null,

    loadMessages: async(channelId) => {
        if(!channelId)
            return;
        set({isLoading: true});

        try {
            const res = await fetchMessages(channelId);
            set({messages: res.data, isLoading: false});
            console.log("Messages: ", res.data);

        } catch (error) {
            toast.error(`Failed to load messages:  ${error.response?.data?.error}`);
            set({isLoading: false});
        }
    },

    addMessage: async(channelId, content) => {
        if(!channelId || !content.trim)
            return;
        isLoading: true;
        try {
            const res = await sendMessage(channelId, content);
            set({messages: [...get().messages, res.data], isLoading: false})
        } catch (error) {
            toast.error(`Error sending message ${error.response?.data?.error}`)
            set({isLoading: false});
        }
    },

    addMessageSocket: (content) => {
        console.log("called");
        set({messages: [...get().messages, content]});
    },

    setActiveMessage: (message) => set({ activeMessage: message }),
}))