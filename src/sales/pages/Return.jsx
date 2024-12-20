import { useState } from "react";
import SuccessModal from "../../admin/components/SuccessModal";

const Return = () => {
  const [returnData, setReturnData] = useState({
    total_return: {
      stock_roll_on: 50,
      stock_20_ml: 75,
      stock_30_ml: 60,
    },
    return_history: [
      {
        id: 1,
        store_name: "Toko A",
        date: "2024-01-15",
        stock_roll_on: 10,
        stock_20_ml: 15,
        stock_30_ml: 12,
        notes: "Parfum tidak laku"
      },
      {
        id: 2,
        store_name: "Toko B",
        date: "2024-01-14",
        stock_roll_on: 8,
        stock_20_ml: 20,
        stock_30_ml: 15,
        notes: "Parfum tidak laku"
      }
    ]
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReturn, setEditingReturn] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: 'success',
    message: '',
    autoClose: true
  });

  const handleEdit = (returnItem) => {
    setEditingReturn({
      ...returnItem,
      store_name: returnItem.store_name,
      notes: returnItem.notes
    });
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      // Implementasi API nanti
      console.log("Updated return:", editingReturn);

      setModalConfig({
        type: 'success',
        message: 'Return berhasil diupdate!',
        autoClose: true
      });
      setShowModal(true);
      setShowEditModal(false);

      // Update local state
      const updatedHistory = returnData.return_history.map(item =>
        item.id === editingReturn.id ? editingReturn : item
      );
      setReturnData(prev => ({
        ...prev,
        return_history: updatedHistory
      }));

    } catch (error) {
      setModalConfig({
        type: 'error',
        message: 'Gagal mengupdate return',
        autoClose: false
      });
      setShowModal(true);
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Return Parfum Saya
            </h1>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="p-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Return Roll On
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {returnData.total_return.stock_roll_on}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Return 20ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {returnData.total_return.stock_20_ml}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Total Return 30ml
          </h2>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {returnData.total_return.stock_30_ml}
          </p>
        </div>
      </div>

      {/* Return History Table */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Riwayat Return
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Toko</th>
                  <th scope="col" className="px-4 py-3">Tanggal</th>
                  <th scope="col" className="px-4 py-3">Roll On</th>
                  <th scope="col" className="px-4 py-3">20ml</th>
                  <th scope="col" className="px-4 py-3">30ml</th>
                  <th scope="col" className="px-4 py-3">Catatan</th>
                  <th scope="col" className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {returnData.return_history.map((item) => (
                  <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="px-4 py-3">{item.store_name}</td>
                    <td className="px-4 py-3">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{item.stock_roll_on}</td>
                    <td className="px-4 py-3">{item.stock_20_ml}</td>
                    <td className="px-4 py-3">{item.stock_30_ml}</td>
                    <td className="px-4 py-3">{item.notes}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-500 dark:hover:text-primary-400"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md dark:bg-gray-800">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
              Edit Return
            </h3>
            <form onSubmit={handleUpdate}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Toko
                  </label>
                  <input
                    type="text"
                    value={editingReturn.store_name}
                    onChange={(e) => setEditingReturn({...editingReturn, store_name: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Roll On
                  </label>
                  <input
                    type="number"
                    value={editingReturn.stock_roll_on}
                    onChange={(e) => setEditingReturn({...editingReturn, stock_roll_on: parseInt(e.target.value)})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    20ml
                  </label>
                  <input
                    type="number"
                    value={editingReturn.stock_20_ml}
                    onChange={(e) => setEditingReturn({...editingReturn, stock_20_ml: parseInt(e.target.value)})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    30ml
                  </label>
                  <input
                    type="number"
                    value={editingReturn.stock_30_ml}
                    onChange={(e) => setEditingReturn({...editingReturn, stock_30_ml: parseInt(e.target.value)})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Catatan
                  </label>
                  <textarea
                    value={editingReturn.notes}
                    onChange={(e) => setEditingReturn({...editingReturn, notes: e.target.value})}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Simpan
                </button>
              </div>
            </form>
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

export default Return;
