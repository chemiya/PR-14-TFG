import { TestBed } from '@angular/core/testing';

import { SeguidorServicioService } from './seguidor-servicio.service';

describe('SeguidorServicioService', () => {
  let service: SeguidorServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguidorServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
