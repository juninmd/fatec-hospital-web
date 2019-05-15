import { action, observable } from 'mobx';
import { getUsuarios, deleteUsuarios } from '../../api/usuarios.api';

export default class UsuarioListStore {
  @observable records: any[] = [];

  @action buildRecords = async () => {
    const { data } = await getUsuarios();
    this.records = data;
  }

  @action remove = async (id: number) => {
    await deleteUsuarios(id);
    await this.buildRecords();
  }

}
const usuarioList = new UsuarioListStore();
export { usuarioList };
