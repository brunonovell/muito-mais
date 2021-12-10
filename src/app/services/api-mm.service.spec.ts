import { TestBed } from '@angular/core/testing';

import { ApiMmService } from './api-mm.service';

describe('ApiMmService', () => {
  let service: ApiMmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
