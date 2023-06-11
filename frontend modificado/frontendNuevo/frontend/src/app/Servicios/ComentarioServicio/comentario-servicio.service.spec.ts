import { TestBed } from '@angular/core/testing';

import { ComentarioServicioService } from './comentario-servicio.service';

describe('ComentarioServicioService', () => {
  let service: ComentarioServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentarioServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
