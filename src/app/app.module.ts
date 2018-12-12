import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MatePage } from '../pages/mate/mate';
import { SobrePage } from '../pages/sobre/sobre';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgCalendarModule } from 'ionic2-calendar';
import { MateriaProvider } from '../providers/materia/materia';
import { ProfessorProvider } from '../providers/professor/professor';
import { EventProvider } from '../providers/event/event';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MatePage,
    SobrePage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCIH8A0ElDZuLY2dSL6qHdgHnGYkfe491M",
      authDomain: "schoolagend-b4781.firebaseapp.com",
      databaseURL: "https://schoolagend-b4781.firebaseio.com",
      projectId: "schoolagend-b4781",
      storageBucket: "",
      messagingSenderId: "403825287702"
  }),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MatePage,
    SobrePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MateriaProvider,
    ProfessorProvider,
    EventProvider
  ]
})
export class AppModule {}
