import { TestBed } from '@angular/core/testing';

import { BlogDataTransferService } from './blog-data-transfer.service';

describe('BlogDataTransferService', () => {
  let service: BlogDataTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogDataTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
