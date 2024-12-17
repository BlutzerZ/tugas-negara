import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditSalesStock = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Data statis untuk contoh
  const [formData, setFormData] = useState({
    stock_roll_on: 100,
    stock_20ml: 150,
    stock_30ml: 200
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Di sini nantinya akan ada logika untuk update ke API
    console.log("Data yang akan diupdate:", formData);
    
    // Redirect kembali ke halaman sales stock
    navigate("/sales-stock");
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
