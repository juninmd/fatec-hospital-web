import { action, observable } from 'mobx';
import { getPoemas, deletePoemas } from '../../api/poemas.api';

export default class PoemaListStore {
  @observable records: any[] = [];

  @action buildRecords = async () => {
    const { data } = await getPoemas();
    this.records = data;
  }

  @action remove = async (id: number) => {
    await deletePoemas(id);
    await this.buildRecords();
  }

}
const poemaList = new PoemaListStore();
export { poemaList };
