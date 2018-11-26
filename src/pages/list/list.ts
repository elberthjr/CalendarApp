import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ProfessorProvider } from './../../providers/professor/professor';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  professores: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: ProfessorProvider, private toast: ToastController) {
    this.professores = this.provider.getAllP();
    this.newProfessor();
  }

  newProfessor() {

  }

  editProfessor(professor: any) {
    this.navCtrl.push('AddProfessorPage', { professor: professor });
  }

  removeProfessor(key: string) {
    this.provider.removeP(key)
      .then(() => {
        this.toast.create({ message: 'Professor removido com sucesso.', duration: 3000 }).present();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao remover Professor.', duration: 3000 }).present();
      })
  }

}




