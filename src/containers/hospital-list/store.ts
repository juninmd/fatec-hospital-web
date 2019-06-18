import { action, observable } from 'mobx';
import { getHospitais, deleteHospitais } from '../../api/hospitais.api';

export default class HospitalListStore {
  @observable records: any[] = [];

  @action buildRecords = async () => {
    const { data } = await getHospitais();
    this.records = data;
  }

  @action remove = async (id: number) => {
    await deleteHospitais(id);
    await this.buildRecords();
  }

}
const hospitalList = new HospitalListStore();
export { hospitalList };
