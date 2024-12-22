import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";
import SuccessModal from "../../admin/components/SuccessModal";

const EditStoreStock = () => {
  const { store_id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [formData, setFormData] = useState({});
  const [stockAction, setStockAction] = useState("add");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
    autoClose: true,
  });

  // State untuk return
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [returnForm, setReturnForm] = useState({
    stock_roll_on: 0,
    stock_20_ml: 0,
    stock_30_ml: 0,
    return_stock_reason: "",
  });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          createApiUrl(API_CONFIG.ENDPOINTS.STORES.DETAIL, { id: store_id }),
          {
            method: "GET",
            headers: getAuthHeader(),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStore(data.data);

        if (data.data.products) {
          const productData = {};
          data.data.products.forEach((item) => {
            const key = `stock_${item.name.toLowerCase().replace(/ /g, "_")}`;
            productData[key] = null;
          });
          setFormData(productData);
        }
      } catch (error) {
        console.error("Failed to fetch stores:", error);
        setModalConfig({
          type: "error",
          message: "Gagal mengambil data toko",
          autoClose: false,
        });
        setShowModal(true);
      }
    };

    fetchStores();
  }, [store_id]);

  const handleKeyDown = (e) => {
    const invalidKeys = ["e", "E", "+", "-", ".", ","];
    if (invalidKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const uploadData = new FormData();
    uploadData.append("return_stock_reason", returnForm.return_stock_reason);

    Object.keys(formData).forEach((key) => {
      if (stockAction === "add") {
        uploadData.append(
          key,
          formData[key] == null ? 0 : Math.abs(formData[key])
        );
      } else {
        uploadData.append(
          key,
          formData[key] == null ? 0 : -1 * Math.abs(formData[key])
        );
      }
    });

    try {
      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.STORES.DETAIL, { id: store_id }),
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: uploadData,
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengupdate stok");
      }

      setModalConfig({
        type: "success",
        message: "Stok berhasil diupdate!",
        autoClose: true,
      });
      setShowModal(true);

      setTimeout(() => {
        navigate(0);
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
      setModalConfig({
        type: "error",
        message: `Error: ${error.message}`,
        autoClose: false,
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (!store)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <nav className="flex mb-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link
                    to="/stores-stock"
                    className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                  >
                    Stock Toko
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
                      Edit Stok
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Edit Stok Toko
            </h1>
          </div>
        </div>
      </div>

      {/* Current Stock Display */}
      <div className="p-4 grid grid-cols-3 gap-2 text-sm">
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

      {/* Stock Action Selection */}
      <div className="p-4">
        <div className="flex items-center mb-4">
          <span className="mr-4 text-sm font-medium text-gray-900 dark:text-white">
            Pilih Aksi Stok:
          </span>
          <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-md">
            <button
              type="button"
              onClick={() => setStockAction("add")}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                stockAction === "add"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Tambah Stok
            </button>
            <button
              type="button"
              onClick={() => setStockAction("reduce")}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                stockAction === "reduce"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Stok Terjual
            </button>
            <button
              type="button"
              onClick={() => setStockAction("return")}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                stockAction === "return"
                  ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              Retrun Stok
            </button>
          </div>
        </div>

        {/* Stock Update Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {(() => {
                if (stockAction === "add") {
                  return "Tambah Stok Toko";
                } else if (stockAction === "reduce") {
                  return "Stok Terjual";
                } else {
                  return "Return Stok Toko";
                }
              })()}
            </h3>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Stok Roll On
                </label>
                <input
                  type="number"
                  name="stock_roll_on"
                  value={formData.stock_roll_on || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  min="0"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Stok 20ml
                </label>
                <input
                  type="number"
                  name="stock_20_ml"
                  value={formData.stock_20_ml || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  min="0"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Stok 30ml
                </label>
                <input
                  type="number"
                  name="stock_30_ml"
                  value={formData.stock_30_ml || ""}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  min="0"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              {stockAction === "return" && (
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Catatan
                  </label>
                  <textarea
                    value={returnForm.return_stock_reason}
                    onChange={(e) =>
                      setReturnForm({
                        ...returnForm,
                        return_stock_reason: e.target.value,
                      })
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    rows="3"
                    placeholder="Masukkan alasan return..."
                    required
                  ></textarea>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {(() => {
                if (isLoading) {
                  return "Memproses ";
                } else {
                  if (stockAction === "add") {
                    return "Tambah Stok";
                  } else if (stockAction === "reduce") {
                    return "Stok Terjual";
                  } else {
                    return "Return Stok";
                  }
                }
              })()}
            </button>
            <Link
              to="/stores-stock"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              Kembali
            </Link>
          </div>
        </form>
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

export default EditStoreStock;
