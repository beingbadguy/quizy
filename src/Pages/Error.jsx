import React from "react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] mx-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-red-500">404 - Not Found</h1>
      <p className="text-gray-500 mt-2">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <button onClick={() => window.history.back()} className="text-white bg-black font-bold p-2 rounded mt-4 hover:bg-gray-600 ">Go Back</button>
    </div>
  );
};

export default Error;
