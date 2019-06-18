import { action, observable, computed } from 'mobx';
import { getMedicosById, postMedicos, putMedicos } from '../../api/medicos.api';
import { getEspecialidades } from '../../api/especialidades.api';
import { getHospitais } from '../../api/hospitais.api';
import swal from 'sweetalert2';

export default class MedicoStore {

  private baseRecords = {
    med_codigo: '',
    med_nome: '',
    med_crm: '',
    hos_codigo: '',
    esp_codigo: ''
  };

  @observable records: any = { ...this.baseRecords };
  @observable hospitalOptions: any = [];
  @observable especialidadeOptions: any = [];

  @action buildRecords = async (id: number) => {
    const { data: [records] } = await getMedicosById(id);
    this.records = records;
  }

  @computed get especialidade() {
    return this.especialidadeOptions;
  }

  @computed get hospital() {
    return this.especialidadeOptions;
  }

  @action buildLists = async () => {
    try {

      const { data: especialidades } = await getEspecialidades();
      const especialidadeOptions = [{ key: 9999, text: 'Selecione', value: '' }];
      especialidadeOptions.push(...especialidades.map((q: any, i: number) => {
        return {
          key: i,
          text: q.esp_nome,
          value: q.esp_codigo
        };
      }));
      this.especialidadeOptions = especialidadeOptions;

      const { data: hospitais } = await getHospitais();
      const hospitalOptions = [{ key: 9999, text: 'Selecione', value: '' }];
      hospitalOptions.push(...hospitais.map((q: any, i: number) => {
        return {
          key: i,
          text: q.hos_nome,
          value: q.hos_codigo
        };
      }));

      this.hospitalOptions = hospitalOptions;

    } catch (error) {
      swal('erro', 'deu erro');
    }
  }

  @action reset = () => {
    this.records = { ...this.baseRecords };
  }

  @action handleForm = (event: any, select?: any) => {
    const { id, value } = select || event.target;
    this.records[id] = value;
  };

  @action handleSubmit = async () => {

    if (!this.records.esp_codigo || !this.records.hos_codigo) {
      swal('Preencha a especialidade e o hospital!', 'Por favor', 'warning');
      return false;
    }

    if (Number(this.records.med_codigo)) {
      await putMedicos(+this.records.med_codigo, this.records);
    }
    else {
      await postMedicos(this.records);
    }
    await this.reset();
    return true;
  }

}
const medico = new MedicoStore();
export { medico };
