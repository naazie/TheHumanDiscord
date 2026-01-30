// components/service/channel.service/js
import api from "../../utils/axios.js";

export const fetchChannels = async (serverId) => {
    const res = await api.get(`/servers/${serverId}/channels`);
    return res.data;
}