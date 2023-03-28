import { TestBed } from '@angular/core/testing';

import { FavoritaDAOService } from './favorita-dao.service';

describe('FavoritaDaoService', () => {
  let service: FavoritaDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritaDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
