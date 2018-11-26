import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddProfessorPage } from './add-professor';

@NgModule({
  declarations: [
    AddProfessorPage,
  ],
  imports: [
    IonicPageModule.forChild(AddProfessorPage),
  ],
})
export class AddProfessorPageModule {}
