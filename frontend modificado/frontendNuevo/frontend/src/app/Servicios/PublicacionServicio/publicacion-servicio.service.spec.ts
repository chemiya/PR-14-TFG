import { TestBed } from '@angular/core/testing';

import { PublicacionServicioService } from './publicacion-servicio.service';

describe('PublicacionServicioService', () => {
  let service: PublicacionServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicacionServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
