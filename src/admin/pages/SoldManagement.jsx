import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const SoldManagement = () => {
  const [totalSold] = useState({
    stock_roll_on: 0,
    stock_20_ml: 0,
    stock_30_ml: 0,
  });
  const [salesSold, setsalesSold] = useState(null);
  const [recentSold, setrecentSold] = useState(null);

  useEffect(() => {
    const fetchSalesReturn = async () => {
      try {
        const response = await fetch(
          `${createApiUrl(
            API_CONFIG.ENDPOINTS.USER.STOCK_SOLD_LOG
          )}?order=asc&include_deleted=false`,
          {
            method: "GET",
            headers: getAuthHeader(),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setsalesSold(data.data);

        if (totalSold.stock_roll_on == 0) {
          data.data.map((sales) => {
            totalSold.stock_roll_on += sales.stock_roll_on;
          });
        }

        if (totalSold.stock_20_ml == 0) {
          data.data.map((sales) => {
            totalSold.stock_20_ml += sales.stock_20_ml;
          });
        }
        if (totalSold.stock_30_ml == 0) {
          data.data.map((sales) => {
            totalSold.stock_30_ml += sales.stock_30_ml;
          });
        }

        console.log(data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    const fetchrecentReturn = async () => {
      try {
        const response = await fetch(
          `${createApiUrl(
            API_CONFIG.ENDPOINTS.USER.STOCK_SOLD_LOG_LATEST
          )}?order=asc&include_deleted=false`,
          {
            method: "GET",
            headers: getAuthHeader(),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setrecentSold(data.data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    fetchSalesReturn();
    fetchrecentReturn();
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Sales Management
            </h1>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Terjual Roll On
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalSold.stock_roll_on}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Terjual 20ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalSold.stock_20_ml}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Terjual 30ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalSold.stock_30_ml}
          </p>
        </div>
      </div>

      {/* Sales Sold Table */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Penjualan per Sales
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Sales
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Region
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {salesSold?.map((sales, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-3">{sales.user_name}</td>
                    <td className="px-4 py-3">{sales.region}</td>
                    <td className="px-4 py-3">{sales.stock_roll_on}</td>
                    <td className="px-4 py-3">{sales.stock_20_ml}</td>
                    <td className="px-4 py-3">{sales.stock_30_ml}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/sold/sales/${sales.user_id}`}
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-500 dark:hover:text-primary-400"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Penjualan Terbaru
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Sales
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
                {recentSold?.map((item) => (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-3">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{item.user_name}</td>
                    <td className="px-4 py-3">{item.store_name}</td>
                    <td className="px-4 py-3">{item.stock_roll_on}</td>
                    <td className="px-4 py-3">{item.stock_20_ml}</td>
                    <td className="px-4 py-3">{item.stock_30_ml}</td>
                    <td className="px-4 py-3">{item.notes}</td>
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

export default SoldManagement;
