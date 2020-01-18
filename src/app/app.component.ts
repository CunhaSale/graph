import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ServicoDadosService } from './services/servico-dados.service';
import { Observable } from 'rxjs';
import { States } from './models/states';
import { Counties } from './models/counties';
import { Beneficiaries } from './models/beneficiaries';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('graphElement', { static: true }) el: ElementRef;
  @ViewChild('statesEl', { static: true }) statesEl: ElementRef;

  title = 'Beneficiários Bolsa Família dos últimos 12 meses';
  states$: Observable<States[]>;
  counties$: Observable<Counties[]>;
  beneficiaries$: Observable<Beneficiaries[]>;

  constructor(private servicoDados: ServicoDadosService) { }

  ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    new Chart(this.el.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'Janeiro', 'Fevereiro', 'Março', 'Abril',
          ' Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
          'Outubro', 'Novembro', 'Dezembro'
        ],
        datasets: [
          {
            data: [85, 72, 86, 81, 84, 86, 104, 60, 62, 65, 41, 58],
            borderColor: '#00AEFF',
            fill: false,
            label: 'Estados'
          },
          {
            data: [33, 38, 10, 93, 68, 50, 35, 29, 34, 2, 62, 4],
            borderColor: '#FFCC00',
            fill: false,
            label: 'Municípios'
          }
        ]
      }
    });

    this.states$ = this.servicoDados.getStates();
    this.counties$ = this.servicoDados.getCounties(11);
    this.beneficiaries$ = this.servicoDados.getBeneficiaries(201906, 1100015);

    console.log(this.statesEl.nativeElement.value);
  }

  selectOption(e) {
    this.counties$ = this.servicoDados.getCounties(e);
  }
}
