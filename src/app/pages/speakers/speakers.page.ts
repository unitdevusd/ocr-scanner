import { Component, OnInit } from '@angular/core';
import {ActionSheetController} from '@ionic/angular';
import {NgProgress} from 'ngx-progressbar';
import {createWorker} from 'tesseract.js'
import { LoadingService } from '../../services/loading.service';
import {Plugins, CameraResultType, CameraSource} from '@capacitor/core'
const {Camera}=Plugins;

@Component({
  selector: 'app-speakers',
  templateUrl: './speakers.page.html',
  styleUrls: ['./speakers.page.scss'],
})
export class SpeakersPage implements OnInit {

  worker:Tesseract.Worker;
  workerReady =false;
  image='../../../assets/eng_bw.png';
  ocrResult='';
  captureProgress=0;
  imageText: string;

  constructor(private actionSheetController:ActionSheetController,
              private progress:NgProgress,
              private loadingService:LoadingService) { 
                this.loadWorker();
              }

 async  loadWorker(){
    this.loadingService.wait();
    this.worker=createWorker({
      logger:progress => {
        console.log(progress);
        if(progress.status=='recognizing text'){
          this.captureProgress= parseInt(''+ progress.progress*100);
        }
      }
    })
    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    console.log('FIN');
    this.workerReady=true;
    this.loadingService.ready();
  }

  async recognizeImage(){
    const result= await this.worker.recognize(this.image);
    console.log(result);
    this.ocrResult=result.data.text;
  }

 

  ngOnInit() {
  }

  async selectSource(){
    let actionSheet= await this.actionSheetController.create({
      buttons:[
        {
          text: 'Use Library',
          handler: () => {
            this.getPicture(CameraSource.Photos)
          }
        },
        {
          text: 'Capture Image',
          handler: () => {
            this.getPicture(CameraSource.Camera)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
   await actionSheet.present();
  }

  getPicture(sourceType:CameraSource){
    
    const image=Camera.getPhoto({
      quality:100,
      resultType: CameraResultType.DataUrl,
      source :sourceType,
      allowEditing:true,
      saveToGallery:false,
      correctOrientation:true
    }).then(imageData => {
      this.image=imageData.dataUrl;
    });
      
   

   }

  
 
}
