import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { FileDataService } from '../file-data.service';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
  providers: [DialogService]
})

@Injectable({providedIn: 'root'})
export class UploadFileComponent implements OnInit, OnDestroy {
  constructor(private data: FileDataService, public dialogService: DialogService, public sanitizer: DomSanitizer) { }
  tempObj: FileObj = new FileObj;
  form: any;
  files: any[] = [];
  subscription!: Subscription;
  display: boolean = false;

  //Adds file to DataService and clear form.
  addFile(){
  this.data.addFile(this.tempObj);
  this.form.clear();
  this.display = false;
  }

//Shows dialog for file modification before adding file.
showDialog(event:any, form:any) {
  this.tempObj = {
    name: event.files[0].name,
    url: event.files[0].objectURL?.changingThisBreaksApplicationSecurity,
    type: event.files[0].type,
    size: event.files[0].size
  }
  this.form = form;
  this.display = true;
}

//Used to get safe URL for rendering image.
getSafeUrl() {
  return this.sanitizer.bypassSecurityTrustResourceUrl(this.tempObj.url);
}

//Subscribing to observable from dataservice.
ngOnInit(): void {
  this.subscription = this.data.currentFile.subscribe(file => this.files.push(file));
}

//Unsubscribing for memory
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

}

//Object used to map from PrimeNG file obj, since PrimeNg file properties do not have setters.
export class FileObj {
  name!:string | undefined
  url!: string;
  type!: string | undefined
  size!: number | undefined
}
