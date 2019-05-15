import * as React from 'react';
import MenuStore from '../../components/main-menu/store';
import { Container, Grid, Header, Button, Segment, Form, Input } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import NewRouterStore from '../../mobx/router.store';
import UsuarioStore from './store';
import { RouteComponentProps } from 'react-router';

interface Props {
  menu: MenuStore;
  router: NewRouterStore;
  usuario: UsuarioStore;
}
@inject('mainMenu', 'router', 'usuario', 'match')
@observer
export default class Usuario extends React.Component<RouteComponentProps<{ id: string }> & Props> {

  list = () => {
    const { setHistory } = this.props.router;
    setHistory(`usuario-list`);
  };

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { handleSubmit } = this.props.usuario;
    await handleSubmit();
    this.list();
  }

  async componentDidMount() {
    const { buildRecords, reset } = this.props.usuario;

    const id = Number(this.props.match.params.id);
    if (id) {
      await buildRecords(id);
    }
    else {
      reset();
    }
  }

  render() {

    const { email, nome, senha } = this.props.usuario.records;
    const { handleForm } = this.props.usuario;

    return (
      <Container>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header color='blue' as='h2'>
                <Header.Content>
                  Cadastro de usuarios
                 <Header.Subheader>Cadastre / Edite</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>


        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field required={true}>
              <label>E-mail:</label>
              <Input type='text' id='email' required={true} value={email} onChange={handleForm} />
            </Form.Field>

            <Form.Field required={true}>
              <label>Nome:</label>
              <Input type='text' id='nome' required={true} value={nome} onChange={handleForm} />
            </Form.Field>

            <Form.Field required={true}>
              <label>Senha:</label>
              <Input type='password' id='senha' required={true} value={senha} onChange={handleForm} />
            </Form.Field>
           
            <Button positive={true} type='submit'>Enviar</Button>
            <Button negative={true} onClick={() => this.list()} type='button'>Voltar</Button>
          </Form>
        </Segment>

      </Container>
    );
  }
}
