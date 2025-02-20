import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoToToDo = () => {
    navigate("/root/todo");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-700 mb-6">
          We couldn't find the page you're looking for. Please try again or go
          back to your tasks.
        </p>

        <button
          className="w-full bg-black text-white p-3 rounded-lg hover:bg-blue-600 transition-colors mb-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>

        <button
          className="w-full bg-yellow-400 text-white p-3 rounded-lg hover:bg-green-600 transition-colors"
          onClick={handleGoToToDo}
        >
          Go to back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
