import * as React from 'react';
import MenuStore from '../../components/main-menu/store';
import { Container, Grid, Header, Button, Segment, Form, Input } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import NewRouterStore from '../../mobx/router.store';
import UsuarioStore from './store';
import { RouteComponentProps } from 'react-router-dom';

interface Props {
  menu: MenuStore;
  router: NewRouterStore;
  hospital: UsuarioStore;
}
@inject('mainMenu', 'router', 'hospital', 'match')
@observer
export default class Usuario extends React.Component<RouteComponentProps<{ id: string }> & Props> {

  list = () => {
    const { setHistory } = this.props.router;
    setHistory(`hospital-list`);
  };

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { handleSubmit } = this.props.hospital;
    await handleSubmit();
    this.list();
  }

  async componentDidMount() {
    const { buildRecords, reset } = this.props.hospital;

    const id = Number(this.props.match.params.id);
    if (id) {
      await buildRecords(id);
    }
    else {
      reset();
    }
  }

  render() {

    const { hos_nome, hos_endereco, hos_telefone, hos_cnpj } = this.props.hospital.records;
    const { handleForm } = this.props.hospital;

    return (
      <Container>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header color='blue' as='h2'>
                <Header.Content>
                  Cadastro de hospitais
                 <Header.Subheader>Cadastre / Edite</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field required={true}>
              <label>Nome:</label>
              <Input type='text' id='hos_nome' required={true} value={hos_nome} onChange={handleForm} />
            </Form.Field>

            <Form.Field required={true}>
              <label>Endereço:</label>
              <Input type='text' id='hos_endereco' required={true} value={hos_endereco} onChange={handleForm} />
            </Form.Field>

            <Form.Field required={true}>
              <label>Telefone:</label>
              <Input type='text' id='hos_telefone' required={true} value={hos_telefone} onChange={handleForm} />
            </Form.Field>

            <Form.Field required={true}>
              <label>CNPJ:</label>
              <Input type='text' id='hos_cnpj' required={true} value={hos_cnpj} onChange={handleForm} />
            </Form.Field>

            <Button positive={true} type='submit'>Enviar</Button>
            <Button negative={true} onClick={() => this.list()} type='button'>Voltar</Button>
          </Form>
        </Segment>

      </Container>
    );
  }
}
