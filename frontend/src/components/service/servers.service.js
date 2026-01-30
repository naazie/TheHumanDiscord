// components/service/servers.service/js
import api from "../../utils/axios.js";

export const fetchServer = async () => {
    const res = await api.get("/server");
    return res.data;
}