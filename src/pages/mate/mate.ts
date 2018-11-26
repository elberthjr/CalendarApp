import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { MateriaProvider } from './../../providers/materia/materia';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-mate',
  templateUrl: 'mate.html'
})
export class MatePage {
  materias: Observable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: MateriaProvider, private toast: ToastController) {
    this.materias = this.provider.getAllM();
    this.newMateria();
  }

  newMateria() {

  }

  editMateria(materia: any) {
    this.navCtrl.push('AddMateriaPage', { materia: materia });
  }

  removeMateria(key: string) {
    this.provider.removeM(key)
      .then(() => {
        this.toast.create({ message: 'Matéria removida com sucesso.', duration: 3000 }).present();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao remover Matéria.', duration: 3000 }).present();
      })
  }

}
