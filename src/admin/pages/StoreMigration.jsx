import { useState } from "react";
import SuccessModal from "../../admin/components/SuccessModal";

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
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
    autoClose: true,
  });

  // Data statis untuk toko
  const staticStores = [
    {
      id: 1,
      name: "Toko Sejahtera",
      address: "Jl. Raya No. 123, Jakarta",
      phone: "081234567890",
      sales_name: "John Doe",
      sales_id: "1",
      products: [
        { name: "Roll On", stock: 50 },
        { name: "20ml", stock: 30 },
        { name: "30ml", stock: 20 },
      ],
    },
    {
      id: 2,
      name: "Toko Makmur",
      address: "Jl. Melati No. 45, Bandung",
      phone: "081234567891",
      sales_name: "Jane Smith",
      sales_id: "2",
      products: [
        { name: "Roll On", stock: 40 },
        { name: "20ml", stock: 25 },
        { name: "30ml", stock: 15 },
      ],
    },
    {
      id: 3,
      name: "Toko Bahagia",
      address: "Jl. Anggrek No. 67, Surabaya",
      phone: "081234567892",
      sales_name: "Mike Johnson",
      sales_id: "3",
      products: [
        { name: "Roll On", stock: 35 },
        { name: "20ml", stock: 20 },
        { name: "30ml", stock: 25 },
      ],
    },
  ];

  // Data statis untuk sales
  const staticSalesList = [
    {
      id: "1",
      name: "John Doe",
      region: "Jakarta",
      total_stores: 15,
    },
    {
      id: "2",
      name: "Jane Smith",
      region: "Bandung",
      total_stores: 12,
    },
    {
      id: "3",
      name: "Mike Johnson",
      region: "Surabaya",
      total_stores: 10,
    },
    {
      id: "4",
      name: "Sarah Wilson",
      region: "Semarang",
      total_stores: 8,
    },
    {
      id: "5",
      name: "David Brown",
      region: "Yogyakarta",
      total_stores: 9,
    },
  ];

  // Filter toko berdasarkan pencarian
  const filteredStores = staticStores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter sales berdasarkan pencarian
  const filteredSales = staticSalesList.filter(
    (sales) =>
      sales.name.toLowerCase().includes(searchSalesTerm.toLowerCase()) ||
      sales.region.toLowerCase().includes(searchSalesTerm.toLowerCase())
  );

  const handleStoreMigration = () => {
    setIsLoading(true);

    // Simulasi proses migrasi
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

  return (
    <>
      {/* Header Section */}
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Cari toko..."
              />
            </form>
          </div>
        </div>
      </div>

      {/* Stores List */}
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
                  {filteredStores.map((store) => (
                    <tr
                      key={store.id}
                      onClick={() => {
                        setSelectedStore(store);
                        setShowStoreModal(true);
                      }}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
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
                        {store.sales_name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Store Detail Modal */}
      {showStoreModal && selectedStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Detail Toko
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowMigrationModal(true)}
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Pindah Sales
                </button>
                <button
                  onClick={() => {
                    setShowStoreModal(false);
                    setSelectedStore(null);
                  }}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                >
                  Tutup
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nama Toko
                </label>
                <input
                  type="text"
                  value={selectedStore.name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  disabled
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Alamat
                </label>
                <input
                  type="text"
                  value={selectedStore.address}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  disabled
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  value={selectedStore.phone}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  disabled
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Sales Saat Ini
                </label>
                <input
                  type="text"
                  value={selectedStore.sales_name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  disabled
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Stok Produk
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {selectedStore.products.map((product, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-300 rounded-lg p-3 dark:bg-gray-700 dark:border-gray-600"
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </div>
                      <div className="text-lg text-gray-700 dark:text-gray-300">
                        {product.stock}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Migration Modal */}
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
                Sales saat ini: {selectedStore.sales_name}
              </p>
            </div>

            <div className="mb-4">
              <label className="sr-only">Search Sales</label>
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
                  {filteredSales.map((sales) => (
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

            {filteredSales.length === 0 && (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                Tidak ada sales yang ditemukan
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
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
                  Dari Sales: <span className="font-bold">{selectedStore.sales_name}</span>
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Ke Sales: <span className="font-bold">{selectedNewSalesData.name}</span>
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
                onClick={handleStoreMigration}
                disabled={isLoading}
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
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

export default StoreMigration;
