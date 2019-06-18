import { action, observable } from 'mobx';

export default class HomeStore {
  @observable records: any[] = [];

  @action buildRecords = async () => {
    this.records = [];
  }

}
const home = new HomeStore();
export { home };
