import api from './axios';

export const createOrder = async (order: any) => (await api.post('/orders', order)).data;
export const getAllOrders = async () => (await api.get('/orders')).data;
export const updateOrderStatus = async (id: number, status: string) =>
  (await api.put(`/orders/${id}/status`, { status })).data;
