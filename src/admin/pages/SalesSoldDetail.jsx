import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const SalesSoldDetail = () => {
  const { user_id } = useParams();
  const [totalReturn] = useState({
    stock_roll_on: 0,
    stock_20_ml: 0,
    stock_30_ml: 0,
  });
  const [recentReturns, setrecentReturns] = useState(null);

  useEffect(() => {
    const fetchrecentReturn = async () => {
      try {
        const response = await fetch(
          `${createApiUrl(
            API_CONFIG.ENDPOINTS.USER.STOCK_SOLD_LOG_LATEST
          )}/${user_id}?order=asc&include_deleted=false`,
          {
            method: "GET",
            headers: getAuthHeader(),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setrecentReturns(data.data);

        if (totalReturn.stock_roll_on == 0) {
          data.data.map((sales) => {
            totalReturn.stock_roll_on += sales.stock_roll_on;
          });
        }

        if (totalReturn.stock_20_ml == 0) {
          data.data.map((sales) => {
            totalReturn.stock_20_ml += sales.stock_20_ml;
          });
        }
        if (totalReturn.stock_30_ml == 0) {
          data.data.map((sales) => {
            totalReturn.stock_30_ml += sales.stock_30_ml;
          });
        }

        console.log(data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    fetchrecentReturn();
  }, []);

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
                    to="/sold-management"
                    className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                  >
                    Sold Management
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
                    <span className="text-gray-400 ml-1 md:ml-2 dark:text-gray-500">
                      Detail Sold Sales
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {/* Detail Return - {recentReturns.name} */}
            </h1>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Roll On Terjual
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalReturn.stock_roll_on}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total 20ml Terjual
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalReturn.stock_20_ml}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total 30ml Terjual
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalReturn.stock_30_ml}
          </p>
        </div>
      </div>

      {/* Sold History */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Riwayat Terjual
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Toko
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Roll On
                  </th>
                  <th scope="col" className="px-4 py-3">
                    20ml
                  </th>
                  <th scope="col" className="px-4 py-3">
                    30ml
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Catatan
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentReturns?.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-3">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{item.store_name}</td>
                    <td className="px-4 py-3">{item.stock_roll_on}</td>
                    <td className="px-4 py-3">{item.stock_20_ml}</td>
                    <td className="px-4 py-3">{item.stock_30_ml}</td>
                    <td className="px-4 py-3">{item.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesSoldDetail;
