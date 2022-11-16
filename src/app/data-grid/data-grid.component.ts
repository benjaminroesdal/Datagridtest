import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { FileDataService } from '../file-data.service';
import { UploadFileComponent } from '../upload-file/upload-file.component';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit, OnDestroy {
  files : any[] = [];
  displayedFile:any;
  subscription!: Subscription;

  constructor(private uploadService: FileDataService, public sanitizer: DomSanitizer) {
  }

  //subscribing to observable in dataservice.
  ngOnInit() {
    this.subscription = this.uploadService.currentFile.subscribe(file => this.files.push(file));
}

  display: boolean = false;

  //Shows dialog and takes file to keep track of selected file.
  showDialog(file:any) {
    this.displayedFile = file;
    this.display = true;
  }

//Used to get safe URL for rendering image.
getSafeUrl(url:string) {
  return this.sanitizer.bypassSecurityTrustResourceUrl(url);
}

//Unsubscribing for memory
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}
}
