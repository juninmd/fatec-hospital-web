import { RouterStore } from 'mobx-react-router';
import { action } from 'mobx';

export default class NewRouterStore extends RouterStore {

  @action setHistory = (path: string) => {
    this.history.push(`${process.env.PUBLIC_URL}/${path}`);
  }

}

const router = new NewRouterStore();
export { router };
