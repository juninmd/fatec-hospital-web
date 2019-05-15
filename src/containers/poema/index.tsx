import * as React from 'react';
import MenuStore from '../../components/main-menu/store';
import { Container, Grid, Header, Button, Segment, Form, Input } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import NewRouterStore from '../../mobx/router.store';
import PoemaStore from './store';
import { RouteComponentProps } from 'react-router';

interface Props {
  menu: MenuStore;
  router: NewRouterStore;
  poema: PoemaStore;
}
@inject('mainMenu', 'router', 'poema', 'match')
@observer
export default class Poema extends React.Component<RouteComponentProps<{ id: string }> & Props> {

  list = () => {
    const { setHistory } = this.props.router;
    setHistory(`poema-list`);
  };

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const { handleSubmit } = this.props.poema;
    await handleSubmit();
    this.list();
  }

  async componentDidMount() {
    const { buildRecords, reset } = this.props.poema;

    const id = Number(this.props.match.params.id);
    if (id) {
      await buildRecords(id);
    }
    else {
      reset();
    }
  }

  render() {

    const { titulo, corpo } = this.props.poema.records;
    const { handleForm } = this.props.poema;

    return (
      <Container>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header color='blue' as='h2'>
                <Header.Content>
                  Cadastro de Poemas
                 <Header.Subheader>Cadastre / Edite</Header.Subheader>
                </Header.Content>
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>


        <Segment>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field required={true}>
              <label>Titulo:</label>
              <Input type='text' id='titulo' required={true} value={titulo} onChange={handleForm} />
            </Form.Field>
            <Form.Field required={true}>
              <label>Corpo:</label>
              <textarea value={corpo} id='corpo' required={true} onChange={handleForm} ></textarea>
            </Form.Field>
            <Button positive={true} type='submit'>Enviar</Button>
            <Button negative={true} onClick={() => this.list()} type='button'>Voltar</Button>
          </Form>
        </Segment>

      </Container>
    );
  }
}
