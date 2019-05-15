import axios from 'axios';
import { backend } from '../util/contants.util';

export const postLogin = (data: any) => {
  return axios.request({ method: 'post', baseURL: backend, url: `/login`, data });
};

export const getUsuarios = () => {
  return axios.request({ method: 'get', baseURL: backend, url: `/usuarios` });
};

export const getUsuariosById = (id: any) => {
  return axios.request({ method: 'get', baseURL: backend, url: `/usuarios/${id}` });
};

export const postUsuarios = (data: any) => {
  return axios.request({ method: 'post', baseURL: backend, url: `/usuarios`, data });
};

export const putUsuarios = (id: any, data) => {
  return axios.request({ method: 'put', baseURL: backend, url: `/usuarios/${id}`, data });
};

export const deleteUsuarios = (id: any) => {
  return axios.request({ method: 'delete', baseURL: backend, url: `/usuarios/${id}` });
};