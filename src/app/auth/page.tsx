"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { toast } from "react-toastify";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Processing your request...");
  };

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,

        callbackUrl: "/",
      });
    } catch {
      console.error("Error during login");
      toast.error("failed to login. Please try again");
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });

      login();
      if (response.status === 201) {
        toast.success("Registration successful! Redirecting to login...");
      } else {
        toast.error("Registration failed. Please try again");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again");
    }
  }, [name, email, password, login]);

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
                <label className="block text-gray-700 font-medium mb-1">
                  Name:
                </label>
                <input
                  title="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="placeholder:text-gray-600 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="Enter your name"
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email:
              </label>
              <input
                title="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 placeholder:text-gray-600 focus:ring-purple-800"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password:
              </label>
              <input
                title="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="placeholder:text-gray-600 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex">
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                title="btn"
                type="button"
                className="flex-1 bg-white hover:bg-gray-100 cursor-pointer text-gray-700 font-semibold rounded-lg flex items-center justify-center transition duration-200"
              >
                <FcGoogle />
              </button>
              <button
                onClick={() => signIn("github", { callbackUrl: "/" })}
                title="btn"
                type="button"
                className="cursor-pointer flex-1 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center space-x-1 transition duration-200"
              >
                <FaGithub />
              </button>
            </div>
            <button
              type="submit"
              onClick={isLogin ? login : register}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full mt-6 text-purple-600 hover:underline font-medium transition"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Auth;
