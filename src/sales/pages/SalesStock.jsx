import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const SalesStock = () => {
  const [salesStock, setSalesStock] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSalesStock = async () => {
      try {
        const response = await fetch(
          createApiUrl(API_CONFIG.ENDPOINTS.SALES.STOCK),
          {
            method: "GET",
            headers: getAuthHeader(),
          }
        );
        if (!response.ok) throw new Error("Failed to fetch sales stock");
        const data = await response.json();
        setSalesStock(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSalesStock();
  }, []);

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Stok Sales
          </h1>
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            <form className="flex items-center w-full md:w-1/2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                placeholder="Cari sales..."
              />
            </form>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                      Nama Sales
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                      Roll On
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                      20ml
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                      30ml
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {salesStock?.map((sales) => (
                    <tr key={sales.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="p-4 text-sm font-normal text-gray-900 dark:text-white">
                        {sales.name}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-900 dark:text-white">
                        {sales.stock_roll_on}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-900 dark:text-white">
                        {sales.stock_20ml}
                      </td>
                      <td className="p-4 text-sm font-normal text-gray-900 dark:text-white">
                        {sales.stock_30ml}
                      </td>
                      <td className="p-4">
                        <Link
                          to={`/sales-stock/${sales.id}/edit`}
                          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2"
                        >
                          Edit Stok
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesStock;
