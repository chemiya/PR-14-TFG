import { TestBed } from '@angular/core/testing';

import { ConexionAPIService } from './conexion-api.service';

describe('ConexionAPIService', () => {
  let service: ConexionAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
