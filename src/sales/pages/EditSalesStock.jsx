import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const EditSalesStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    stock_roll_on: 0,
    stock_20ml: 0,
    stock_30ml: 0
  });

  useEffect(() => {
    const fetchSalesStock = async () => {
      try {
        const response = await fetch(
          createApiUrl(API_CONFIG.ENDPOINTS.SALES.STOCK + `/${id}`),
          {
            method: "GET",
            headers: getAuthHeader(),
          }
        );
        if (!response.ok) throw new Error("Failed to fetch sales stock");
        const data = await response.json();
        setFormData(data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSalesStock();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        // Get current store stock
        const currentStockResponse = await fetch(
            createApiUrl(API_CONFIG.ENDPOINTS.STORES.DETAIL, { id: store_id }),
            {
                method: "GET",
                headers: getAuthHeader(),
            }
        );

        if (!currentStockResponse.ok) {
            throw new Error("Gagal mendapatkan data stok toko");
        }

        const currentStock = await currentStockResponse.json();
        
        // Calculate stock difference
        const stockDifference = {
            stock_30ml: formData.stock_30ml - currentStock.data.stock_30ml,
            stock_roll_on: formData.stock_roll_on - currentStock.data.stock_roll_on,
            stock_20ml: formData.stock_20ml - currentStock.data.stock_20ml
        };

        // If adding stock, check sales stock availability
        if (stockAction === "add") {
            const salesStockResponse = await fetch(
                createApiUrl(API_CONFIG.ENDPOINTS.USER.STOCK, { 
                    id: localStorage.getItem("user_id") 
                }),
                {
                    method: "GET",
                    headers: getAuthHeader(),
                }
            );

            if (!salesStockResponse.ok) {
                throw new Error("Gagal memeriksa stok sales");
            }

            const salesStock = await salesStockResponse.json();

            // Validate if sales has enough stock
            if (stockDifference.stock_30ml > salesStock.data.stock_30ml ||
                stockDifference.stock_roll_on > salesStock.data.stock_roll_on ||
                stockDifference.stock_20ml > salesStock.data.stock_20ml) {
                throw new Error("Stok sales tidak mencukupi");
            }
        }

        // Update store stock
        const response = await fetch(
            createApiUrl(API_CONFIG.ENDPOINTS.STORES.DETAIL, { id: store_id }),
            {
                method: "PUT",
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    stock_action: stockAction
                })
            }
        );

        if (!response.ok) {
            throw new Error("Gagal mengupdate stok toko");
        }

        // Update sales stock if adding to store stock
        if (stockAction === "add") {
            const updateSalesStock = await fetch(
                createApiUrl(API_CONFIG.ENDPOINTS.USER.STOCK, { 
                    id: localStorage.getItem("user_id") 
                }),
                {
                    method: "PUT",
                    headers: {
                        ...getAuthHeader(),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        stock_30ml: -stockDifference.stock_30ml,
                        stock_roll_on: -stockDifference.stock_roll_on,
                        stock_20ml: -stockDifference.stock_20ml,
                        action: "reduce"
                    })
                }
            );

            if (!updateSalesStock.ok) {
                throw new Error("Berhasil update stok toko namun gagal mengupdate stok sales");
            }
        }

        navigate(0);
    } catch (error) {
        console.error("Error:", error.message);
        alert(`Error: ${error.message}`);
    }
};


  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Edit Stok Sales</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Stok Roll On
            </label>
            <input
              type="number"
              value={formData.stock_roll_on}
              onChange={(e) => setFormData({...formData, stock_roll_on: parseInt(e.target.value)})}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Stok 20ml
            </label>
            <input
              type="number"
              value={formData.stock_20ml}
              onChange={(e) => setFormData({...formData, stock_20ml: parseInt(e.target.value)})}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Stok 30ml
            </label>
            <input
              type="number"
              value={formData.stock_30ml}
              onChange={(e) => setFormData({...formData, stock_30ml: parseInt(e.target.value)})}
              className="w-full p-2 border rounded"
              min="0"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-4 py-2 bg-primary-700 text-white rounded hover:bg-primary-800"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => navigate("/sales-stock")}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSalesStock;
