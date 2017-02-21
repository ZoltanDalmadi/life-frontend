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

/**
 * Service which contains the "business logic" of the application.
 */
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

  /**
   * Inits the game of life universe to the specified colums and rows.
   *
   * @param cols the desired columns of the universe
   * @param rows the desired rows of the universe
   */
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

  /**
   * Loads the provided state into an already initialized universe.
   *
   * @param state the state to load.
   */
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

  /**
   * Calculates the next generation of the game universe.
   */
  nextGeneration(): void {
    this.universe = this.universe.map(this.evolve, this);
    this._state.next(this.universe);
    this._generations.next(this._generations.getValue() + 1);
  }

  /**
   * Checks if a cell on the specified coordinates is alive.
   *
   * @param x the x coordinate of the cell
   * @param y the y coordinate of the cell
   * @returns true if the cell is alive, false otherwise
   */
  private isAlive(x: number, y: number): boolean {
    return this.universe[y * this.cols + x].alive;
  }

  /**
   * "Evolves" a cell. Checks its neighbors, and decides based
   * on the rules if it should survive, die or come alive in
   * the next generation.
   *
   * @param cell the Cell to "evolve"
   * @returns a new Cell
   */
  private evolve(cell: Cell): Cell {
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

  /**
   * Checks if a position is inside the game universe.
   *
   * @param x the x coordinate to check
   * @param y the y coordinate to check
   * @returns true if the coordinate is inside the universe, false otherwise
   */
  private positionValid(x: number, y: number): boolean {
    return x >= 0 && x < this.cols && y >= 0 && y < this.rows;
  }
}
