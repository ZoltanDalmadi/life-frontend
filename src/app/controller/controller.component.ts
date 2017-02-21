import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

import { LifeService } from '../life.service';
import { FileService } from '../file.service';

import config from '../app.config';

/**
 * This component holds the buttons that allows
 * interaction with the application. Also it calls the proper
 * service methods.
 */
@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html'
})
export class ControllerComponent implements OnInit, OnDestroy {
  private handler: Subscription;
  private playing = false;
  private hasFile = false;

  private subs: Array<Subscription> = [];

  constructor(
    private service: LifeService,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.subs.push(this.fileService.parsedFile.subscribe(state => {
      this.service.initUniverse(config.cols, config.rows);
      this.service.setRules(state.rules);
      this.service.loadState(state);
    }));

    this.subs.push(this.service.state.subscribe(_ => this.hasFile = true));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  next() {
    this.stop();
    this.service.nextGeneration();
  }

  play() {
    if (this.playing) {
      return;
    }

    this.playing = true;
    this.handler = Observable.interval(config.interval)
      .subscribe(() => this.service.nextGeneration());
  }

  stop() {
    if (this.playing) {
      this.handler.unsubscribe();
      this.playing = false;
    }
  }

  upload() {
    this.fileService.upload(config.cols, config.rows);
  }

}
