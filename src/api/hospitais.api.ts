import axios from 'axios';
import { backend } from '../util/contants.util';


export const getPoemasById = (id: number) => {
  return axios.request({ method: 'get', baseURL: backend, url: `/poemas/${id}` });
};

export const getPoemas = (params?: any) => {
  return axios.request({ method: 'get', baseURL: backend, url: `/poemas`, params });
};

export const postPoemas = (data: any) => {
  data.codigo = null;
  return axios.request({ method: 'post', baseURL: backend, url: `/poemas`, data });
};

export const putPoemas = (id: number, data: any) => {
  return axios.request({ method: 'put', baseURL: backend, url: `/poemas/${id}`, data });
};

export const deletePoemas = (id: any) => {
  return axios.request({ method: 'delete', baseURL: backend, url: `/poemas/${id}` });
};
