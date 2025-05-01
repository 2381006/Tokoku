import { useEffect, useState } from 'react';
import { getCartByUser, removeFromCart } from '../api/cart';
import { createOrder } from '../api/orders';

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = Number(localStorage.getItem('userId'));

  const loadCart = () => {
    if (!userId) return;
    getCartByUser(userId).then(setCart).catch(console.error);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleRemove = async (id: number) => {
    await removeFromCart(id);
    loadCart();
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const items = cart.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.product.price,
    }));

    setIsLoading(true);
    try {
      await createOrder({
        user: { id: userId },
        status: 'pending',
        items,
      });

      // Setelah checkout, hapus semua item dari cart
      await Promise.all(cart.map(item => removeFromCart(item.id)));

      alert('Checkout berhasil!');
      loadCart();
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Gagal checkout. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Keranjang Anda</h2>
      {cart.length === 0 ? (
        <p>Keranjang kosong.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="mb-2 border p-2 rounded flex justify-between items-center">
                <span>{item.product.name} - Qty: {item.quantity}</span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleCheckout}
            disabled={isLoading}
            className={`mt-4 px-4 py-2 rounded text-white ${
              isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isLoading ? 'Memproses...' : 'Checkout'}
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
