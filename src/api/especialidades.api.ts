import axios from 'axios';
import { backend } from '../util/contants.util';

export const getEspecialidades = () => {
  return axios.request({ method: 'get', baseURL: backend, url: `/especialidades` });
};

export const getEspecialidadesById = (id: any) => {
  return axios.request({ method: 'get', baseURL: backend, url: `/especialidades/${id}` });
};

export const postEspecialidades = (data: any) => {
  return axios.request({ method: 'post', baseURL: backend, url: `/especialidades`, data });
};

export const putEspecialidades = (id: any, data) => {
  return axios.request({ method: 'put', baseURL: backend, url: `/especialidades/${id}`, data });
};

export const deleteEspecialidades = (id: any) => {
  return axios.request({ method: 'delete', baseURL: backend, url: `/especialidades/${id}` });
};