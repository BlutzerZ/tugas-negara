import { useEffect, useState } from "react";
import SuccessModal from "../../admin/components/SuccessModal";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const Sold = () => {
  const [stockData, setstockData] = useState(null);
  const [stockDataHistory, setstockDataHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
    autoClose: true,
  });

  const fetchMyStock = async () => {
    try {
      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.USER.STOCK_REDUCE),
        {
          method: "GET",
          headers: getAuthHeader(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }

      const data = await response.json();
      setstockData(data.data);
    } catch (error) {
      console.error("Error fetching stock:", error);
      setModalConfig({
        type: "error",
        message: "Gagal mengambil data stok",
        autoClose: false,
      });
      setShowModal(true);
    }
  };

  const fetchMyStockHistory = async () => {
    try {
      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.USER.STOCK_DETAIL_REDUCE),
        {
          method: "GET",
          headers: getAuthHeader(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch stock history");
      }

      const data = await response.json();
      setstockDataHistory(data.data);
    } catch (error) {
      console.error("Error fetching stock history:", error);
      setModalConfig({
        type: "error",
        message: "Gagal mengambil riwayat stok",
        autoClose: false,
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyStock();
    fetchMyStockHistory();
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Stock Terjual
            </h1>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Return Roll On
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stockData?.stock_roll_on || 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Return 20ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stockData?.stock_20_ml || 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Return 30ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stockData?.stock_30_ml || 0}
          </p>
        </div>
      </div>

      {/* Return History Table */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Riwayat Return
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Toko
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Tanggal
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
                {stockDataHistory?.map((item) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-4 py-3">{item.store_name}</td>
                    <td className="px-4 py-3">{item.date}</td>
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

      {/* Success/Error Modal */}
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

export default Sold;
