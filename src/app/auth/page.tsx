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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("Processing your request...");
  };

  // Updated social login handler
  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setIsLoading(true);

      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        // Check if it's our custom provider mismatch error
        if (
          result.error.includes(
            "We were unable to log you in with that login method"
          )
        ) {
          toast.error(result.error, {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        } else {
          toast.error("Authentication failed. Please try again.");
        }
      } else if (result?.url) {
        // Successful login, redirect
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Social login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const login = useCallback(async () => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        toast.error("Invalid email or password");
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch {
      console.error("Error during login");
      toast.error("Failed to login. Please try again");
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success("Registration successful! Logging you in...");
        await login();
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

            {/* Updated social login buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => handleSocialLogin("google")}
                title="Google Login"
                type="button"
                disabled={isLoading}
                className="flex-1 bg-white hover:bg-gray-100 cursor-pointer text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center transition duration-200 border disabled:opacity-50"
              >
                <FcGoogle className="text-xl" />
                <span className="ml-2">Google</span>
              </button>
              <button
                onClick={() => handleSocialLogin("github")}
                title="GitHub Login"
                type="button"
                disabled={isLoading}
                className="cursor-pointer flex-1 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg flex items-center justify-center transition duration-200 border disabled:opacity-50"
              >
                <FaGithub className="text-xl" />
                <span className="ml-2">GitHub</span>
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
