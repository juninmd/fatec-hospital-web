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

  handleItemClick = (_name: any, { url }: any) => {
    const { setMenuActive } = this.props.mainMenu!;
    setMenuActive(url);

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
              active={activated === 'home'}
              url='home'
              onClick={this.handleItemClick}>
              Home
            </Menu.Item>
            <Menu.Item
              active={activated === 'hospital-list'}
              url='hospital-list'
              onClick={this.handleItemClick}>
              Hospital
            </Menu.Item>
            <Menu.Item
              active={activated === 'especialidade-list'}
              url='especialidade-list'
              onClick={this.handleItemClick}>
              Especialidade
            </Menu.Item>
            <Menu.Item
              active={activated === 'medico-list'}
              url='medico-list'
              onClick={this.handleItemClick}>
              Medico
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