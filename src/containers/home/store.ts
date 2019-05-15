import { action, observable } from 'mobx';
import { getPoemas } from '../../api/poemas.api';

export default class HomeStore {
  @observable records: any[] = [];

  @action buildRecords = async () => {
    const { data } = await getPoemas();
    this.records = data;
  }

}
const home = new HomeStore();
export { home };
