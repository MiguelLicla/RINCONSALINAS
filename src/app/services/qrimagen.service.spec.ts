import { TestBed } from '@angular/core/testing';

import { QrimagenService } from './qrimagen.service';

describe('QrimagenService', () => {
  let service: QrimagenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrimagenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
