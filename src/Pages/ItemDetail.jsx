import React from 'react';
import { useParams } from 'react-router-dom';

function ItemDetail({ inventory }) {
  const { id } = useParams();
  const item = inventory.find((item) => item.id === parseInt(id));

  if (!item) {
    return <p>Barang tidak ditemukan</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Detail Barang</h1>
      <p><strong>ID:</strong> {item.id}</p>
      <p><strong>Nama Barang:</strong> {item.name}</p>
      <p><strong>Kategori:</strong> {item.category}</p>
      <p><strong>Stok:</strong> {item.stock}</p>
      <p><strong>Harga:</strong> Rp {item.price}</p>
    </div>
  );
}

export default ItemDetail;
