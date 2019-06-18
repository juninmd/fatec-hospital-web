import axios from 'axios';
import { backend } from '../util/contants.util';

export const getMedicosById = (id: number) => {
  return axios.request({ method: 'get', baseURL: backend, url: `/medicos/${id}` });
};

export const getMedicos = (params?: any) => {
  return axios.request({ method: 'get', baseURL: backend, url: `/medicos`, params });
};

export const postMedicos = (data: any) => {
  data.med_codigo = null;
  return axios.request({ method: 'post', baseURL: backend, url: `/medicos`, data });
};

export const putMedicos = (id: number, data: any) => {
  return axios.request({ method: 'put', baseURL: backend, url: `/medicos/${id}`, data });
};

export const deleteMedicos = (id: any) => {
  return axios.request({ method: 'delete', baseURL: backend, url: `/medicos/${id}` });
};
