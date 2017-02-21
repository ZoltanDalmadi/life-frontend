import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input
} from '@angular/core';

import { LifeService } from '../life.service';
import config from '../app.config';

@Component({
  selector: 'app-canvas',
  template: '<canvas #canvas></canvas>',
  styleUrls: [ './canvas.component.css' ]
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef: ElementRef;

  private ctx: any;

  constructor(private service: LifeService) { }

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = config.canvasWidth;
    canvas.height = config.canvasHeight;

    this.ctx = canvas.getContext('2d');
    this.service.state.subscribe(state => this.draw(this.ctx, state));
  }

  private draw(ctx, state) {
    state.forEach(cell => {
      if (cell.alive) {
        ctx.fillStyle = 'black';
      } else {
        ctx.fillStyle = '#eee';
      }

      const cellSize = config.cellSize;
      ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    });

    this.drawGrid(ctx);
  }

  private drawGrid(ctx) {
    ctx.strokeStyle = '#ddd';
    const cellSize = config.cellSize;

    for (let i = 0; i < config.canvasHeight; i += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(config.canvasWidth, i);
      ctx.stroke();
    }

    for (let i = 0; i < config.canvasWidth; i += cellSize) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, config.canvasHeight);
      ctx.stroke();
    }
  }
}
