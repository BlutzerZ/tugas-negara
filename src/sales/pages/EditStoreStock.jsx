import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const EditStoreStock = () => {
  const { store_id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [formData, setFormData] = useState({});
  const [stockAction, setStockAction] = useState("add");

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
      }
    };

    fetchStores();
  }, [store_id]);

  // Pindahkan fungsi handleKeyDown ke sini
  const handleKeyDown = (e) => {
    const invalidKeys = ["e", "E", "+", "-", ".", ","];
    if (invalidKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  // Pindahkan fungsi handleChange ke sini
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("stock_action", stockAction);

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
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengupdate stok");
      }

      const data = await response.json();
      console.log("Stok berhasil diupdate:", data);
      alert("Stok berhasil diupdate!");

      navigate(0);
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  if (!store) return <div>Loading...</div>;


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

			{/* Form Section */}
			<div className="p-4 grid grid-cols-3 gap-2 text-sm">
				{store.products.map((product) => {
					return (
						<div className="bg-gray-100 dark:bg-gray-700 p-2 rounded">
							<div className="font-medium text-gray-900 dark:text-white">
								{product.name}
							</div>
							<div className="text-gray-500 dark:text-gray-400">
								{product.stock}
							</div>
						</div>
					);
				})}
			</div>

			<div className="p-4">
				<div className="flex items-center mb-4">
					<span className="mr-4 text-sm font-medium text-gray-900 dark:text-white">
						Pilih Aksi Stok:
					</span>
					<div className="flex items-center">
						<input
							type="radio"
							id="add-stock"
							name="stock-action"
							value="add"
							checked={stockAction === "add"}
							onChange={() => setStockAction("add")}
							className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label
							htmlFor="add-stock"
							className="ml-2 mr-4 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Tambah Stok
						</label>

						<input
							type="radio"
							id="reduce-stock"
							name="stock-action"
							value="reduce"
							checked={stockAction === "reduce"}
							onChange={() => setStockAction("reduce")}
							className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
						/>
						<label
							htmlFor="reduce-stock"
							className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
						>
							Kurangi Stok
						</label>
					</div>
				</div>
			</div>

			{/* Form Section - Mostly Unchanged */}
			<div className="p-4">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
							{stockAction === "add" ? "Tambah" : "Kurangi"} Stok Toko
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
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
								/>
							</div>
						</div>
					</div>

					<div className="flex items-center space-x-4">
						<button
							type="submit"
							className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
						>
							{stockAction === "add" ? "Tambah" : "Kurangi"} Stok
						</button>
						<Link
							to="/stores-stock"
							className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
						>
							Batal
						</Link>
					</div>
				</form>
			</div>
		</>
	);
};

export default EditStoreStock;
