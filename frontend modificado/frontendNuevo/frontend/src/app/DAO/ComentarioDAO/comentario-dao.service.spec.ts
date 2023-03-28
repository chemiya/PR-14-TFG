import { TestBed } from '@angular/core/testing';

import { ComentarioDAOService } from './comentario-dao.service';

describe('ComentarioDaoService', () => {
  let service: ComentarioDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComentarioDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
