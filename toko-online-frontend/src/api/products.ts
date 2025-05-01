import api from './axios';

export const getAllProducts = async () => (await api.get('/products')).data;
export const createProduct = async (product: any) => (await api.post('/products', product)).data;
export const updateProduct = async (id: number, product: any) => (await api.put(`/products/${id}`, product)).data;
export const deleteProduct = async (id: number) => (await api.delete(`/products/${id}`)).data;
