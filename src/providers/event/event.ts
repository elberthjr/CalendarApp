import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class EventProvider {

    private PATH = 'eventos/';
        constructor(private db: AngularFireDatabase){ }

    getAllE(){
        return this.db.list(this.PATH)
        .snapshotChanges()
        .map(changes => {
            return changes.map(c => ({
                key: c.payload.key,
                ...c.payload.val()
            }));
        })
    }

    getE(key: string){
        return this.db.object(this.PATH + key)
        .snapshotChanges()
        .map(c => {
            return { key: c.key, ...c.payload.val() };
        })
    }
    
    saveE(event: any){
        return new Promise((resolve, reject) => {
            if (event.key) {
                this.db.list(this.PATH)
                .update(event.key, { startTime: event.startTime,
                                     endTime: event.endTime,
                                     allDay: event.allDay })
                .then(() => resolve())
                .catch((e) => reject(e));
            } else {
                this.db.list(this.PATH)
                .push({ startTime: event.startTime,
                        endTime: event.endTime,
                        allDay: event.allDay })
                .then(() => resolve());
            }
        });
    }

    removeE(key: any){
        return this.db.list(this.PATH).remove(key);
    }

}