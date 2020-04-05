import { TestBed } from '@angular/core/testing';

import { AnimauxService } from './animaux.service';

describe('AnimauxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnimauxService = TestBed.get(AnimauxService);
    expect(service).toBeTruthy();
  });
});
