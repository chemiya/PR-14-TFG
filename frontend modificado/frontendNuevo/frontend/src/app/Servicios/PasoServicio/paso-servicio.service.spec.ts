import { TestBed } from '@angular/core/testing';

import { PasoServicioService } from './paso-servicio.service';

describe('PasoServicioService', () => {
  let service: PasoServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasoServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
