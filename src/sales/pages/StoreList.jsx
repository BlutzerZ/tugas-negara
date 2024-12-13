import { useState, useEffect } from 'react';
import storesData from '../../database/stores.json';

const StoreList = () => {
  const [stores, setStores] = useState(storesData.stores);
  const [selectedStore, setSelectedStore] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newStock, setNewStock] = useState({
    stock_30ml: '',
    stock_roll_on: '',
    stock_20ml: ''
  });

  const openDrawer = (store) => {
    setSelectedStore(store);
    setIsDrawerOpen(true);
    setNewStock({
      stock_30ml: '',
      stock_roll_on: '',
      stock_20ml: ''
    });
  };

  const closeDrawer = () => {
    setSelectedStore(null);
    setIsDrawerOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated stocks:', newStock);
    closeDrawer();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStock(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Pilih Toko Untuk di Update
            </h1>
          </div>
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            <form className="flex items-center w-full md:w-1/2">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search for stores"
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
                Nama Toko & Alamat
              </th>
              <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                Informasi Stok
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
            {stores.map((store) => (
              <tr
                key={store.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => openDrawer(store)}
              >
                <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {store.name}
                  </div>
                  <div className="text-sm">{store.address}</div>
                </td>
                <td className="p-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">
                        Stok 30ml
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {store.stock_30ml}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">
                        Stok Roll On
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {store.stock_roll_on}
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-white">
                        Stok 20ml
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {store.stock_20ml}
                      </div>
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
      {isDrawerOpen && selectedStore && (
        <div className="fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform bg-white dark:bg-gray-800">
          <h5 className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
            Detail Toko
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
              {selectedStore.name}
            </h6>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedStore.address}
            </p>
          </div>

          <div className="mb-6">
            <h6 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Stok Saat Ini
            </h6>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Stok 30ml:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedStore.stock_30ml}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Stok Roll On:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedStore.stock_roll_on}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Stok 20ml:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{selectedStore.stock_20ml}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <h6 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Update Stok
            </h6>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tambah Stok 30ml
              </label>
              <input
                type="number"
                name="stock_30ml"
                value={newStock.stock_30ml}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tambah Stok Roll On
              </label>
              <input
                type="number"
                name="stock_roll_on"
                value={newStock.stock_roll_on}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="0"
                min="0"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Tambah Stok 20ml
              </label>
              <input
                type="number"
                name="stock_20ml"
                value={newStock.stock_20ml}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="0"
                min="0"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="flex-1 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update Stok
              </button>
              <button
                type="button"
                onClick={closeDrawer}
                className="flex-1 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default StoreList;
