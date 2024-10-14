import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="container mt-5 flex items-center flex-col gap-2 h-[90vh]">
      <span className="mt-5 text-6xl font-semibold"> About ProjectM</span>
      <span className="text-[28px]">
        More about the app
      </span>
      <p class=" w-[80%] text-gray-700">
          ProjectM is the perfect platform for documenting your project
          milestones, sharing detailed insights, and showcasing your hard work.
          Whether it's a creative endeavor or a technical masterpiece, ProjectM
          allows you to store project titles, descriptions, and key updates, all
          in one place. Let others explore your work and show appreciation by
          liking your projects. Start tracking your progress and let your
          projects shine!
        </p>

      <div class="flex justify-center h-screen mt-4">
        <div class="relative group">
          <Link to="/home" class="no-underline relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
            <span class="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

            <span class="relative z-10 block px-6 py-3 rounded-xl bg-gray-750">
              <div class="relative z-10 flex items-center space-x-2">
                <span class="transition-all duration-500 group-hover:translate-x-1">
                  Learn More
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

export default About;
