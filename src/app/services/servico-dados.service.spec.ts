import { TestBed } from '@angular/core/testing';

import { ServicoDadosService } from './servico-dados.service';

describe('ServicoDadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicoDadosService = TestBed.get(ServicoDadosService);
    expect(service).toBeTruthy();
  });
});
