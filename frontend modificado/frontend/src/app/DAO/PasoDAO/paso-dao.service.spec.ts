import { TestBed } from '@angular/core/testing';

import { PasoDAOService } from './paso-dao.service';

describe('PasoDaoService', () => {
  let service: PasoDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasoDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
