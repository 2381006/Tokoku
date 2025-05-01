import { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../api/orders';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = Number(localStorage.getItem('userId'));

  const loadOrders = () => {
    getAllOrders()
      .then((data) => {
        const filtered = data.filter((order: any) => order.user.id === userId);
        setOrders(filtered);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleComplete = async (id: number) => {
    try {
      await updateOrderStatus(id, 'completed');
      alert('Pesanan ditandai selesai!');
      loadOrders();
    } catch (err) {
      console.error(err);
      alert('Gagal mengubah status.');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Riwayat Pemesanan</h2>
      {orders.length === 0 ? (
        <p>Belum ada pemesanan.</p>
      ) : (
        orders.map((order: any) => (
          <div key={order.id} className="border p-4 mb-3 rounded shadow bg-white">
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Tanggal:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <ul className="mt-2 list-disc pl-6">
              {order.items.map((item: any) => (
                <li key={item.id}>
                  {item.product.name} x {item.quantity} - Rp{item.price}
                </li>
              ))}
            </ul>

            {order.status !== 'completed' && (
              <button
                onClick={() => handleComplete(order.id)}
                className="mt-4 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Tandai Selesai
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
