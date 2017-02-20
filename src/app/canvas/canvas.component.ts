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
    this.service.state.subscribe(state => this.draw(this.ctx, state));
  }

  private draw(ctx, state) {
    state.forEach(cell => {
      if (cell.alive) {
        ctx.fillStyle = 'black';
      } else {
        ctx.fillStyle = '#eee';
      }

      ctx.fillRect(cell.x * 10, cell.y * 10, 10, 10);
    });

    this.drawGrid(ctx);
  }

  private drawGrid(ctx) {
    ctx.strokeStyle = '#ccc';
    for (let i = 0; i < this.height; i += 10) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(this.width, i);
      ctx.stroke();
    }

    for (let i = 0; i < this.width; i += 10) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, this.height);
      ctx.stroke();
    }
  }
}
