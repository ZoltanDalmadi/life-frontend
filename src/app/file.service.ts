import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploader } from 'ng2-file-upload';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { State } from './life.service';

/**
 * This service is responsible for uploading *.lif files to the backend
 * as well as downloading the parsed result.
 */
@Injectable()
export class FileService {

  uploader: FileUploader;
  private _parsedFile: Subject<State> = new Subject();

  constructor(private http: Http) {
    this.uploader = new FileUploader({ url: '/api/upload-file' });
    this.uploader.onCompleteItem = (_, response, status) => {
      this.uploader.clearQueue();
      if (status === 200) {
        this.downloadParsed();
      } else {
        alert(response);
      }
    };
  }

  get parsedFile(): Observable<State> {
    return this._parsedFile.asObservable();
  }

  upload(cols, rows) {
    this.uploader.setOptions({ url: `/api/upload-file?cols=${cols}&rows=${rows}` });
    this.uploader.uploadAll();
  }

  downloadParsed() {
    this.http.get('/api/get-state').map(resp => resp.json())
      .subscribe(parsedState => this._parsedFile.next(parsedState));
  }

}
