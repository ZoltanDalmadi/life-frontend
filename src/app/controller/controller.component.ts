import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';

import { LifeService } from '../life.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit {
  private handler: Subscription;
  private playing = false;

  constructor(private service: LifeService) { }

  ngOnInit() {
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
    this.handler = Observable.interval(250)
      .subscribe(() => this.service.nextGeneration());
  }

  stop() {
    if (this.playing) {
      this.handler.unsubscribe();
      this.playing = false;
    }
  }

}
