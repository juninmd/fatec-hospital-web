import { action, observable } from 'mobx';
import { getHospitaisById, postHospitais, putHospitais } from '../../api/especialidades.api';

export default class Hospitaistore {
  @observable records: {
    codigo: string,
    email: string,
    nome: string,
    senha: string
  } = {
      codigo: '',
      email: '',
      nome: '',
      senha: ''
    };

  @action buildRecords = async (id: number) => {
    const { data: [records] } = await getHospitaisById(id);
    this.records = records;
  }

  @action reset = () => {
    this.records = {
      codigo: '',
      email: '',
      nome: '',
      senha: ''
    };
  }

  @action handleForm = (event: any, select?: any) => {
    const { id, value } = select || event.target;
    this.records[id] = value;
  };

  @action handleSubmit = async () => {

    if (Number(this.records.codigo)) {
      await putHospitais(+this.records.codigo, this.records);
    }
    else {
      await postHospitais(this.records);
    }
    await this.reset();
  }

}
const hospital = new HospitalStore();
export { hospital };
