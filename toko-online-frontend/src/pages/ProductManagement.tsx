import { useEffect, useState } from 'react';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/products';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', stock: '' });
  const [editId, setEditId] = useState<number | null>(null);

  const loadProducts = () => getAllProducts().then(setProducts);

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    };

    if (editId) {
      updateProduct(editId, data).then(() => {
        setEditId(null);
        setForm({ name: '', price: '', description: '', stock: '' });
        loadProducts();
      });
    } else {
      createProduct(data).then(() => {
        setForm({ name: '', price: '', description: '', stock: '' });
        loadProducts();
      });
    }
  };

  const handleEdit = (product: any) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
    });
  };

  const handleDelete = (id: number) => {
    deleteProduct(id).then(loadProducts);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manajemen Produk</h2>
      <form onSubmit={handleSubmit} className="mb-6 grid gap-2">
        <input
          placeholder="Nama"
          className="border p-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Harga"
          type="number"
          className="border p-2"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Stok"
          type="number"
          className="border p-2"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <input
          placeholder="Deskripsi"
          className="border p-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button className="bg-blue-600 text-white py-2 rounded">
          {editId ? 'Update Produk' : 'Tambah Produk'}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((prod: any) => (
          <div key={prod.id} className="border p-4 rounded bg-white shadow">
            <h3 className="font-bold">{prod.name}</h3>
            <p className="text-gray-600">Rp {prod.price}</p>
            <p className="text-sm">Stok: {prod.stock}</p>
            <p className="text-sm mb-2">{prod.description}</p>
            <button
              className="mr-2 text-blue-600"
              onClick={() => handleEdit(prod)}
            >
              Edit
            </button>
            <button
              className="text-red-600"
              onClick={() => handleDelete(prod.id)}
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManagement;
