import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from '../models/state';
import { County } from '../models/county';
import { Beneficiaries } from '../models/beneficiaries';

@Injectable({
  providedIn: 'root'
})
export class ServicoDadosService {

  constructor(private http: HttpClient) { }

  getStates(): Observable<State[]> {
    return this.http.get<State[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  getCounties(id: number): Observable<County[]> {
    return this.http.get<County[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`);
  }

  getBeneficiaries(date, cod): Observable<Beneficiaries[]> {
    return this.http.get<Beneficiaries[]>
    (`http://www.transparencia.gov.br/api-de-dados/bolsa-familia-por-municipio?mesAno=${date}&codigoIbge=${cod}`);
  }
}
