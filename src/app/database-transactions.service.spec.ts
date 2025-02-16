import { TestBed } from '@angular/core/testing';

import { DatabaseTransactionsService } from './database-transactions.service';

describe('DatabaseTransactionsService', () => {
  let service: DatabaseTransactionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseTransactionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
