import React from "react";
import Lottie from "lottie-react";
import animation from "../../assets/lottie/Animation - 1740061090786.json";
import { useNavigate } from "react-router-dom";

const TaskMain = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-col md:flex-row md:h-[95vh] md:mt-3 items-center justify-between bg-[#181024] px-6 md:px-10 py-10 rounded-2xl shadow-lg max-w-6xl mx-auto  space-y-6 md:space-y-0">
      {/* Left Side Text */}
      <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-600">
          TaskFlow
        </h1>
        <p className="text-lg text-white">
          TaskFlow is a comprehensive tool designed to streamline and manage
          your workflow efficiently. Whether you're tracking tasks or
          collaborating with teammates, TaskFlow helps you stay on top of your
          projects and deadlines.
        </p>
        <button
          onClick={handleStart}
          className="bg-yellow-600 text-white py-3 px-6 rounded-full text-lg hover:bg-yellow-500"
        >
          Get Started
        </button>
      </div>

      {/* Right Side Lottie Animation */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie animationData={animation} loop={true} />
      </div>
    </div>
  );
};

export default TaskMain;
