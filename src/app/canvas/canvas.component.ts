import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';

import { LifeService } from '../life.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: [ './canvas.component.css' ]
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef: ElementRef;
  @Input() width: number;
  @Input() height: number;

  private ctx: any;

  constructor(private service: LifeService) { }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = this.width;
    canvas.height = this.height;

    this.ctx = canvas.getContext('2d');
    this.ctx.translate(this.width / 2, this.height / 2);

    this.service.initUniverse(5, 5);
    this.service.setRules([2, 3], [3]);

    const testState = [
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 1, 1, 1, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
    ];

    this.service.loadState(testState);
    this.service.state.subscribe(state => this.draw(this.ctx, state));
  }

  draw(ctx, state) {
    state.forEach(cell => {
      if (cell.alive) {
        ctx.fillStyle = 'green';
      } else {
        ctx.fillStyle = 'red';
      }

      ctx.fillRect(cell.x * 20, cell.y * 20, 20, 20);
    });

    ctx.beginPath();
    ctx.moveTo(0, -100);
    ctx.lineTo(0, 100);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-100, 0);
    ctx.lineTo(100, 0);
    ctx.stroke();
  }

}
