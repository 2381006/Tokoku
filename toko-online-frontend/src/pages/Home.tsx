import { useEffect, useState } from 'react';
import { getAllProducts } from '../api/products';
import { addToCart } from '../api/cart';

const Home = () => {
  const [products, setProducts] = useState([]);
  const userId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const handleAddToCart = (productId: number) => {
    addToCart({ userId, productId, quantity: 1 });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Daftar Barang</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((prod: any) => (
          <div key={prod.id} className="border p-4 rounded shadow bg-white">
            <h3 className="font-semibold">{prod.name}</h3>
            <p className="text-gray-600 mb-2">Rp {prod.price}</p>
            <button
              onClick={() => handleAddToCart(prod.id)}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
