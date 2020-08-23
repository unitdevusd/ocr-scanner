import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SpeakersPageRoutingModule } from './speakers-routing.module';
import { SpeakersPage } from './speakers.page';
import {Camera} from '@ionic-native/camera/ngx';
import {NgProgressModule} from 'ngx-progressbar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpeakersPageRoutingModule,
    NgProgressModule
  ],
  declarations: [SpeakersPage],
 // providers: [Camera]
})
export class SpeakersPageModule {}
