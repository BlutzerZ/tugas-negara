import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SalesStock = () => {
  // Data statis untuk sales stock
  const [salesStock, setSalesStock] = useState([
    {
      id: 1,
      name: "John Doe",
      area: "Jakarta",
      stock_roll_on: 100,
      stock_20ml: 150,
      stock_30ml: 200
    },
    {
      id: 2,
      name: "Jane Smith",
      area: "Bandung",
      stock_roll_on: 80,
      stock_20ml: 120,
      stock_30ml: 160
    },
    {
      id: 3,
      name: "Mike Johnson",
      area: "Surabaya",
      stock_roll_on: 90,
      stock_20ml: 130,
      stock_30ml: 180
    },
    {
      id: 4,
      name: "Sarah Wilson",
      area: "Medan",
      stock_roll_on: 70,
      stock_20ml: 110,
      stock_30ml: 140
    },
    {
      id: 5,
      name: "David Brown",
      area: "Bali",
      stock_roll_on: 85,
      stock_20ml: 125,
      stock_30ml: 170
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter sales berdasarkan pencarian (nama atau area)
  const filteredSales = salesStock.filter(sale =>
    sale.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.area.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Stok Sales
            </h1>
          </div>
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            <form className="flex items-center w-full md:w-1/2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Cari nama sales atau area..."
              />
            </form>
          </div>
        </div>
      </div>
{/* Summary Cards */}
<div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Sales
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {salesStock.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Roll On
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {salesStock.reduce((sum, sales) => sum + sales.stock_roll_on, 0)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total 20ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {salesStock.reduce((sum, sales) => sum + sales.stock_20ml, 0)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total 30ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {salesStock.reduce((sum, sales) => sum + sales.stock_30ml, 0)}
          </p>
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
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Nama Sales
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Area
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Roll On
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      20ml
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      30ml
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Total Stok
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {filteredSales.map((sales) => (
                    <tr key={sales.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <td className="p-4 text-base font-medium text-gray-900 dark:text-white">
                        {sales.name}
                      </td>
                      <td className="p-4 text-base font-medium text-gray-900 dark:text-white">
                        {sales.area}
                      </td>
                      <td className="p-4 text-base text-gray-900 dark:text-white">
                        {sales.stock_roll_on}
                      </td>
                      <td className="p-4 text-base text-gray-900 dark:text-white">
                        {sales.stock_20ml}
                      </td>
                      <td className="p-4 text-base text-gray-900 dark:text-white">
                        {sales.stock_30ml}
                      </td>
                      <td className="p-4 text-base text-gray-900 dark:text-white">
                        {sales.stock_roll_on + sales.stock_20ml + sales.stock_30ml}
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

export default SalesStock;
