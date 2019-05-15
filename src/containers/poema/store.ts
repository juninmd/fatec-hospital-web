import { action, observable } from 'mobx';
import { getPoemasById, postPoemas, putPoemas } from '../../api/poemas.api';
import { getUser } from '../../util/auth.util';

export default class PoemaStore {
  @observable records: {
    codigo: string,
    titulo: string,
    corpo: string,
    codigo_usuario: string
  } = {
      codigo: '',
      titulo: '',
      corpo: '',
      codigo_usuario: getUser().codigo.toString()
    };

  @action buildRecords = async (id: number) => {
    const { data: [records] } = await getPoemasById(id);
    this.records = records;
  }

  @action reset = () => {
    this.records = {
      codigo: '',
      titulo: '',
      corpo: '',
      codigo_usuario: getUser().codigo.toString()
    };
  }

  @action handleForm = (event: any, select?: any) => {
    const { id, value } = select || event.target;
    this.records[id] = value;
  };

  @action handleSubmit = async () => {

    if (Number(this.records.codigo)) {
      await putPoemas(+this.records.codigo, this.records);
    }
    else {
      await postPoemas(this.records);
    }
    await this.reset();
  }

}
const poema = new PoemaStore();
export { poema };
