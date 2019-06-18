import * as React from 'react';
import MenuStore from '../../components/main-menu/store';
import { Container, Grid, Header, Button, Segment, Form, Input } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import NewRouterStore from '../../mobx/router.store';
import MedicoStore from './store';
import { RouteComponentProps } from 'react-router-dom';

interface Props {
  menu: MenuStore;
  router: NewRouterStore;
  medico: MedicoStore;
}
@inject('mainMenu', 'router', 'medico', 'match')
@observer
export default class Medico extends React.Component<RouteComponentProps<{ id: string }> & Props> {

  list = () => {
    const { setHistory } = this.props.router;
    setHistory(`medico-list`);
  };

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { handleSubmit } = this.props.medico;
    await handleSubmit();
    this.list();
  }

  async componentDidMount() {
    const { buildRecords, reset } = this.props.medico;

    const id = Number(this.props.match.params.id);
    if (id) {
      await buildRecords(id);
    }
    else {
      reset();
    }
  }

  render() {

    const { med_nome } = this.props.medico.records;
    const { handleForm } = this.props.medico;

    return (
      <Container>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header color='blue' as='h2'>
                <Header.Content>
                  Cadastro de Medicos
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
              <Input type='text' id='med_nome' required={true} value={med_nome} onChange={handleForm} />
            </Form.Field>

            <Button positive={true} type='submit'>Enviar</Button>
            <Button negative={true} onClick={() => this.list()} type='button'>Voltar</Button>
          </Form>
        </Segment>

      </Container>
    );
  }
}
