import { useState, useEffect } from "react";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const MyStock = () => {
  const [stockData, setStockData] = useState(null);
  const [stockHistory, setStockHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showStockModal, setShowStockModal] = useState(false);
  const [stockAction, setStockAction] = useState("add");
  const [stockForm, setStockForm] = useState({
    stock_roll_on: null,
    stock_20_ml: null,
    stock_30_ml: null,
  });

  useEffect(() => {
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
      } finally {
        setIsLoading(false);
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
          throw new Error("Failed to fetch stock data");
        }

        const data = await response.json();
        setStockHistory(data.data);
      } catch (error) {
        console.error("Error fetching stock:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyStock();
    fetchMyStockHistory();
  }, []);

  const handleStockSubmit = async (e) => {
    e.preventDefault();
    try {
      const bodyObject = Object.fromEntries(
        Object.entries(stockForm).map(([key, value]) => {
          if (stockAction === "add") {
            return [key, value == null ? 0 : Math.abs(value)];
          } else {
            return [key, value == null ? 0 : -1 * Math.abs(value)];
          }
        })
      );

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

      // Refresh stock data
      fetchMyStock();
      setShowStockModal(false);
      setStockForm({
        stock_roll_on: 0,
        stock_20_ml: 0,
        stock_30_ml: 0,
      });
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Stok Saya
            </h1>
            <button
              onClick={() => setShowStockModal(true)}
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Update Stok
            </button>
          </div>
        </div>
      </div>

      {/* Card Section */}
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

      {/* History Section */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Riwayat Perubahan Stok
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Tanggal
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Tipe
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
                </tr>
              </thead>
              <tbody>
                {stockHistory?.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-3">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{item.type}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          item.stock_roll_on >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {item.stock_roll_on}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          item.stock_20_ml >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {item.stock_20_ml}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          item.stock_30_ml >= 0
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
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
                <label className="block mb-2">Tipe Update</label>
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
                    Tambah
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
                    Kurang
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Roll On</label>
                  <input
                    type="number"
                    value={stockForm.stock_roll_on}
                    onChange={(e) =>
                      setStockForm({
                        ...stockForm,
                        stock_roll_on: parseInt(e.target.value),
                      })
                    }
                    className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  />
                </div>
                <div>
                  <label className="block mb-2">20ml</label>
                  <input
                    type="number"
                    value={stockForm.stock_20_ml}
                    onChange={(e) =>
                      setStockForm({
                        ...stockForm,
                        stock_20_ml: parseInt(e.target.value),
                      })
                    }
                    className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  />
                </div>
                <div>
                  <label className="block mb-2">30ml</label>
                  <input
                    type="number"
                    value={stockForm.stock_30_ml}
                    onChange={(e) =>
                      setStockForm({
                        ...stockForm,
                        stock_30_ml: parseInt(e.target.value),
                      })
                    }
                    className={`bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowStockModal(false);
                    setStockForm({
                      stock_roll_on: null,
                      stock_20_ml: null,
                      stock_30_ml: null,
                    });
                  }}
                  className="text-white bg-primary-900 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MyStock;
