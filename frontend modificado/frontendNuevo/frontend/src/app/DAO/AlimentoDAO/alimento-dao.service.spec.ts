import { TestBed } from '@angular/core/testing';

import { AlimentoDAOService } from './alimento-dao.service';

describe('AlimentoDAOService', () => {
  let service: AlimentoDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlimentoDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
