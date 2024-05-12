import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../shared/darkModeContext";
import { MdOutlineDashboard } from "react-icons/md";
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { SiContributorcovenant } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { FcFeedback } from "react-icons/fc";
import { RiFeedbackLine } from "react-icons/ri";

const Sidebar = ({ isSideMenuOpen }) => {
  const [activeLink, setActiveLink] = useState("/");
  const { isDarkMode } = useDarkMode();

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <aside
      className={`${
        isSideMenuOpen ? "block" : "hidden"
      } z-20 w-64 overflow-y-auto ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } md:block flex-shrink-0`}
    >
      <div
        className={`py-4 h-screen ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className={`ml-6 text-lg font-bold ${
            isDarkMode ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Dashboard
        </Link>

        {/* Navigation links */}
        <ul className="mt-6">
          <li className="relative px-6 py-3">
            {activeLink === "/" && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
            <Link
              to="/"
              onClick={() => handleLinkClick("/")}
              className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                isDarkMode
                  ? "text-gray-100 dark:hover:text-gray-200"
                  : "text-gray-800 dark:hover:text-gray-600"
              }`}
            >
              <MdOutlineDashboard className="w-5 h-5" />
              <span className="ml-4">Dashboard</span>
            </Link>
          </li>
        </ul>
        {/* More navigation links */}
        <ul>
          <li className="relative px-6 py-3">
            {activeLink === "/manage-added-signs" && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
            <Link
              to="/manage-added-signs"
              onClick={() => handleLinkClick("/manage-added-signs")}
              className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                isDarkMode
                  ? "dark:hover:text-gray-200"
                  : "text-gray-800 dark:hover:text-gray-600"
              }`}
            >
              <FaAmericanSignLanguageInterpreting className="w-6 h-6" />
              <span className="ml-4">Manage Approved and Added Signs</span>
            </Link>
          </li>

          <li className="relative px-6 py-3">
            {activeLink === "/manage-sign-contributed" && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
            <Link
              to="/manage-sign-contributed"
              onClick={() => handleLinkClick("/manage-sign-contributed")}
              className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                isDarkMode
                  ? "dark:hover:text-gray-200"
                  : "text-gray-800 dark:hover:text-gray-600"
              }`}
            >
              <SiContributorcovenant className="w-5 h-5" />
              <span className="ml-4">Manage Sign Contributed By User</span>
            </Link>
          </li>

          <li className="relative px-6 py-3">
            {activeLink === "/manage-sign-category" && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
            <Link
              to="/manage-categories"
              onClick={() => handleLinkClick("/manage-sign-category")}
              className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                isDarkMode
                  ? "dark:hover:text-gray-200"
                  : "text-gray-800 dark:hover:text-gray-600"
              }`}
            >
              <MdOutlineCategory className="w-5 h-5" />
              <span className="ml-4">Manage Sign Categories</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            {activeLink === "/manage-users" && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
            <Link
              to="/manage-users"
              onClick={() => handleLinkClick("/manage-users")}
              className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                isDarkMode
                  ? "dark:hover:text-gray-200"
                  : "text-gray-800 dark:hover:text-gray-600"
              }`}
            >
              <FiUsers className="w-5 h-5" />
              <span className="ml-4">Manage Users</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            {activeLink === "/manage-feedback" && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
            <Link
              to="/manage-feedback"
              onClick={() => handleLinkClick("/manage-feedback")}
              className={`inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 ${
                isDarkMode
                  ? "dark:hover:text-gray-200"
                  : "text-gray-800 dark:hover:text-gray-600"
              }`}
            >
              <FcFeedback className="w-5 h-5" />
              <span className="ml-4">Manage Feedback</span>
            </Link>
          </li>
          <li className="relative px-6 py-3">
            {activeLink === "/manage-reported-issues" && (
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
