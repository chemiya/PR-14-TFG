import { TestBed } from '@angular/core/testing';

import { AlimentoRecetaDAOService } from './alimento-receta-dao.service';

describe('AlimentoRecetaDaoService', () => {
  let service: AlimentoRecetaDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlimentoRecetaDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
