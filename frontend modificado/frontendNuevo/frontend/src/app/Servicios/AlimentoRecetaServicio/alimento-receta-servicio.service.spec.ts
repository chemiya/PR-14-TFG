import { TestBed } from '@angular/core/testing';

import { AlimentoRecetaServicioService } from './alimento-receta-servicio.service';

describe('AlimentoRecetaServicioService', () => {
  let service: AlimentoRecetaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlimentoRecetaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
