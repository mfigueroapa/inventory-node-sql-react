import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = '')
  : (baseURL = 'http://localhost:3000');

const service = axios.create({ withCredentials: true, baseURL });

export const findAll = () => service.get("/product/")
// export const deleteService = (id) => service.post("/product/delete", id)
// export const todosService = () => service.get("/product/todos")
// export const todoService = (id) => service.get(`/product/info/${id}`)
// export const isCompletedService = (userInfo) => service.post(`/product/completed`, userInfo)