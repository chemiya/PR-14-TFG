import { TestBed } from '@angular/core/testing';

import { SeguidorDAOService } from './seguidor-dao.service';

describe('SeguidorDAOService', () => {
  let service: SeguidorDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeguidorDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
