import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const SalesStock = () => {
  // Data statis untuk sales stock
  const [salesStock, setSalesStock] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserStock = async () => {
      try {
        const response = await fetch(
          createApiUrl(
            API_CONFIG.ENDPOINTS.USERSTOCK +
              `?order=asc&include_deleted=false&search_query=${searchTerm}`
          ),
          {
            method: "GET",
            headers: getAuthHeader(),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch stock data");
        }

        const data = await response.json();
        console.log(data.data);
        setSalesStock(data.data);
      } catch (error) {
        console.error("Error fetching stock:", error);
      } finally {
      }
    };

    fetchUserStock();
    console.log("disini");
  }, [searchTerm]);

  console.log("disini2");

  // Filter sales berdasarkan pencarian (nama atau area)
  // const filteredSales = salesStock.filter(
  //   (sale) =>
  //     sale.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     sale.area.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Stok Sales
            </h1>
          </div>
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            <form className="flex items-center w-full md:w-1/2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Cari nama sales atau area..."
              />
            </form>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Nama Sales
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Area
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Roll On
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      20ml
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      30ml
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Total Stok
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {salesStock?.users.map((sales) => (
                    <tr
                      key={sales.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="p-4 text-base font-medium text-gray-900 dark:text-white">
                        {sales.name}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 dark:text-white">
                        {sales.region}
                      </td>
                      <td className="p-4 text-base text-gray-900 dark:text-white">
                        {sales.stock_roll_on}
                      </td>
                      <td className="p-4 text-base text-gray-900 dark:text-white">
                        {sales.stock_20_ml}
                      </td>
                      <td className="p-4 text-base text-gray-900 dark:text-white">
                        {sales.stock_30_ml}
                      </td>
                      <td className="p-4 text-base text-gray-900 dark:text-white">
                        {sales.stock_roll_on +
                          sales.stock_20_ml +
                          sales.stock_30_ml}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Sales
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {salesStock?.total_sales}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Roll On
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {salesStock?.total_roll_on}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total 20ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {salesStock?.total_20_ml}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total 30ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {salesStock?.total_30_ml}
          </p>
        </div>
      </div>
    </>
  );
};

export default SalesStock;
