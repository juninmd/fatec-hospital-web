import { action, observable } from 'mobx';
import { getUsuariosById, postUsuarios, putUsuarios } from '../../api/usuarios.api';

export default class UsuarioStore {
  @observable records: {
    codigo: string,
    email: string,
    nome: string,
    senha: string
  } = {
      codigo: '',
      email: '',
      nome: '',
      senha: ''
    };

  @action buildRecords = async (id: number) => {
    const { data: [records] } = await getUsuariosById(id);
    this.records = records;
  }

  @action reset = () => {
    this.records = {
      codigo: '',
      email: '',
      nome: '',
      senha: ''
    };
  }

  @action handleForm = (event: any, select?: any) => {
    const { id, value } = select || event.target;
    this.records[id] = value;
  };

  @action handleSubmit = async () => {

    if (Number(this.records.codigo)) {
      await putUsuarios(+this.records.codigo, this.records);
    }
    else {
      await postUsuarios(this.records);
    }
    await this.reset();
  }

}
const usuario = new UsuarioStore();
export { usuario };
