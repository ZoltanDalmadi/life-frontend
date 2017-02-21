import { TestBed, inject } from '@angular/core/testing';
import { State, LifeService } from './life.service';

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

    const testState: State = {
      rules: { toSurvive: [2, 3], toComeAlive: [3] },
      blocks: [{
        start: { x: 1, y: 2 },
        cells: [[1, 1, 1]]
      }]
    };

    service.setRules(testState.rules);
    service.loadState(testState);
    service.nextGeneration();

    const testNextGen = [
      { x: 0, y: 0, alive: 0 },
      { x: 1, y: 0, alive: 0 },
      { x: 2, y: 0, alive: 0 },
      { x: 3, y: 0, alive: 0 },
      { x: 4, y: 0, alive: 0 },

      { x: 0, y: 1, alive: 0 },
      { x: 1, y: 1, alive: 0 },
      { x: 2, y: 1, alive: 1 },
      { x: 3, y: 1, alive: 0 },
      { x: 4, y: 1, alive: 0 },

      { x: 0, y: 2, alive: 0 },
      { x: 1, y: 2, alive: 0 },
      { x: 2, y: 2, alive: 1 },
      { x: 3, y: 2, alive: 0 },
      { x: 4, y: 2, alive: 0 },

      { x: 0, y: 3, alive: 0 },
      { x: 1, y: 3, alive: 0 },
      { x: 2, y: 3, alive: 1 },
      { x: 3, y: 3, alive: 0 },
      { x: 4, y: 3, alive: 0 },

      { x: 0, y: 4, alive: 0 },
      { x: 1, y: 4, alive: 0 },
      { x: 2, y: 4, alive: 0 },
      { x: 3, y: 4, alive: 0 },
      { x: 4, y: 4, alive: 0 },
    ];

    service.state.subscribe(state => expect(state).toEqual(testNextGen));
  }));

});
