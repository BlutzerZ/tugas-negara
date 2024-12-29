import { useEffect, useState } from "react";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const Dashboard = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(createApiUrl(API_CONFIG.ENDPOINTS.INFO), {
          method: "GET",
          headers: getAuthHeader(),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInfo(data.data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    fetchStores();
  }, []);

  if (!info) {
    return <p className="text-center">Loading</p>;
  }

  if (localStorage.getItem("role") == "ADMIN") {
    return (
      <div className="px-4 pt-6">
        <div className="container mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full dark:bg-gray-700">
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.356 4.184a1 1 0 00.95.69h4.396c.969 0 1.371 1.24.588 1.81l-3.557 2.57a1 1 0 00-.364 1.118l1.356 4.184c.3.921-.755 1.688-1.54 1.118l-3.557-2.57a1 1 0 00-1.176 0l-3.557 2.57c-.784.57-1.839-.197-1.54-1.118l1.356-4.184a1 1 0 00-.364-1.118L2.462 9.61c-.783-.57-.38-1.81.588-1.81h4.396a1 1 0 00.95-.69l1.356-4.184z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Jumlah Sales
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {info.total_sales}
                </h2>
              </div>
            </div>
          </div>

          {/* Card 1 */}
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full dark:bg-gray-700">
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.356 4.184a1 1 0 00.95.69h4.396c.969 0 1.371 1.24.588 1.81l-3.557 2.57a1 1 0 00-.364 1.118l1.356 4.184c.3.921-.755 1.688-1.54 1.118l-3.557-2.57a1 1 0 00-1.176 0l-3.557 2.57c-.784.57-1.839-.197-1.54-1.118l1.356-4.184a1 1 0 00-.364-1.118L2.462 9.61c-.783-.57-.38-1.81.588-1.81h4.396a1 1 0 00.95-.69l1.356-4.184z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Jumlah Toko
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {info.total_store}
                </h2>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full dark:bg-gray-700">
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 2a1 1 0 011 1v2h6V3a1 1 0 112 0v2h1.586A2 2 0 0118 7.414L16.414 9 18 10.586A2 2 0 0116.586 13H15v2a1 1 0 11-2 0v-2H7v2a1 1 0 11-2 0v-2H3.414A2 2 0 011 10.586L2.586 9 1 7.414A2 2 0 013.414 5H5V3a1 1 0 011-1z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Stock Roll On
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {info.total_roll_on}
                </h2>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full dark:bg-gray-700">
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 2a1 1 0 011 1v2h6V3a1 1 0 112 0v2h1.586A2 2 0 0118 7.414L16.414 9 18 10.586A2 2 0 0116.586 13H15v2a1 1 0 11-2 0v-2H7v2a1 1 0 11-2 0v-2H3.414A2 2 0 011 10.586L2.586 9 1 7.414A2 2 0 013.414 5H5V3a1 1 0 011-1z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Stock Spray 20 ml
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {info.total_20_ml}
                </h2>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full dark:bg-gray-700">
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a3 3 0 00-3 3v3H4a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Stock Spray 30 ml
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {info.total_30_ml}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="px-4 pt-6">
        <div className="container mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full dark:bg-gray-700">
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.356 4.184a1 1 0 00.95.69h4.396c.969 0 1.371 1.24.588 1.81l-3.557 2.57a1 1 0 00-.364 1.118l1.356 4.184c.3.921-.755 1.688-1.54 1.118l-3.557-2.57a1 1 0 00-1.176 0l-3.557 2.57c-.784.57-1.839-.197-1.54-1.118l1.356-4.184a1 1 0 00-.364-1.118L2.462 9.61c-.783-.57-.38-1.81.588-1.81h4.396a1 1 0 00.95-.69l1.356-4.184z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Jumlah Toko
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {info.total_store}
                </h2>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full dark:bg-gray-700">
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 2a1 1 0 011 1v2h6V3a1 1 0 112 0v2h1.586A2 2 0 0118 7.414L16.414 9 18 10.586A2 2 0 0116.586 13H15v2a1 1 0 11-2 0v-2H7v2a1 1 0 11-2 0v-2H3.414A2 2 0 011 10.586L2.586 9 1 7.414A2 2 0 013.414 5H5V3a1 1 0 011-1z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Stock Roll On
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {info.total_roll_on}
                </h2>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full dark:bg-gray-700">
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 2a1 1 0 011 1v2h6V3a1 1 0 112 0v2h1.586A2 2 0 0118 7.414L16.414 9 18 10.586A2 2 0 0116.586 13H15v2a1 1 0 11-2 0v-2H7v2a1 1 0 11-2 0v-2H3.414A2 2 0 011 10.586L2.586 9 1 7.414A2 2 0 013.414 5H5V3a1 1 0 011-1z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Stock Spray 20 ml
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {info.total_20_ml}
                </h2>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-full dark:bg-gray-700">
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a3 3 0 00-3 3v3H4a2 2 0 00-2 2v9a2 2 0 002 2h12a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Stock Spray 30 ml
                </p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {info.total_30_ml}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
