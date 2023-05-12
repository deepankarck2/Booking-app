import React from "react";
import { FaGithub } from "react-icons/fa";
import { SiJira } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center bg-gray-200 py-4 fixed bottom-0 w-full left-0 right-0">
    <div className="text-gray-600 text-sm">
      © 2023 My Booking App
    </div>
    <div className="mt-2">
      <a href="https://github.com/deepankarck2/Booking-app" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700">
        <FaGithub className="w-6 h-6" />
      </a>
    </div>
  </footer>
  );
};

export default Footer;