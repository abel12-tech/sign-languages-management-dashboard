import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDarkMode } from "../../../shared/darkModeContext";
import {
  useUpdateCategoryMutation,
  useGetCategoryByIdQuery,
} from "../api/categoriesApi";
import { storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const UpdateCategory = () => {
  const { id } = useParams();
  const { isDarkMode, initializeDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [updating, setUpdating] = useState(false);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const { data: categoryData, isLoading } = useGetCategoryByIdQuery(id);
  const [updateCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    initializeDarkMode();

    if (!isLoading && categoryData) {
      setCategory(categoryData?.data.name);
    }
  }, [initializeDarkMode, isLoading, categoryData]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpdating(true);

    try {
      let imageUrl = categoryData.image;

      if (image) {
        const imageRef = ref(storage, `Signs/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await updateCategory({ _id: id, name: category, image: imageUrl });
      setUpdating(false);
      navigate("/manage-categories");
      window.location.reload();
    } catch (error) {
      console.error("Error updating category:", error);
      setUpdating(false);
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
              Update Category
            </h4>
            <form onSubmit={handleSubmit}>
              <div
                className={`px-4 py-3 mb-8 ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } rounded-lg shadow-md`}
              >
                <label className="block mt-4 text-sm">
                  <span
                    className={`${
                      isDarkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
                    Name
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
                    Image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`${
                      isDarkMode
                        ? "border-gray-600 bg-gray-700 text-gray-300 focus:shadow-outline-gray"
                        : "border-2 outline-none focus:border-gray-200"
                    } focus:border-gray-400 focus:outline-none focus:shadow-outline-purple sm:col-span-2 text-sm rounded-lg outline-none block w-full p-2.5`}
                  />
                </label>
                <button
                  type="submit"
                  className="mt-4 bg-[#9333EA] hover:bg-[#c190ee] text-white font-semibold py-2 px-4 rounded"
                >
                  {updating ? "Updating..." : "Update Category"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UpdateCategory;
