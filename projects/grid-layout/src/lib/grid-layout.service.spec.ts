import { TestBed } from '@angular/core/testing';

import { GridLayoutService } from './grid-layout.service';

describe('GridLayoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridLayoutService = TestBed.get(GridLayoutService);
    expect(service).toBeTruthy();
  });
});
