import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMateriaPage } from './add-materia';

@NgModule({
  declarations: [
    AddMateriaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddMateriaPage),
  ],
})
export class AddMateriaPageModule {}
