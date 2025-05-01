import api from './axios';

export const getCartByUser = async (userId: number) => (await api.get(`/cart/user/${userId}`)).data;
export const addToCart = async (data: { userId: number; productId: number; quantity: number }) =>
  (await api.post('/cart', data)).data;
export const removeFromCart = async (id: number) => (await api.delete(`/cart/${id}`)).data;
