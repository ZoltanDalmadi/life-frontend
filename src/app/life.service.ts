import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

interface Cell {
  x: number;
  y: number;
  alive: boolean;
}

export interface Rules {
  toSurvive: Array<number>;
  toComeAlive: Array<number>;
}

export interface Block {
  start: { x: number, y: number };
  cells: Array<Array<number>>;
}

export interface State {
  rules: Rules;
  blocks: Array<Block>;
}

@Injectable()
export class LifeService {

  private _state: Subject<Array<Cell>>;
  private _generations: BehaviorSubject<number>;
  private rules: Rules;
  private cols: number;
  private rows: number;
  private universe = [];

  constructor() {
    this._state = new Subject();
    this._generations = new BehaviorSubject(0);
  }

  get state(): Observable<Array<Cell>> {
    return this._state.asObservable();
  }

  get generations(): Observable<number> {
    return this._generations.asObservable();
  }

  initUniverse(cols: number, rows: number): void {
    this.cols = cols;
    this.rows = rows;
    this.universe = [];

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        this.universe.push({ x: i, y: j, alive: false });
      }
    }

    this._state.next(this.universe);
  }

  setRules(rules: Rules): void {
    this.rules = rules;
  }

  loadState(state: State): void {
    this.universe.forEach(cell => cell.alive = false);

    state.blocks.forEach(block => {
      const x = block.start.x;
      let y = block.start.y;
      let index = y * this.cols + x;
      block.cells.forEach(cellLine => {
        cellLine.forEach(cell => this.universe[index++].alive = cell);
        index = ++y * this.cols + x;
      });
    });

    this._state.next(this.universe);
    this._generations.next(0);
  }

  nextGeneration() {
    this.universe = this.universe.map(this.evolve, this);
    this._state.next(this.universe);
    this._generations.next(this._generations.getValue() + 1);
  }

  private isAlive(x: number, y: number): boolean {
    return this.universe[y * this.cols + x].alive;
  }

  private evolve(cell: Cell) {
    const x = cell.x;
    const y = cell.y;
    let alive = cell.alive;
    let aliveNeighbors = 0;

    for (let j = y - 1; j <= y + 1; j++) {
      for (let i = x - 1; i <= x + 1; i++) {
        if (this.positionValid(i, j) && (i !== x || j !== y)) {
          if (this.isAlive(i, j)) {
            aliveNeighbors += 1;
          }
        }
      }
    }

    if (cell.alive && !this.rules.toSurvive.includes(aliveNeighbors)) {
      alive = false;
    } else if (this.rules.toComeAlive.includes(aliveNeighbors)) {
      alive = true;
    }

    return { x, y, alive };
  }

  private positionValid(x: number, y: number): boolean {
    return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
  }
}
