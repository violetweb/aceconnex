import { TestBed } from '@angular/core/testing';

import { ExhibitorService } from './exhibitor.service';

describe('ExhibitorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExhibitorService = TestBed.get(ExhibitorService);
    expect(service).toBeTruthy();
  });
});
