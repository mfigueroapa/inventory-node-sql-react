import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = '')
  : (baseURL = 'http://localhost:3000');

const service = axios.create({ withCredentials: true, baseURL });

export const findAll = () => service.get("/product/")
export const deleteProduct = (id) => service.post(`/product/delete/${id}`)
export const create = (product) => service.post('/product/create', product)
export const update = (product) => service.put('/product/update', product)