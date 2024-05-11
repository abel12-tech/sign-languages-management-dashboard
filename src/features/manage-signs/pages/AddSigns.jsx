import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../../shared/darkModeContext";

const AddSigns = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();
  const [adding, setAdding] = useState(false);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [meaning, setMeaning] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAdding(true);

    // Add your form submission logic here
  };

  return (
    <div
      className={`h-full overflow-y-auto ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="flex flex-col flex-1 w-full">
        <main className="h-full pb-16">
          <div className="container px-6 mx-auto grid">
            <h4
              className={`mb-4 text-center p-4 text-lg font-semibold ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Add Sign
            </h4>
            <form onSubmit={handleSubmit}>
              <div
                className={`px-4 py-3 mb-8 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg shadow-md`}
              >
                <label className="block text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className={`${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-gray-300 focus:shadow-outline-gray"
                        : "border-2 outline-none focus:border-gray-200"
                    } focus:border-gray-400 focus:outline-none focus:shadow-outline-purple sm:col-span-2 text-sm rounded-lg outline-none block w-full p-2.5`}
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Category
                  </span>
                  <input
                    className={`${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-gray-300 focus:shadow-outline-gray"
                        : "border-2 outline-none focus:border-gray-200"
                    } focus:border-gray-400 focus:outline-none focus:shadow-outline-purple sm:col-span-2 text-sm rounded-lg outline-none block w-full p-2.5`}
                    placeholder="category name"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </label>
                <label className="block mt-4 text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Meaning
                  </span>
                  <input
                    className={`${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-gray-300 focus:shadow-outline-gray"
                        : "border-2 outline-none focus:border-gray-200"
                    } focus:border-gray-400 focus:outline-none focus:shadow-outline-purple sm:col-span-2 text-sm rounded-lg outline-none block w-full p-2.5`}
                    placeholder="meaning"
                    value={meaning}
                    onChange={(e) => setMeaning(e.target.value)}
                  />
                </label>
                <button
                  type="submit"
                  className="mt-4 bg-[#9333EA] hover:bg-[#c190ee] text-white font-semibold py-2 px-4 rounded"
                >
                  {adding ? "adding ..." : "Add Sign"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddSigns;
