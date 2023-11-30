import { TestBed } from '@angular/core/testing';

import { ListProfesorService } from './list-profesor.service';

describe('ListProfesorService', () => {
  let service: ListProfesorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListProfesorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
