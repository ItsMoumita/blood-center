import React from 'react';

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#530404]/80 to-[#FFE8E8] dark:from-[#0F172A] dark:to-[#000000] px-4">
      <div className="bg-white dark:bg-[#273a57] rounded-2xl shadow-lg p-8 flex flex-col items-center max-w-lg w-full">
        <img
          src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?semt=ais_hybrid&w=740"
          alt="404 Error - Broken Robot"
          className="max-w-xs md:max-w-md w-full mb-6 rounded shadow"
          style={{ objectFit: 'contain' }}
        />
        <h1 className="text-5xl font-extrabold text-[#BB2B29] dark:text-[#FFE8E8] mb-2">404</h1>
        <h2 className="text-2xl font-bold text-[#530404] dark:text-[#FFE8E8] mb-2">Page Not Found</h2>
        <p className="text-[#530404] dark:text-[#FFE8E8] mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-block bg-[#E53935] text-white px-8 py-3 rounded-lg hover:bg-[#bb2b29] transition-colors font-bold uppercase tracking-wider"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default Error;