import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventProvider } from './../../providers/event/event';

@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  title: string;
  formE: FormGroup;
  event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private viewCtrl: ViewController, private formBuilder: FormBuilder, 
              private providerE: EventProvider, private toast: ToastController) {
    let preselectedDate = moment(this.navParams.get('selectecDay')).format();

    this.event = this.navParams.data.event || {};
    this.createFormE();
    this.setupPageTitle();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }
  
  private setupPageTitle(){
    this.title = this.navParams.data.event ? 'Editando Evento' : 'Adicionando Evento'; 
  }

  createFormE(){
    this.formE = this.formBuilder.group({
      key: [this.event.key],
      title: [this.event.title, Validators.required],
      startTime: [this.event.startTime, Validators.required],
      endTime: [this.event.endTime, Validators.required],
      allDay: [this.event.allDay],
    });
  }

  onSubmitE(){
    if(this.formE.valid) {
      this.providerE.saveE(this.formE.value)
      .then(() => {
        this.toast.create({ message: 'Evento Adicionado!', duration: 3000 }).present();
        this.navCtrl.pop();
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao Adicionar Evento!', duration: 3000 }).present();
        console.error(e);
      });
      this.viewCtrl.dismiss(this.event);
    }
  }

  goHome(){
    this.navCtrl.push('HomePage');
  }

}
