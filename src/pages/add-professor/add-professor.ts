import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessorProvider } from './../../providers/professor/professor';
import { MateriaProvider } from './../../providers/materia/materia';
import { Observable } from 'rxjs/Observable';
 
@IonicPage()
@Component({
  selector: 'page-add-professor',
  templateUrl: 'add-professor.html',
})
export class AddProfessorPage {
  title: string;
  formP: FormGroup;
  professor: any;
  materias: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private formBuilder: FormBuilder, private provider: ProfessorProvider,
    private toast: ToastController, private materia: MateriaProvider) {

      this.materias = this.materia.getAllM();
      this.professor = this.navParams.data.professor || {};
      this.createFormP();
      this.setupPageTitle();
  }

  private setupPageTitle(){
    this.title = this.navParams.data.professor ? 'Editando Professor' : 'Adicionando Professor'; 
  }

  createFormP() {
    this.formP = this.formBuilder.group({
      key: [this.professor.key],
      nome: [this.professor.nome, Validators.required],
      email: [this.professor.email, Validators.required],
      materia: [this.professor.materia],
      telefone: [this.professor.telefone],
      horarioDisp: [this.professor.horarioDisp],
    });
  }

  onSubmitP(){
    if (this.formP.valid) {
      this.provider.saveP(this.formP.value)
      .then(() => {
        this.toast.create({ message: 'Professor(a) Adicionado(a)!', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao Adicionar Professor(a)!', duration: 3000 }).present();
        console.error(e);
      });
    }
  }
}
