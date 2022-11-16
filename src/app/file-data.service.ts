import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileDataService {
  private uploadSource = new Subject;
  currentFile = this.uploadSource.asObservable();

  constructor() { }

  //Adds file to next of subject to alerts subscribers of new item.
  addFile(file: any){
    this.uploadSource.next(file);
  }
}
