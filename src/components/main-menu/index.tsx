import * as React from 'react';
import MenuStore from './store';
import { Dropdown, Menu } from 'semantic-ui-react';
import { getFirstName } from '../../util/auth.util';
import { inject, observer } from 'mobx-react';
import NewRouterStore from '../../mobx/router.store';

interface Props {
  mainMenu?: MenuStore;
  router?: NewRouterStore;
}


@inject('mainMenu', 'router')
@observer
export default class MainMenu extends React.Component<Props> {

  handleItemClick = (name: any, { url }: any) => {
    const { setMenuActive } = this.props.mainMenu!;
    setMenuActive(name);

    const { setHistory } = this.props.router!;
    return setHistory(url);
  };

  logout = () => {
    const { setHistory } = this.props.router!;
    return setHistory('logout');
  }

  render() {

    const { activated } = this.props.mainMenu!;

    return (
      <>
        <div className={'nav'}>
          <Menu color={'blue'} inverted={true} size='large' secondary={true} stackable={true}>
            <Menu.Item
              name='home'
              active={activated === 'home'}
              url='home'
              onClick={this.handleItemClick}>
              Home
            </Menu.Item>
            <Menu.Item
              name='poema'
              active={activated === 'poema'}
              url='poema-list'
              onClick={this.handleItemClick}>
              Poema
            </Menu.Item>
            <Menu.Item
              name='usuario'
              active={activated === 'usuario'}
              url='usuario-list'
              onClick={this.handleItemClick}>
              Usuários
            </Menu.Item>
            <Menu.Menu position='right'>
              <Dropdown item={true} text={getFirstName()}>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={this.logout}>
                    Sair</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Menu>
          </Menu>
        </div>
      </>
    );
  }
}