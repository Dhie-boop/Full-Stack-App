import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/register/", formData);
      setSuccess("User registered successfully!");
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || "An error occurred during registration");
      } else {
        setError("An error occurred during registration");
      }
    }
  };

  return (
    <>
      <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg text-center">
          <h1 class="text-2xl font-bold sm:text-3xl">Register Here</h1>
          <p class="mt-4 text-gray-600">
            Get started by creating an account and start managing the projects
          </p>
        </div>

        <form class="mx-auto mb-0 mt-8 max-w-md space-y-4" onSubmit={handleSubmit}>
          <div>
            {success && <p className="text-green-500">{success}</p>}
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <div>
            <label class="sr-only" for="username">Username</label>
            <div class="relative">
              <input
                placeholder="Enter your username"
                class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label class="sr-only" for="email">Email</label>
            <div class="relative">
              <input
                placeholder="Enter your email"
                class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
              />
            </div>
          </div>
          <div>
            <label class="sr-only" for="password">Password</label>
            <div class="relative">
              <input
                placeholder="Enter your password"
                class="w-full rounded-lg border-gray-300 p-4 pe-12 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div className="flex flex-col">
              <p class="text-gray-600">Already have an account?</p>
              <Link to="/login" class="underline">Sign-In Here</Link>
            </div>
            <button
              class="inline-block rounded-lg bg-gray-700 px-5 py-3 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
