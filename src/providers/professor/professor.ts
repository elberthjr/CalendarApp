import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MateriaProvider } from '../../providers/materia/materia';



@Injectable()
export class ProfessorProvider {
  
  
  private PATH = 'professor/';

  constructor(private db: AngularFireDatabase, private materia: MateriaProvider) { }

  getAllP() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key,
          ...c.payload.val()
        }));
      })
  }

  getP(key: string) {
    return this.db.object(this.PATH + key)
      .snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      })
  }

  saveP(professor: any) {
    return new Promise((resolve, reject) => {
      if (professor.key) {
        this.db.list(this.PATH)
          .update(professor.key, {
            nome: professor.nome,
            email: professor.email,
            materia: professor.materia,
            telefone: professor.telefone,
            horarioDisp: professor.horarioDisp
          })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({
            nome: professor.nome,
            email: professor.email,
            materia: professor.materia,
            telefone: professor.telefone,
            horarioDisp: professor.horarioDisp
          })
          .then(() => resolve());
      }
      console.log('pts' + professor.materia)
    });
  }

  removeP(key: any) {
    return this.db.list(this.PATH).remove(key);
  }

}
