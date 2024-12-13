import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function InventoryList({ inventory }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredInventory = inventory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Daftar Barang</h1>

      <input
        type="text"
        placeholder="Cari berdasarkan nama atau kategori"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4"
      />

      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Nama Barang</th>
            <th className="px-4 py-2">Kategori</th>
            <th className="px-4 py-2">Stok</th>
            <th className="px-4 py-2">Harga</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.category}</td>
              <td className="px-4 py-2">{item.stock}</td>
              <td className="px-4 py-2">Rp {item.price}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => navigate(`/inventory/${item.id}`)}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryList;
