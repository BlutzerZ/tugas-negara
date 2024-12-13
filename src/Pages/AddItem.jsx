import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddItem({ onAdd }) {
  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    category: '',
    stock: '',
    price: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem.id || !newItem.name || !newItem.category || !newItem.stock || !newItem.price) {
      setError('Semua informasi barang harus diisi!');
      return;
    }

    const itemToAdd = {
      ...newItem,
      stock: parseInt(newItem.stock, 10),
      price: parseFloat(newItem.price),
    };
    onAdd(itemToAdd); 
    setNewItem({ id: '', name: '', category: '', stock: '', price: '' }); 
    setError('');
    navigate('/inventory'); 
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tambah Barang</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={addItem} className="space-y-4">
        <div>
          <label className="block text-gray-700">ID</label>
          <input
            type="text"
            name="id"
            value={newItem.id}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Nama Barang</label>
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Kategori</label>
          <input
            type="text"
            name="category"
            value={newItem.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Stok</label>
          <input
            type="number"
            name="stock"
            value={newItem.stock}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Harga</label>
          <input
            type="number"
            name="price"
            value={newItem.price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Tambah Barang
        </button>
      </form>
    </div>
  );
}

export default AddItem;
