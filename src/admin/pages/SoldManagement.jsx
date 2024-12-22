import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SoldManagement = () => {
  const [totalSold] = useState({
    stock_roll_on: 150,
    stock_20_ml: 200,
    stock_30_ml: 175,
  });

  const [salesSold] = useState([
    {
      user_id: 1,
      user_name: "John Doe",
      region: "Jakarta",
      stock_roll_on: 50,
      stock_20_ml: 75,
      stock_30_ml: 60,
    },
    {
      user_id: 2,
      user_name: "Jane Smith",
      region: "Bandung",
      stock_roll_on: 40,
      stock_20_ml: 55,
      stock_30_ml: 45,
    },
    {
      user_id: 3,
      user_name: "Mike Johnson",
      region: "Bogor",
      stock_roll_on: 60,
      stock_20_ml: 70,
      stock_30_ml: 70,
    },
  ]);

  const [recentSold] = useState([
    {
      id: 1,
      date: "2024-01-15",
      user_name: "John Doe",
      store_name: "Toko A",
      stock_roll_on: 10,
      stock_20_ml: 15,
      stock_30_ml: 12,
      notes: "Penjualan reguler"
    },
    {
      id: 2,
      date: "2024-01-14",
      user_name: "Jane Smith",
      store_name: "Toko B",
      stock_roll_on: 8,
      stock_20_ml: 20,
      stock_30_ml: 15,
      notes: "Penjualan event"
    },
    {
      id: 3,
      date: "2024-01-13",
      user_name: "Mike Johnson",
      store_name: "Toko C",
      stock_roll_on: 12,
      stock_20_ml: 18,
      stock_30_ml: 14,
      notes: "Penjualan reguler"
    }
  ]);

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Sales Management
            </h1>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Terjual Roll On
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalSold.stock_roll_on}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Terjual 20ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalSold.stock_20_ml}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Terjual 30ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {totalSold.stock_30_ml}
          </p>
        </div>
      </div>

      {/* Sales Sold Table */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Penjualan per Sales
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Sales</th>
                  <th scope="col" className="px-4 py-3">Region</th>
                  <th scope="col" className="px-4 py-3">Roll On</th>
                  <th scope="col" className="px-4 py-3">20ml</th>
                  <th scope="col" className="px-4 py-3">30ml</th>
                  <th scope="col" className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salesSold.map((sales) => (
                  <tr key={sales.user_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-4 py-3">{sales.user_name}</td>
                    <td className="px-4 py-3">{sales.region}</td>
                    <td className="px-4 py-3">{sales.stock_roll_on}</td>
                    <td className="px-4 py-3">{sales.stock_20_ml}</td>
                    <td className="px-4 py-3">{sales.stock_30_ml}</td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/sold/sales/${sales.user_id}`}
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-500 dark:hover:text-primary-400"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Recent Sales */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Penjualan Terbaru
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Tanggal</th>
                  <th scope="col" className="px-4 py-3">Sales</th>
                  <th scope="col" className="px-4 py-3">Toko</th>
                  <th scope="col" className="px-4 py-3">Roll On</th>
                  <th scope="col" className="px-4 py-3">20ml</th>
                  <th scope="col" className="px-4 py-3">30ml</th>
                  <th scope="col" className="px-4 py-3">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {recentSold.map((item) => (
                  <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-4 py-3">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{item.user_name}</td>
                    <td className="px-4 py-3">{item.store_name}</td>
                    <td className="px-4 py-3">{item.stock_roll_on}</td>
                    <td className="px-4 py-3">{item.stock_20_ml}</td>
                    <td className="px-4 py-3">{item.stock_30_ml}</td>
                    <td className="px-4 py-3">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default SoldManagement;
