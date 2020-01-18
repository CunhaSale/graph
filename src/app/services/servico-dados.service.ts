import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { States } from '../models/states';
import { Counties } from '../models/counties';
import { Beneficiaries } from '../models/beneficiaries';

@Injectable({
  providedIn: 'root'
})
export class ServicoDadosService {

  constructor(private http: HttpClient) { }

  getStates(): Observable<States[]> {
    return this.http.get<States[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  getCounties(id: number): Observable<Counties[]> {
    return this.http.get<Counties[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`);
  }

  getBeneficiaries(date, cod): Observable<Beneficiaries[]> {
    return this.http.get<Beneficiaries[]>
    (`http://www.transparencia.gov.br/api-de-dados/bolsa-familia-por-municipio?mesAno=${date}&codigoIbge=${cod}`);
  }
}
