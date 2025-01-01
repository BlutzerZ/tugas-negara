import { useState, useEffect } from "react";
import SuccessModal from "../components/SuccessModal";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const SupervisorEdit = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [selectedSales, setSelectedSales] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
    autoClose: true,
  });

  const fetchSales = async () => {
    try {
      const url = new URL(createApiUrl(API_CONFIG.ENDPOINTS.USER.LIST));
      // const url = new URL();
      url.searchParams.append("order", "asc");
      url.searchParams.append("include_deleted", "false");
      url.searchParams.append("role_type", "supervisor");
      url.searchParams.append("sort_by", "name");
      url.searchParams.append("search_query", searchTerm);

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

  useEffect(() => {
    fetchSales();
  }, [searchTerm]);

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Edit Supervisor
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
                      Nama Supervisor
                    </th>
                    <th
                      scope="col"
                      className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                    >
                      Wilayah
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {sales.map((salesPerson, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() =>
                          navigate(`/supervisor-edit/${salesPerson.id}`)
                        }
                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <td className="p-4">
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {salesPerson.name}
                          </div>
                        </td>
                        <td className="p-4 text-gray-700 dark:text-gray-300">
                          {salesPerson.region}
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

      {/* Modal Konfirmasi */}
      {showConfirmationModal && selectedSales && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md dark:bg-gray-800">
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Konfirmasi Penghapusan Sales
              </h3>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Apakah Anda yakin ingin menghapus:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Nama: <span className="font-bold">{selectedSales.name}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowConfirmationModal(false);
                }}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                disabled={isLoading}
              >
                Batal
              </button>
              <button
                onClick={() => {
                  handleUserDelete();
                }}
                disabled={isLoading}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
                  "Ya, Hapus"
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

export default SupervisorEdit;
