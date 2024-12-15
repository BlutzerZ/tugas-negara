import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StoreListStock = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fungsi untuk mengambil data dari API
    const fetchStores = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/stores?order=asc&include_deleted=false",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json(); // Parsing JSON dari response
        setStores(data.data); // Asumsikan API mengembalikan array store
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    fetchStores();
  }, []); // [] memastikan API hanya dipanggil sekali saat komponen di-mount

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
              Daftar Toko
            </h1>
            <Link
              to="/stores/add"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
              Tambah Toko
            </Link>
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
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {filteredStores.map((store) => (
                    <tr
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
                      <td className="p-4">
                        <Link
                          to={`/stores/${store.id}/edit-stock`}
                          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                        >
                          Edit
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

export default StoreListStock;
