import { TestBed } from '@angular/core/testing';

import { PublicacionDAOService } from './publicacion-dao.service';

describe('PublicacionDAOService', () => {
  let service: PublicacionDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicacionDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
