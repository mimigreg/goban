import { TestBed } from '@angular/core/testing';

import { ReglesService } from './regles.service';

describe('ReglesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReglesService = TestBed.get(ReglesService);
    expect(service).toBeTruthy();
  });
});
