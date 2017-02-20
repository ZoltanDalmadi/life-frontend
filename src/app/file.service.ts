import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploader } from 'ng2-file-upload';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { State } from './life.service';

@Injectable()
export class FileService {

  uploader: FileUploader;

  private _filename: BehaviorSubject<string> = new BehaviorSubject('');
  private _parsedFile: Subject<State> = new Subject();

  constructor(private http: Http) {
    this.uploader = new FileUploader({ url: '/api/upload-file' });
    this.uploader.onCompleteItem = (_, response) => this.downloadParsed();
  }

  get filename(): Observable<string> {
    return this._filename.asObservable();
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
