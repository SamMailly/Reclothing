import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Upload } from './upload.page';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: Upload
      }
    ])
  ],
  providers: [ImagePicker, Crop, WebView, FileTransfer],
  declarations: [Upload],
  exports: [Upload]
})
export class UploadPageModule {}
