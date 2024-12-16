import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const StoreListStock = () => {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const baseUrl = createApiUrl(API_CONFIG.ENDPOINTS.STORES.LIST);
        const params = new URLSearchParams({
          order: "asc",
          include_deleted: "false",
          search_query: searchTerm,
        });

        const urlWithParams = `${baseUrl}?${params.toString()}`;

        const response = await fetch(urlWithParams, {
          method: "GET",
          headers: getAuthHeader(),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStores(data.data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    fetchStores();
  }, [searchTerm]);

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Daftar Stock Toko
            </h1>
          </div>
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            <form className="flex items-center w-full md:w-1/2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Cari toko..."
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
                      Nama Toko
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Stok
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {filteredStores.map((store) => (
                    <tr
                      onClick={() => {
                        navigate(`/stores/${store.id}/edit-stock`);
                      }}
                      key={store.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="p-4">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {store.name}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          {store.products.map((product) => {
                            return (
                              <div>
                                <span className="font-medium">
                                  {product.name}:
                                </span>{" "}
                                {product.stock}
                              </div>
                            );
                          })}
                          {/* <div>
                            <span className="font-medium">Roll:</span>{" "}
                            {store.stock_roll_on}
                          </div>
                          <div>
                            <span className="font-medium">20ml:</span>{" "}
                            {store.stock_20ml}
                          </div> */}
                        </div>
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

export default StoreListStock;
