import React, { useEffect } from "react";
import { useDarkMode } from "../shared/darkModeContext";
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { FcApprove } from "react-icons/fc";
import { SiContributorcovenant } from "react-icons/si";

const MainContent = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();

  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  return (
    <main
      className={`h-full overflow-y-auto ${
        isDarkMode ? "dark" : "bg-gray-100"
      }`}
    >
      <div className="container px-6 mx-auto grid">
        <h2
          className={`my-6 text-2xl font-semibold ${
            isDarkMode ? "text-gray-200" : "text-gray-700"
          }  `}
        >
          Dashboard
        </h2>
        {/* CTA */}

        {/* Cards */}
        <div className={`grid gap-6 mb-8 md:grid-cols-2`}>
          {/* Card */}
          <div
            className={`flex items-center p-4 rounded-lg shadow-xs  ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
              <FaAmericanSignLanguageInterpreting className="w-7 h-7" />
            </div>
            <div>
              <p
                className={`mb-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total Signs
              </p>
              <p
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                20
              </p>
            </div>
          </div>
          {/* Card */}
          <div
            className={`flex items-center p-4 rounded-lg shadow-xs  ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
              <MdOutlineCategory className="w-7 h-7" />
            </div>
            <div>
              <p
                className={`mb-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total Categories
              </p>
              <p
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                10
              </p>
            </div>
          </div>
          {/* Card */}
          <div
            className={`flex items-center p-4 rounded-lg shadow-xs  ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
              <FcApprove className="w-7 h-7" />
            </div>
            <div>
              <p
                className={`mb-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Approved Signs
              </p>
              <p
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                5
              </p>
            </div>
          </div>
          {/* Card */}
          <div
            className={`flex items-center p-4 rounded-lg shadow-xs  ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
              <SiContributorcovenant className="w-7 h-7" />
            </div>
            <div>
              <p
                className={`mb-2 text-sm font-medium ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Total Contributions
              </p>
              <p
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                20
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
