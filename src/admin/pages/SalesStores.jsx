import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import SuccessModal from "../../admin/components/SuccessModal";

// Import leaflet icons
import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Fungsi untuk mendapatkan URL gambar
const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  return `${import.meta.env.VITE_API_BASE_URL}/${imagePath.replace(/^\//, "")}`;
};

// Komponen untuk mengatur center peta
const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

const SalesStores = () => {
  const { sales_id } = useParams();
  const navigate = useNavigate();
  const [stores, setStores] = useState(null);
  const [sales, setSales] = useState({});
  const [selectedStore, setSelectedStore] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedStore, setEditedStore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
    autoClose: true,
  });

  const fetchUserStore = async () => {
    try {
      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.USER.STORES, { id: sales_id }) +
          "?order=asc&include_deleted=false",
        {
          method: "GET",
          headers: getAuthHeader(),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setStores(data.data);
    } catch (error) {
      console.error("Failed to fetch stores:", error);
    }
  };

  const fetchSales = async () => {
    try {
      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.USER.LIST + `/${sales_id}`),
        {
          method: "GET",
          headers: getAuthHeader(),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSales(data.data);
    } catch (error) {
      console.error("Failed to fetch sales:", error);
    }
  };

  useEffect(() => {
    fetchUserStore();
    fetchSales();
  }, [sales_id]);

  const handleEditStore = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", editedStore.name);
      formData.append("address", editedStore.address);
      formData.append("num", editedStore.num);
      formData.append("loc", editedStore.loc);

      if (editedStore.image instanceof File) {
        formData.append("image", editedStore.image);
      }

      editedStore.products.forEach((product) => {
        formData.append(`products[${product.id}]`, product.stock);
      });

      const response = await fetch(
        createApiUrl(`${API_CONFIG.ENDPOINTS.STORES.LIST}/${editedStore.id}`),
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengupdate toko");
      }

      setModalConfig({
        type: "success",
        message: "Toko berhasil diupdate",
        autoClose: true,
      });
      setShowModal(true);
      setShowEditModal(false);
      setShowDetail(false);
      fetchUserStore();
    } catch (error) {
      setModalConfig({
        type: "error",
        message: error.message,
        autoClose: false,
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStore = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        createApiUrl(`${API_CONFIG.ENDPOINTS.STORES.LIST}/${selectedStore.id}`),
        {
          method: "DELETE",
          headers: getAuthHeader(),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus toko");
      }

      setModalConfig({
        type: "success",
        message: "Toko berhasil dihapus",
        autoClose: true,
      });
      setShowModal(true);
      setShowDeleteModal(false);
      setShowDetail(false);
      fetchUserStore();
    } catch (error) {
      setModalConfig({
        type: "error",
        message: error.message,
        autoClose: false,
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const openStoreDetail = (store) => {
    setSelectedStore(store);
    setShowDetail(true);
  };

  const StoreDetail = ({ store, onClose }) => {
    const locMatch = store.loc?.match(/\(([-\d.]+),\s*([-\d.]+)\)/);
    const mapCenter = locMatch
      ? [parseFloat(locMatch[1]), parseFloat(locMatch[2])]
      : [-6.2, 106.816666];
    const imageUrl = getImageUrl(store.image);

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
        <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white dark:bg-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Detail Toko - {store.name}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setEditedStore({ ...store });
                  setShowEditModal(true);
                }}
                className="text-blue-600 hover:text-blue-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="text-red-600 hover:text-red-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Stok Produk:
              </p>
              <div className="grid grid-cols-3 gap-2">
                {store.products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-gray-100 dark:bg-gray-700 p-2 rounded"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {product.stock}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nomor Telepon:
              </p>
              <p className="text-gray-900 dark:text-white">{store.num}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Alamat:
              </p>
              <p className="text-gray-900 dark:text-white">{store.address}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Lokasi:
              </p>
              <div style={{ height: "300px" }}>
                <MapContainer
                  center={mapCenter}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={mapCenter} />
                  <ChangeMapCenter center={mapCenter} />
                </MapContainer>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Koordinat: {store.loc}
              </div>
            </div>

            {imageUrl && (
              <div className="store-image-container">
                <img
                  src={imageUrl}
                  alt={store.name}
                  className="max-w-full h-auto rounded-lg"
                  onError={(e) => {
                    console.error("Error loading image:", e);
                    e.target.parentElement.innerHTML =
                      '<div class="text-gray-400">Gambar tidak tersedia</div>';
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (!stores) {
    return (
      <>
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
          <div className="w-full mb-1">
            <div className="mb-4">
              <nav className="flex mb-5" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  <li className="inline-flex items-center">
                    <Link
                      to="/sales"
                      className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                    >
                      Sales
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="text-gray-400 ml-1 md:ml-2 dark:text-gray-500">
                        {sales.name}
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                Loading...
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <nav className="flex mb-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link
                    to="/sales"
                    className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                  >
                    Sales
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-gray-400 ml-1 md:ml-2 dark:text-gray-500">
                      {sales.name}
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Daftar Toko - {sales.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stores.length === 0 ? (
          <p className="text-center col-span-full text-gray-500 dark:text-gray-400">
            Tidak ada toko
          </p>
        ) : (
          stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-lg shadow dark:bg-gray-800 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => openStoreDetail(store)}
            >
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {store.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {store.address}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  {store.num}
                </p>
                <div className="mt-auto">
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    {store.products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-gray-100 dark:bg-gray-700 p-2 rounded"
                      >
                        <div className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          {product.stock}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showDetail && selectedStore && (
        <StoreDetail
          store={selectedStore}
          onClose={() => {
            setShowDetail(false);
            setSelectedStore(null);
          }}
        />
      )}

      {showEditModal && editedStore && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Toko
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleEditStore} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nama Toko
                </label>
                <input
                  type="text"
                  value={editedStore.name}
                  onChange={(e) =>
                    setEditedStore({ ...editedStore, name: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Alamat
                </label>
                <input
                  type="text"
                  value={editedStore.address}
                  onChange={(e) =>
                    setEditedStore({ ...editedStore, address: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nomor Telepon
                </label>
                <input
                  type="text"
                  value={editedStore.num}
                  onChange={(e) =>
                    setEditedStore({ ...editedStore, num: e.target.value })
                  }
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Stok Produk
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {editedStore.products.map((product) => (
                    <div key={product.id} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {product.name}
                      </label>
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => {
                          const updatedProducts = editedStore.products.map((p) =>
                            p.id === product.id
                              ? { ...p, stock: parseInt(e.target.value) }
                              : p
                          );
                          setEditedStore({
                            ...editedStore,
                            products: updatedProducts,
                          });
                        }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
                >
                  {isLoading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && selectedStore && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Konfirmasi Hapus
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Apakah Anda yakin ingin menghapus toko {selectedStore.name}?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteStore}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                {isLoading ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

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

export default SalesStores;
