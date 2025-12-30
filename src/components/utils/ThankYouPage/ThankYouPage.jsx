"use client";

import Link from "next/link";

const ThankYouPage = ({ title, message, buttonText, redirectPath = "/" }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white text-gray-800 p-6">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
        {title}
      </h2>
      <p className="text-lg sm:text-xl text-center text-gray-600 max-w-lg">
        {message}
      </p>
      <div className="mt-8">
        <Link href={redirectPath}>
          <button className="px-6 py-3 bg-gray-800 text-white hover:bg-gray-700 font-medium text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2">
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
