import { action, observable } from 'mobx';
import { getMedicos, deleteMedicos } from '../../api/medicos.api';

export default class MedicoListStore {
  @observable records: any[] = [];

  @action buildRecords = async () => {
    const { data } = await getMedicos();
    this.records = data;
  }

  @action remove = async (id: number) => {
    await deleteMedicos(id);
    await this.buildRecords();
  }

}
const medicoList = new MedicoListStore();
export { medicoList };
