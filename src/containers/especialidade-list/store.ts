import { action, observable } from 'mobx';
import { getEspecialidades, deleteEspecialidades } from '../../api/especialidades.api';

export default class EspecialidadeListStore {
  @observable records: any[] = [];

  @action buildRecords = async () => {
    const { data } = await getEspecialidades();
    this.records = data;
  }

  @action remove = async (id: number) => {
    await deleteEspecialidades(id);
    await this.buildRecords();
  }

}
const especialidadeList = new EspecialidadeListStore();
export { especialidadeList };
