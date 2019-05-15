import swal from 'sweetalert2';

export const isLoggedIn = () => {
  const user = sessionStorage.getItem('auth_token');
  console.log(user);
  return user !== null;
};

interface UserData {
  codigo: number;
  nome: string;
  email: string;
}

export const getFirstName = (): string => {
  const user = getUser().nome.split(' ')[0];
  return user.charAt(0).toUpperCase() + user.slice(1).toLowerCase();
};

export const getUser = (): UserData => {
  const user = sessionStorage.getItem('auth_token');
  if (user === null) {
    logOff();
    swal({
      type: 'error',
      title: 'Por favor, efetue login novamente',
      text: 'Sua sessão expirou!'
    });
    window.location.href = '/login';
    throw new Error('Sua sessão expirou');
  }

  try {
    return JSON.parse(user) as UserData;
  } catch (error) {
    logOff();
    swal({
      type: 'error',
      title: 'Por favor, efetue login novamente',
      text: 'Sua sessão expirou!'
    });
    window.location.href = '/login';
    throw error;
  }
};

export const setAuth = (token: string) => {
  sessionStorage.setItem('auth_token', token);
};

export const getAuth = () => {
  return sessionStorage.getItem('auth_token');
};

export const logOff = () => {
  sessionStorage.removeItem('auth_token');
};