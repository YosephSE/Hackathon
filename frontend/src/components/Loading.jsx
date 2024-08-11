import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center flex-grow bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-gradient-to-r from-[rgba(190,162,212,28%)] to-[rgba(255,206,160,28%)] border-solid rounded-full animate-spin"></div>
        <h2 className="mt-4 text-xl font-semibold text-gray-700">Loading...</h2>
        <p className="mt-2 text-gray-500">Please wait while we load the content</p>
      </div>
    </div>
  );
};

export default LoadingPage;