import { TestBed } from '@angular/core/testing';

import { AlimentService } from './aliment.service';

describe('AlimentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlimentService = TestBed.get(AlimentService);
    expect(service).toBeTruthy();
  });
});
