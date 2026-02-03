import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthAsia } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import api from '../../utils/axios.js';

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if(!email || !password) {
                toast.error("Email and Password required for login");
                setLoading(false);
                return;
            }
            const res = await api.post(
                "/auth/login",
                { email, password }
            )
            localStorage.setItem("token", res.data.user.token);
            localStorage.setItem("username", res.data.user.user.username);
            toast.success("Welcome back to humanCore✨");
            navigate("/home");
        } catch (error) {
            toast.error(error.response?.data?.error || "Login Failed")
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen w-screen flex-col justify-center px-6 py-12 lg:px-8 bg-[#21141E]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center ">
                <FontAwesomeIcon
                    icon={faEarthAsia}
                    className="mx-auto text-4xl text-[#ac8eb3]"
                />
                <h3 className="text-2xl font-extrabold text-[#ac8eb3]">HumanCore</h3>
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                    Password
                    </label>
                    <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                        Forgot password?
                    </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                    />
                </div>
                </div>

                <div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold text-white
                        ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#a05b5d] hover:bg-[#ac7274]"}`}
                    >
                    {loading ? "Logging in..." : "Log in"}
                </button>
                </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-400">
                Not a doctor.{' '}
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                
                </a>
            </p>
            </div>
        </div>
  )
}

export default LoginPage