"use client";
import React, { useState } from "react";

const Auth = () => { 
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(isLogin ? "Logging in..." : "Signing up...");
    };

    return (
      <>
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
                {isLogin ? "Login" : "Sign Up"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
                {!isLogin && (
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Name:</label>
                    <input 
                    title="name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Enter your name"
                    />
                </div>
                )}
                <div>
                <label className="block text-gray-700 font-medium mb-1">Email:</label>
                <input 
                    title="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Enter your email"
                />
                </div>
                <div>
                <label className="block text-gray-700 font-medium mb-1">Password:</label>
                <input 
                    title="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    placeholder="Enter your password"
                />
                </div>
                <button 
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                >
                {isLogin ? "Login" : "Sign Up"}
                </button>
            </form>
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="w-full mt-6 text-purple-600 hover:underline font-medium transition"
            >
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
            </div>
        </div>
        </>
    );
}

export default Auth;
