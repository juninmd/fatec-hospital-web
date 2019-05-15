import * as React from 'react';
import MenuStore from '../../components/main-menu/store';
import {
  Button,
  Form,
  Grid,
  Header,
  Input,
  Segment,
  Divider
} from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import { isLoggedIn, logOff } from '../../util/auth.util';
import LoginStore from './store';
import NewRouterStore from '../../mobx/router.store';
import './style.css';

interface Props {
  mainMenu: MenuStore;
  login: LoginStore;
  router: NewRouterStore;
  match: any;
  history: any;
}


@inject('mainMenu', 'router', 'login')
@observer
export default class Login extends React.Component<Props> {
  redirect = () => {
    const path = 'home';
    const { setMenuActive } = this.props.mainMenu;
    setMenuActive(path);
    const { setHistory } = this.props.router;
    setHistory(path);
  };

  componentWillMount = () => {
    const { path } = this.props.match;
    if (path === '/logout') {
      logOff();
      return;
    }

    const { setHistory } = this.props.router;

    if (isLoggedIn()) {
      setHistory('home');
    }
  }

  handleSubmit = async (event: any) => {
    event.preventDefault();
    const { handleSubmit } = this.props.login;
    await handleSubmit();
    this.redirect();
  }

  render() {

    const { email, senha, loading, handleChange } = this.props.login;

    return (
      <section className='login'>
        <Divider hidden={true} />


        <Form size='large' onSubmit={this.handleSubmit}>
          <Header as='h2' color='yellow' textAlign='center' content='Login' />

          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column width='4'>
              <Segment color='green'>

                <Form.Field>
                  <label>E-Mail:</label>
                  <Input
                    id='email'
                    minLength={3}
                    maxLength={20}
                    className={'uppercase'}
                    placeholder='ex: jr_acn@yahoo.com.br'
                    value={email}
                    type='email'
                    icon='user'
                    iconPosition={'left'}
                    onChange={handleChange}
                    required={true} />
                </Form.Field>

                <Form.Field>
                  <label>Senha</label>
                  <Input
                    type='password'
                    id='senha'
                    value={senha}
                    placeholder='EX: 123'
                    onChange={handleChange}
                    icon='lock'
                    iconPosition={'left'}
                    minLength={3}
                    maxLength={15}
                    autoComplete={'current-password'}
                    required={true} />
                </Form.Field>

                <Form.Field width='6'>
                  <Button icon={'unlock'} loading={loading} labelPosition={'left'} fluid={true} positive={true} content={'Acessar'} title='Acessar' />
                </Form.Field>

              </Segment>
            </Grid.Column>
          </Grid>

        </Form >

      </section>
    );
  }
}
