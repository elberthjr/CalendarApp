import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import * as moment from 'moment';
import { EventProvider } from '../../providers/event/event';


@IonicPage()
@Component({
  selector: 'page-event-modal',
  templateUrl: 'event-modal.html',
})
export class EventModalPage {
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false}
  minDate = new Date().toISOString();
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private provider: EventProvider, private toast: ToastController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
  save() {
    this.viewCtrl.dismiss(this.event);
  }

}
