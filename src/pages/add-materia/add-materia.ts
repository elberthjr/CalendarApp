import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MateriaProvider } from './../../providers/materia/materia';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-add-materia',
  templateUrl: 'add-materia.html',
})
export class AddMateriaPage {
  title: string;
  formM: FormGroup;
  materia: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder, private provider: MateriaProvider,
    private toast: ToastController) {

    this.materia = this.navParams.data.materia || {};
    this.createFormM();
    this.setupPageTitle();
  }

  private setupPageTitle(){
    this.title = this.navParams.data.materia ? 'Editando Materia' : 'Adicionando Materia'; 
  }

  createFormM() {
    this.formM = this.formBuilder.group({
      key: [this.materia.key],
      nome: [this.materia.nome, Validators.required],
      sigla: [this.materia.sigla, Validators.required],
      qntdAulas: [this.materia.qntdAulas],
      qntdFaltas: [this.materia.qntdFaltas],
      notaP1: [this.materia.notaP1],
      notaP2: [this.materia.notaP2],
      bibliografia: [this.materia.bibliografia],
    });
  }

  onSubmitM(){
    if (this.formM.valid) {
      this.provider.saveM(this.formM.value)
      .then(() => {
        this.toast.create({ message: 'Matéria Adicionada!', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao Adicionar matéria!', duration: 3000 }).present();
        console.error(e);
      });
    }
  }
}
