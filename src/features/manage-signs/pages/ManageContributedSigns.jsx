import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../../shared/darkModeContext";
import {
  useApproveSignMutation,
  useGetSignAddedByUserQuery,
  useRejectSignMutation,
} from "../api/signsApi";
import { FcApprove } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";

const ManageContributedSigns = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();
  const [currentPage, setCurrentPage] = useState(1);
  const { data: signs, isLoading, isSuccess } = useGetSignAddedByUserQuery();
  const [approveSign] = useApproveSignMutation();
  const [rejectSign] = useRejectSignMutation();

  const onApproveSign = async (id) => {
    try {
      await approveSign(id).unwrap();
      window.location.reload();
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const onRejectSign = async (id) => {
    try {
      await rejectSign(id).unwrap();
      window.location.reload();
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const itemsPerPage = 5;

  const onDelete = async (id) => {
    console.log("hello");
  };

  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  const totalPages = Math.ceil(signs?.data.length / itemsPerPage) || 1;
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, signs?.data.length);

  const showingText = `Showing ${startIndex + 1}-${endIndex} of ${
    signs?.data.length
  }`;

  return (
    <div
      className={`h-full overflow-y-auto ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="flex flex-col flex-1 w-full">
        <div className="w-full container h-screen mt-8 p-6 rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr
                  className={`text-xs font-semibold tracking-wide text-left ${
                    isDarkMode
                      ? "border-gray-700 text-gray-400 bg-gray-800"
                      : "text-gray-500 bg-gray-50"
                  } text-gray-500 uppercase border-b`}
                >
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Meaning</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>

              <tbody
                className={`divide-y  ${
                  isDarkMode ? "divide-gray-700 bg-gray-800" : "bg-white"
                }`}
              >
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-3 text-center text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : isSuccess ? (
                  signs?.data.slice(startIndex, endIndex).map((sign) => (
                    <tr
                      key={sign._id}
                      className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-700"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          <div className="relative hidden w-28 h-14 mr-3  md:block">
                            <img
                              className="object-cover w-full h-full"
                              src={sign.image}
                              alt={sign.meaning}
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            />
                          </div>
                          <div>
                            <p className="font-semibold">{sign.meaning}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {sign.meaning}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{sign.meaning}</td>
                      {sign.status === "pending" ? (
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center space-x-4 text-sm">
                            <button
                              className="flex items-center border bg-[#9333EA] text-white justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg focus:outline-none focus:shadow-outline-gray"
                              aria-label="upgrade-to-admin"
                              onClick={() => onApproveSign(sign._id)}
                            >
                              <FcApprove className="w-5 h-5" />
                              approve
                            </button>
                            <button
                              className="flex items-center border bg-[#9333EA] text-white justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg focus:outline-none focus:shadow-outline-gray"
                              aria-label="upgrade-to-admin"
                              onClick={() => onRejectSign(sign._id)}
                            >
                              <FcCancel className="w-5 h-5" />
                              reject
                            </button>
                          </div>
                        </td>
                      ) : (
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center space-x-4 text-sm">
                            {sign.status === "approved" ? (
                              <div className="flex items-center space-x-4 text-sm">
                                <button
                                  className="flex items-center border bg-green-300 text-black justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                  aria-label="upgrade-to-admin"
                                >
                                  approved sign
                                </button>
                                <button
                                  className="flex items-center border bg-[#9333EA] text-white justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                  aria-label="upgrade-to-admin"
                                  onClick={() => onRejectSign(sign._id)}
                                >
                                  <FcCancel className="w-5 h-5" />
                                  reject
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-4 text-sm">
                                <button
                                  className="flex items-center border bg-red-300 text-black justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                  aria-label="upgrade-to-admin"
                                >
                                  rejected sign
                                </button>
                                <button
                                  className="flex items-center border bg-[#9333EA] text-white justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg focus:outline-none focus:shadow-outline-gray"
                                  aria-label="upgrade-to-admin"
                                  onClick={() => onApproveSign(sign._id)}
                                >
                                  <FcApprove className="w-5 h-5" />
                                  approve
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-4 py-3 text-center text-red-500"
                    >
                      Error fetching data. Please try again later.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div
            className={`grid px-4 py-3 text-xs font-semibold tracking-wide ${
              isDarkMode
                ? "border-gray-700 text-gray-400 bg-gray-800"
                : "text-gray-500 bg-gray-50"
            }  uppercase border-t  sm:grid-cols-9`}
          >
            <span className="flex items-center col-span-3">{showingText}</span>
            <span className="col-span-2" />
            {/* Pagination */}
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <li key={page}>
                        <button
                          className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${
                            currentPage === page
                              ? "text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
                              : ""
                          }`}
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </button>
                      </li>
                    )
                  )}
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                      onClick={goToNextPage}
                      disabled={currentPage === totalPages}
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageContributedSigns;
