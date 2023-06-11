import { TestBed } from '@angular/core/testing';

import { RecetaServicioService } from './receta-servicio.service';

describe('RecetaServicioService', () => {
  let service: RecetaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecetaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
