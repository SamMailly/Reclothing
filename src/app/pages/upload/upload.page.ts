import { Component } from '@angular/core';
import { Crop } from '@ionic-native/crop/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';


@Component({
  selector: 'button-upload',
  templateUrl: 'upload.page.html',
  styleUrls: ['upload.page.scss'],
})
export class Upload {

  fileUrl: any = null;
  respData: any;

  imageResponse: any;
  options: any;

  constructor(private ImagePicker: ImagePicker,
    private crop: Crop,
    private webview: WebView,
    private transfer: FileTransfer) { }

  cropUpload() {
    this.ImagePicker.getPictures({ maximumImagesCount: 1, outputType: 0 }).then((results) => {
      for (let i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        this.crop.crop(results[i], { quality: 100 })
          .then(
            newImage => {
              console.log('new image path is: ' + newImage);
              const fileTransfer: FileTransferObject = this.transfer.create();
              const uploadOpts: FileUploadOptions = {
                fileKey: 'file',
                fileName: newImage.substr(newImage.lastIndexOf('/') + 1)
              };

              // this.fileUrl = newImage;
              console.log("pre: ", newImage);
              this.fileUrl = this.webview.convertFileSrc(newImage);
              console.log("after: ", this.fileUrl);
              // fileTransfer.upload(newImage, 'http://192.168.0.7:3000/api/upload', uploadOpts)
              //   .then((data) => {
              //     console.log(data);
              //     this.respData = JSON.parse(data.response);
              //     console.log(this.respData);
              //     this.fileUrl = this.respData.fileUrl;
              //   }, (err) => {
              //     console.log(err);
              //   });
            },
            error => console.error('Error cropping image', error)
          );
      }
    }, (err) => { console.log(err);});
  }


}