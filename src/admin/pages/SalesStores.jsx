import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const SalesStores = () => {
  const { sales_id } = useParams();
  const [stores, setstores] = useState(null);
  const [sales, setSales] = useState({});

  useEffect(() => {
    const fetchUserStore = async () => {
      try {
        const response = await fetch(
          createApiUrl(API_CONFIG.ENDPOINTS.USER.STORES, { id: sales_id }) +
            "?order=asc&include_deleted=false",
          {
            method: "GET",
            headers: getAuthHeader(),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setstores(data.data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    const fetchSales = async () => {
      try {
        const response = await fetch(
          createApiUrl(API_CONFIG.ENDPOINTS.USER.LIST + `/${sales_id}`),
          {
            method: "GET",
            headers: getAuthHeader(),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSales(data.data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    fetchUserStore();
    fetchSales();
  }, []);

  if (stores == null) {
    return (
      <>
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full mb-1">
            <div className="mb-4">
              <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  <li className="inline-flex items-center">
                    <Link
                      to="/sales"
                      className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                    >
                      Sales
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span
                        className="text-gray-400 ml-1 md:ml-2 dark:text-gray-500"
                        aria-current="page"
                      >
                        {sales.name}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Daftar Toko - {sales.name}
              </h1>
            </div>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <p className="text-center">Empty</p>
        </div>
      </>
    );
  } else {
    return (
      <>
        {/* Header Section */}
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full mb-1">
            <div className="mb-4">
              <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  <li className="inline-flex items-center">
                    <Link
                      to="/sales"
                      className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                    >
                      Sales
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span
                        className="text-gray-400 ml-1 md:ml-2 dark:text-gray-500"
                        aria-current="page"
                      >
                        {sales.name}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Daftar Toko - {sales.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Stores Grid */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => openDrawer(store)}
            >
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {store.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {store.address}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {store.num}
                </p>
                <div className="mt-auto">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {store.products.map((product) => {
                      return (
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
                          <div className="font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            {product.stock}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
};
export default SalesStores;
