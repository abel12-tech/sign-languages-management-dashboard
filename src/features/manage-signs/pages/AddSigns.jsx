import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../../../shared/darkModeContext";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useAddSignMutation } from "../api/signsApi";
import { useGetAllCategoriesQuery } from "../../manage-categories/api/categoriesApi";

const AddSigns = () => {
  const { isDarkMode, initializeDarkMode } = useDarkMode();
  const [adding, setAdding] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [meaning, setMeaning] = useState("");
  const navigate = useNavigate();
  const [addSign] = useAddSignMutation();
  const { data: categories, isLoading, isError } = useGetAllCategoriesQuery();

  useEffect(() => {
    initializeDarkMode();
  }, [initializeDarkMode]);

  useEffect(() => {
    if (!isLoading && categories?.data.length > 0) {
      setSelectedCategory(categories.data[0]._id);
    }
  }, [isLoading, categories]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAdding(true);

    try {
      const imageRef = ref(storage, `Signs/${image.name + v4()}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      await addSign({
        category: selectedCategory,
        meaning: meaning,
        image: imageUrl,
      });

      setAdding(false);
      navigate("/manage-added-signs");
      window.location.reload();
    } catch (error) {
      console.error("Error adding sign:", error);
      setAdding(false);
    }
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
                  <select
                    className={`${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-gray-300 focus:shadow-outline-gray"
                        : "border-2 outline-none focus:border-gray-200"
                    } focus:border-gray-400 focus:outline-none focus:shadow-outline-purple sm:col-span-2 text-sm rounded-lg outline-none block w-full p-2.5`}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {isLoading ? (
                      <option>Loading...</option>
                    ) : isError ? (
                      <option>Error loading categories</option>
                    ) : (
                      categories?.data.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))
                    )}
                  </select>
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
                  {adding ? "Adding..." : "Add Sign"}
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
