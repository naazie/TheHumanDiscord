import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { getUser } from "../components/service/user.service.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            (async () => {
                try {
                    const userData = await getUser();
                    setUser(userData);
                } catch (error) {
                    console.error(error);
                    setUser(null);
                }
                finally {
                    setLoading(false)
                }
            })();
            // setUserToken({ token });
        }
        else
            setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);