import { useState, useEffect } from "react";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const MyStock = () => {
  const [stockData, setStockData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyStock = async () => {
      try {
        const response = await fetch(
          createApiUrl(API_CONFIG.ENDPOINTS.USER.STOCK, {
            id: localStorage.getItem("user_id"),
          }),
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

    fetchMyStock();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
            Stok Saya
          </h1>
        </div>
      </div>

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
            {stockData?.stock_20ml || 0}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Spray 30ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {stockData?.stock_30ml || 0}
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Riwayat Perubahan Stok
          </h2>
          {stockData?.history && stockData.history.length > 0 ? (
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
                  {stockData.history.map((item, index) => (
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-4 py-3">{new Date(item.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{item.type}</td>
                      <td className="px-4 py-3">{item.stock_roll_on}</td>
                      <td className="px-4 py-3">{item.stock_20ml}</td>
                      <td className="px-4 py-3">{item.stock_30ml}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Belum ada riwayat perubahan stok
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyStock;
