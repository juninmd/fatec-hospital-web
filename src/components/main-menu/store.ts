import { action, observable } from 'mobx';

export default class MainMenuStore {
  @observable activated: string = this.getActiveMenu();
  getActiveMenu() {
    const [, activeMenu] = window.location.pathname.split('/');
    return activeMenu || 'home';
  }

  @action setMenuActive = (name: string) => {
    this.activated = name;
  };
}

const mainMenu = new MainMenuStore();
export { mainMenu };
