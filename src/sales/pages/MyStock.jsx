import { useState, useEffect } from "react";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";
import SuccessModal from "../../admin/components/SuccessModal";

const MyStock = () => {
  const [stockData, setStockData] = useState(null);
  const [stockHistory, setStockHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockAction, setStockAction] = useState("add");
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: 'success',
    message: '',
    autoClose: true
  });
  const [stockForm, setStockForm] = useState({
    stock_roll_on: 0,
    stock_20_ml: 0,
    stock_30_ml: 0,
  });

  const fetchMyStock = async () => {
    try {
      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.USER.STOCK),
        {
          method: "GET",
          headers: getAuthHeader(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch stock data");
      }

      const data = await response.json();
      setStockData(data.data);
    } catch (error) {
      console.error("Error fetching stock:", error);
      setModalConfig({
        type: 'error',
        message: 'Gagal mengambil data stok',
        autoClose: false
      });
      setShowModal(true);
    }
  };

  const fetchMyStockHistory = async () => {
    try {
      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.USER.STOCK_DETAIL),
        {
          method: "GET",
          headers: getAuthHeader(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch stock history");
      }

      const data = await response.json();
      setStockHistory(data.data);
    } catch (error) {
      console.error("Error fetching stock history:", error);
      setModalConfig({
        type: 'error',
        message: 'Gagal mengambil riwayat stok',
        autoClose: false
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

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const bodyObject = {
        ...stockForm,
        action: stockAction
      };

      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.USER.STOCK),
        {
          method: "PUT",
          headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyObject),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update stock");
      }

      setModalConfig({
        type: 'success',
        message: 'Stok berhasil diperbarui',
        autoClose: true
      });
      setShowModal(true);

      // Refresh data
      await fetchMyStock();
      await fetchMyStockHistory();
      
      setShowStockModal(false);
      setStockForm({
        stock_roll_on: 0,
        stock_20_ml: 0,
        stock_30_ml: 0,
      });
    } catch (error) {
      console.error("Error updating stock:", error);
      setModalConfig({
        type: 'error',
        message: 'Gagal memperbarui stok',
        autoClose: false
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    setStockForm(prev => ({
      ...prev,
      [name]: Math.max(0, numValue) // Prevent negative values
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Stok Saya
            </h1>
            <button
              onClick={() => setShowStockModal(true)}
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
              disabled={isLoading}
            >
              Update Stok
            </button>
          </div>
        </div>
      </div>

      {/* Stock Cards */}
      <div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Roll On
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stockData?.stock_roll_on || 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Spray 20ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stockData?.stock_20_ml || 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Spray 30ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stockData?.stock_30_ml || 0}
          </p>
        </div>
      </div>

      {/* Stock History Table */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Riwayat Perubahan Stok
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Tanggal</th>
                  <th scope="col" className="px-4 py-3">Tipe</th>
                  <th scope="col" className="px-4 py-3">Roll On</th>
                  <th scope="col" className="px-4 py-3">20ml</th>
                  <th scope="col" className="px-4 py-3">30ml</th>
                </tr>
              </thead>
              <tbody>
                {stockHistory?.map((item, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-4 py-3">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{item.type}</td>
                    <td className="px-4 py-3">
                      <span className={item.stock_roll_on >= 0 ? "text-green-600" : "text-red-600"}>
                        {item.stock_roll_on}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={item.stock_20_ml >= 0 ? "text-green-600" : "text-red-600"}>
                        {item.stock_20_ml}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={item.stock_30_ml >= 0 ? "text-green-600" : "text-red-600"}>
                        {item.stock_30_ml}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Stock Update Modal */}
      {showStockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md dark:bg-gray-800">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
              Update Stok
            </h3>
            <form onSubmit={handleStockSubmit}>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700 dark:text-gray-300">Tipe Update</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stockAction"
                      value="add"
                      checked={stockAction === "add"}
                      onChange={(e) => setStockAction(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Tambah</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="stockAction"
                      value="reduce"
                      checked={stockAction === "reduce"}
                      onChange={(e) => setStockAction(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Kurang</span>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">Roll On</label>
                  <input
                    type="number"
                    name="stock_roll_on"
                    value={stockForm.stock_roll_on}
                    onChange={handleInputChange}
                    min="0"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">20ml</label>
                  <input
                    type="number"
                    name="stock_20_ml"
                    value={stockForm.stock_20_ml}
                    onChange={handleInputChange}
                    min="0"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-700 dark:text-gray-300">30ml</label>
                  <input
                    type="number"
                    name="stock_30_ml"
                    value={stockForm.stock_30_ml}
                    onChange={handleInputChange}
                    min="0"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowStockModal(false);
                    setStockForm({
                      stock_roll_on: 0,
                      stock_20_ml: 0,
                      stock_30_ml: 0,
                    });
                  }}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? 'Memproses...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

export default MyStock;
