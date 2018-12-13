import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class MateriaProvider {
  
  private PATH = 'materias/';
  constructor(private db: AngularFireDatabase) { }

  getAllM(){
    return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
    .snapshotChanges()
    .map(changes => {
      return changes.map(c => ({
        key: c.payload.key,
        ...c.payload.val()
      }));
    })
  }

  getM(key: string){
    return this.db.object(this.PATH + key)
    .snapshotChanges()
    .map(c => {
      return { key: c.key, ...c.payload.val() };
    })
  }

  saveM(materia: any){
    return new Promise((resolve, reject) => {
      if (materia.key) {
        this.db.list(this.PATH)
        .update(materia.key, { nome: materia.nome, 
                               sigla: materia.sigla, 
                               qntdAulas: materia.qntdAulas, 
                               qntdFaltas: materia.qntdFaltas, 
                               notaP1: materia.notaP1, 
                               notaP2: materia.notaP2, 
                               bibliografia: materia.bibliografia })
        .then(() => resolve())
        .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
        .push({ nome: materia.nome, 
          sigla: materia.sigla, 
          qntdAulas: materia.qntdAulas, 
          qntdFaltas: materia.qntdFaltas, 
          notaP1: materia.notaP1, 
          notaP2: materia.notaP2, 
          bibliografia: materia.bibliografia })
        .then(() => resolve());
      }
    });
  }

  removeM(key: any){
    return this.db.list(this.PATH).remove(key);
  }
  
}
