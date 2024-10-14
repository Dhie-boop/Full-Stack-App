import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5 flex items-center flex-col gap-2 h-[100vh]">
      <span className="text-6xl font-semibold"> Welcome to ProjectM</span>
      <span className="text-[28px]">
        Track Your Projects and Share the Journey
      </span>
      <p className="text-[18px]"></p>
      <article class="w-[80%] flex flex-col justify-center items-center bg-gray-700 shadow p-4 space-y-2 rounded-md hover:-translate-y-2 duration-300">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          class="w-10 h-10 text-gray-300 bg-gray-600 rounded-full p-1"
        >
          <path
            d="m8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z"
            stroke-width="2"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke="currentColor"
          ></path>
        </svg>
        <p class=" w-full text-gray-400">
          ProjectM is the perfect platform for documenting your project
          milestones, sharing detailed insights, and showcasing your hard work.
          Whether it's a creative endeavor or a technical masterpiece, ProjectM
          allows you to store project titles, descriptions, and key updates, all
          in one place. Let others explore your work and show appreciation by
          liking your projects. Start tracking your progress and let your
          projects shine!
        </p>
      </article>

      <div class="flex justify-center h-screen mt-4">
        <div class="relative group">
          <Link to="/signup" class="no-underline relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
            <span class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

            <span class="relative z-10 block px-6 py-3 rounded-xl bg-gray-750">
              <div class="relative z-10 flex items-center space-x-2">
                <span class="transition-all duration-500 group-hover:translate-x-1">
                  Get started
                </span>
                <svg
                  class="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                  data-slot="icon"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </span>
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
