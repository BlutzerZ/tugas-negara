import { useState } from 'react';
import salesData from '../../database/sales.json';

const SalesList = () => {
  const [sales, setSales] = useState(salesData.sales);
  const [selectedSales, setSelectedSales] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = (salesPerson) => {
    setSelectedSales(salesPerson);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setSelectedSales(null);
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Daftar Sales
            </h1>
          </div>
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            <form className="flex items-center w-full md:w-1/2">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search sales"
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
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Nama Sales & Wilayah
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Informasi Toko
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {sales.map((salesPerson) => (
                    <tr
                      key={salesPerson.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => openDrawer(salesPerson)}
                    >
                      <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {salesPerson.name}
                        </div>
                        <div className="text-sm">{salesPerson.region}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-white">
                            Jumlah Toko: {salesPerson.total_stores}
                          </div>
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

      {/* Drawer */}
      {isDrawerOpen && selectedSales && (
        <div className="fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800">
          <h5 className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
            Detail Sales
          </h5>
          <button
            type="button"
            onClick={closeDrawer}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="mb-6">
            <h6 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedSales.name}
            </h6>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedSales.region}
            </p>
          </div>

          <div className="mb-6">
            <h6 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Daftar Toko ({selectedSales.total_stores})
            </h6>
            <ul className="space-y-2">
              {selectedSales.stores.map((store, index) => (
                <li 
                  key={index}
                  className="text-sm text-gray-500 dark:text-gray-400 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  {store}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default SalesList;
