import { TestBed } from '@angular/core/testing';

import { ScrollTopServiceService } from './scroll-top-service.service';

describe('ScrollTopServiceService', () => {
  let service: ScrollTopServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollTopServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
