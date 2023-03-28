import { TestBed } from '@angular/core/testing';

import { RecetaDAOService } from './receta-dao.service';

describe('RecetaDAOService', () => {
  let service: RecetaDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetaDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
