import { TestBed } from '@angular/core/testing';

import { ServicoDadosService } from './servico-dados.service';
import { HttpClientModule } from '@angular/common/http';

describe('ServicoDadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ServicoDadosService = TestBed.get(ServicoDadosService);
    expect(service).toBeTruthy();
  });
});
