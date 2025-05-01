import { useEffect, useState } from 'react';
import { getAllProducts } from '../api/products';
import { addToCart } from '../api/cart';

const ProductCart = () => {
  const [products, setProducts] = useState([]);
  const userId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const handleAddToCart = (productId: number) => {
    addToCart({
      userId,
      productId,
      quantity: 1,
    }).then(() => {
      alert('Berhasil ditambahkan ke keranjang!');
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Pilih Barang</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product: any) => (
          <div key={product.id} className="border p-4 rounded shadow bg-white">
            <h3 className="font-bold">{product.name}</h3>
            <p className="text-gray-600">Rp {product.price}</p>
            <p className="text-sm mb-2">{product.description}</p>
            <button
              onClick={() => handleAddToCart(product.id)}
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

export default ProductCart;
