import { TestBed, inject } from '@angular/core/testing';
import { LifeService } from './life.service';

describe('LifeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LifeService]
    });
  });

  it('should init the universe', inject([LifeService], (service: LifeService) => {
    service.initUniverse(2, 2);

    const testUniverse = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 0, y: 1, alive: false },
      { x: 1, y: 1, alive: false },
    ];

    service.state.subscribe(state => expect(state).toEqual(testUniverse));
  }));

  it('should generate the next generation', inject([LifeService], (service: LifeService) => {
    service.initUniverse(5, 5);

    service.setRules([2, 3], [3]);

    const testState = [
      false, false, false, false, false,
      false, false, false, false, false,
      true, true, true, true, true,
      false, false, false, false, false,
      false, false, false, false, false,
    ];

    service.loadInitialState(testState);
    service.nextGeneration();

    const testNextGen = [
      { x: 0, y: 0, alive: false },
      { x: 1, y: 0, alive: false },
      { x: 2, y: 0, alive: true },
      { x: 3, y: 0, alive: false },
      { x: 4, y: 0, alive: false },

      { x: 0, y: 1, alive: false },
      { x: 1, y: 1, alive: false },
      { x: 2, y: 1, alive: true },
      { x: 3, y: 1, alive: false },
      { x: 4, y: 1, alive: false },

      { x: 0, y: 2, alive: false },
      { x: 1, y: 2, alive: false },
      { x: 2, y: 2, alive: true },
      { x: 3, y: 2, alive: false },
      { x: 4, y: 2, alive: false },

      { x: 0, y: 3, alive: false },
      { x: 1, y: 3, alive: false },
      { x: 2, y: 3, alive: true },
      { x: 3, y: 3, alive: false },
      { x: 4, y: 3, alive: false },

      { x: 0, y: 4, alive: false },
      { x: 1, y: 4, alive: false },
      { x: 2, y: 4, alive: true },
      { x: 3, y: 4, alive: false },
      { x: 4, y: 4, alive: false },
    ];

    service.state.subscribe(state => expect(state).toEqual(testNextGen));
  }));

});
