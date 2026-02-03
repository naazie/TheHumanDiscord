// src/components/service/user.service.js
import api from "../../utils/axios.js";

export const getUser = async() => {
    const res = await api.get('/auth/me');
    console.log("USer res: ", res.data.user);
    return res.data;
}

export const getAllUsers = async() => {
    const res = await api.get('/auth/users');
    return res.data.users;
}