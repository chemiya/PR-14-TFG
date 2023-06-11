import { TestBed } from '@angular/core/testing';

import { AlimentoServicioService } from './alimento-servicio.service';

describe('AlimentoServicioService', () => {
  let service: AlimentoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlimentoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
