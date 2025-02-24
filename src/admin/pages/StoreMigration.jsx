import { useEffect, useState } from "react";
import SuccessModal from "../components/SuccessModal";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const StoreMigration = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSalesTerm, setSearchSalesTerm] = useState("");
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [showMigrationModal, setShowMigrationModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedNewSales, setSelectedNewSales] = useState("");
  const [selectedNewSalesData, setSelectedNewSalesData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedStore, setEditedStore] = useState(null);
  const [stores, setStores] = useState([]);
  const [sales, setSales] = useState([]);

  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
    autoClose: true,
  });

  // Fungsi untuk mengambil data dari API
  const fetchStores = async () => {
    try {
      const response = await fetch(
        `${createApiUrl(
          API_CONFIG.ENDPOINTS.STORES.LIST
        )}?order=asc&include_deleted=false&search_query=${searchTerm}`,
        {
          method: "GET",
          headers: getAuthHeader(),
        }
      );

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

  const fetchSales = async () => {
    try {
      const url = new URL(createApiUrl(API_CONFIG.ENDPOINTS.USER.LIST));
      // const url = new URL();
      url.searchParams.append("order", "asc");
      url.searchParams.append("include_deleted", "false");
      url.searchParams.append("role_type", "sales");
      url.searchParams.append("sort_by", "name");
      url.searchParams.append("limit", 5);
      url.searchParams.append("search_query", searchSalesTerm);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSales(data.data);
    } catch (error) {
      setSales([]);
      console.error("Failed to fetch stores:", error);
    }
  };

  const fetchChangeSales = async () => {
    try {
      const formDataSubmit = new FormData();
      formDataSubmit.append("user_id", selectedNewSales);

      const url = new URL(
        createApiUrl(API_CONFIG.ENDPOINTS.STORES.LIST) + `/${selectedStore.id}`
      );
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: formDataSubmit,
      });

      if (response.ok) {
        fetchStores();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Failed to fetch stores:", error);
    }
  };

  const handleShowUser = () => {
    setShowMigrationModal(true);
    fetchSales();
  };

  // Fungsi untuk menangani migrasi toko
  const handleStoreMigration = () => {
    setIsLoading(true);

    fetchChangeSales();

    setTimeout(() => {
      setModalConfig({
        type: "success",
        message: "Toko berhasil dipindahkan",
        autoClose: true,
      });
      setShowModal(true);
      setShowMigrationModal(false);
      setShowConfirmationModal(false);
      setSelectedNewSales("");
      setSearchSalesTerm("");
      setSelectedNewSalesData(null);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchStores();
  }, [searchTerm]);

  useEffect(() => {
    fetchSales();
  }, [searchSalesTerm]);

  return (
    <>
      {/* Bagian Header */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Migrasi Toko
            </h1>
          </div>
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            <form className="flex items-center w-full md:w-1/2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Cari toko..."
              />
            </form>
          </div>
        </div>
      </div>

      {/* Daftar Toko */}
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
                      Alamat
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Sales Saat Ini
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {stores.map((store) => (
                    <tr
                      onClick={() => {
                        setSelectedStore(store);
                        handleShowUser();
                      }}
                      key={store.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <td className="p-4">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {store.name}
                        </div>
                      </td>
                      <td className="p-4 text-gray-700 dark:text-gray-300">
                        {store.address}
                      </td>
                      <td className="p-4 text-gray-700 dark:text-gray-300">
                        {store.user_name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Migrasi */}
      {showMigrationModal && selectedStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Pindah Toko: {selectedStore.name}
              </h3>
              <button
                onClick={() => {
                  setShowMigrationModal(false);
                  setSearchSalesTerm("");
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Sales saat ini: {selectedStore.user_name}
              </p>
            </div>

            <div className="mb-4">
              <label className="sr-only">Cari Sales</label>
              <input
                type="text"
                value={searchSalesTerm}
                onChange={(e) => setSearchSalesTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Cari sales berdasarkan nama atau wilayah..."
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Sales
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Wilayah
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Jumlah Toko
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sales) => (
                    <tr
                      key={sales.id}
                      onClick={() => {
                        setSelectedNewSales(sales.id);
                        setSelectedNewSalesData(sales);
                        setShowConfirmationModal(true);
                      }}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                        {sales.name}
                      </td>
                      <td className="px-4 py-3">{sales.region}</td>
                      <td className="px-4 py-3">{sales.total_stores}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {sales.length === 0 && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                Tidak ada sales yang ditemukan
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal Konfirmasi */}
      {showConfirmationModal && selectedStore && selectedNewSalesData && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md dark:bg-gray-800">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Konfirmasi Pemindahan Toko
              </h3>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Apakah Anda yakin ingin memindahkan:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Toko: <span className="font-bold">{selectedStore.name}</span>
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Dari Sales:{" "}
                  <span className="font-bold">{selectedStore.user_name}</span>
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Ke Sales:{" "}
                  <span className="font-bold">{selectedNewSalesData.name}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowConfirmationModal(false);
                  setSelectedNewSalesData(null);
                }}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                disabled={isLoading}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleStoreMigration();
                }}
                disabled={isLoading}
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-4 w-4 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Memproses...
                  </div>
                ) : (
                  "Ya, Pindahkan"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sukses/Error */}
      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalConfig.message}
        type={modalConfig.type}
        autoClose={modalConfig.autoClose}
      />
    </>
  );
};

export default StoreMigration;
