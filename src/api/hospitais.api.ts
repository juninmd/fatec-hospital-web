import axios from 'axios';
import { backend } from '../util/contants.util';

export const getHospitaisById = (id: number) => {
  return axios.request({ method: 'get', baseURL: backend, url: `/hospitais/${id}` });
};

export const getHospitais = (params?: any) => {
  return axios.request({ method: 'get', baseURL: backend, url: `/hospitais`, params });
};

export const postHospitais = (data: any) => {
  data.hos_codigo = null;
  return axios.request({ method: 'post', baseURL: backend, url: `/hospitais`, data });
};

export const putHospitais = (id: number, data: any) => {
  return axios.request({ method: 'put', baseURL: backend, url: `/hospitais/${id}`, data });
};

export const deleteHospitais = (id: any) => {
  return axios.request({ method: 'delete', baseURL: backend, url: `/hospitais/${id}` });
};
