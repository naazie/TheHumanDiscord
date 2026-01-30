// src/components/service/message.service.js
import api from "../../utils/axios.js";

export const fetchMessages = async (channelId) => {
    const res = await api.get(`/channels/${channelId}/messages`)
    return res.data;
} 

export const sendMessage = async (channelId, content) => {
    const res = await api.post(`/channels/${channelId}/messages`, {content});
    return res.data;
} 