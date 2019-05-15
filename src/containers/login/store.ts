import swal from 'sweetalert2';
import { action, observable } from 'mobx';
import { assign } from '../../util/object.util';
import { postLogin } from '../../api/usuarios.api';
import { setAuth } from '../../util/auth.util';

export default class LoginStore {
  @observable email = '';
  @observable senha = '';
  @observable loading = false;

  @action handleChange = (event: any, select?: any) => {
    const { id, value } = select || event.target;
    assign(this, id, value);
  }

  @action handleSubmit = async () => {

    const { email, senha } = this;

    try {

      this.loading = true;

      const { data } = await postLogin({ email, senha });
      setAuth(JSON.stringify(data));
      this.loading = false;
    } catch (error) {
      this.loading = false;
      swal({
        text: 'Ocorreu um erro não esperado.',
        type: 'error'
      });
      throw error;
    }
  }

}
const login = new LoginStore();
export { login };