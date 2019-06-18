import { RouteProps } from 'react-router-dom';
import Hospital from '../containers/hospital';
import HospitalList from '../containers/hospital-list';
import Especialidade from '../containers/especialidade';
import EspecialidadeList from '../containers/especialidade-list';
import Medico from '../containers/medico';
import MedicoList from '../containers/medico-list';

const publicUrl = process.env.PUBLIC_URL;

export const routes: RouteProps[] = [
  { path: `${publicUrl}/hospital/:id`, component: Hospital },
  { path: `${publicUrl}/hospital-list`, component: HospitalList, exact: true },
  { path: `${publicUrl}/especialidade/:id`, component: Especialidade },
  { path: `${publicUrl}/especialidade-list`, component: EspecialidadeList, exact: true },
  { path: `${publicUrl}/medico/:id`, component: Medico },
  { path: `${publicUrl}/medico-list`, component: MedicoList, exact: true },
];