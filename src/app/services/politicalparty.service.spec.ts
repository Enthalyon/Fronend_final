import { TestBed } from '@angular/core/testing';

import { PoliticalpartyService } from './politicalparty.service';

describe('PoliticalpartyService', () => {
  let service: PoliticalpartyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliticalpartyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
