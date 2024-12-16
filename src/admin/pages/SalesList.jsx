import { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const SalesList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryValue = queryParams.get("region");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const url = createApiUrl(API_CONFIG.ENDPOINTS.USER.LIST);
        url.searchParams.append("order", "asc");
        url.searchParams.append("include_deleted", "false");
        url.searchParams.append("role_type", "sales");
        url.searchParams.append("sort_by", "name");

        if (queryValue) {
          url.searchParams.append("region", queryValue);
        }

        const response = await fetch(url, {
          method: "GET",
          headers: getAuthHeader(),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSales(data.data);
        console.log(data);
      } catch (error) {
        setSales([]);
        console.error("Failed to fetch stores:", error);
      }
    };

    fetchStores();
  }, [queryValue]);

  const calculateTotalStocks = (stores) => {
    return stores.reduce(
      (acc, store) => ({
        stock_30ml: acc.stock_30ml + store.stock_30ml,
        stock_roll_on: acc.stock_roll_on + store.stock_roll_on,
        stock_20ml: acc.stock_20ml + store.stock_20ml,
      }),
      {
        stock_30ml: 0,
        stock_roll_on: 0,
        stock_20ml: 0,
      }
    );
  };

  const filteredSales = sales.filter(
    (sale) =>
      sale.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.stores.some(
        (store) =>
          store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          store.address.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {queryValue ? `Sales - ${queryValue}` : "Semua Sales"}
            </h1>
          </div>
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            <form className="flex items-center w-full md:w-1/2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Cari sales, area, atau toko..."
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
                      Jumlah Toko
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
                  {filteredSales.map((salesPerson) => {
                    return (
                      <tr
                        onClick={() => navigate(`/sales/${salesPerson.id}`)}
                        key={salesPerson.id}
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="p-4">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {salesPerson.name}
                          </div>
                        </td>
                        <td className="p-4 text-gray-700 dark:text-gray-300">
                          {salesPerson.total_stores} Toko
                        </td>
                        <td className="p-4">
                          <div className="text-sm">
                            {salesPerson.products.map((product) => {
                              return (
                                <div>
                                  {product.product_name}: {product.total_stock}
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesList;
