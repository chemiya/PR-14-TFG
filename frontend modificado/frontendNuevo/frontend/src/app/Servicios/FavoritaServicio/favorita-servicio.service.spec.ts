import { TestBed } from '@angular/core/testing';

import { FavoritaServicioService } from './favorita-servicio.service';

describe('FavoritaServicioService', () => {
  let service: FavoritaServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritaServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
