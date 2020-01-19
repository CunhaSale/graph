import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ServicoDadosService } from './services/servico-dados.service';
import { States } from './models/states';
import { Counties } from './models/counties';
import { Beneficiaries } from './models/beneficiaries';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

  beneficiary$: Observable<Beneficiaries[]>;
  countyLastMonths: string[] = [];
  amount: string[] = [];
  chart: Chart;

  constructor(private servicoDados: ServicoDadosService) { }

  ngOnInit() {
    // tslint:disable-next-line: no-unused-expression
    this.chart = new Chart(this.el.nativeElement, {
      type: 'line',
      data: {
        labels: [
          'Janeiro', 'Fevereiro', 'Março', 'Abril',
          ' Maio', 'Junho', 'Julho', 'Agosto', 'Setembro',
          'Outubro', 'Novembro', 'Dezembro'
        ],
        datasets: [
          {
            data: this.countyLastMonths,
            borderColor: '#00AEFF',
            fill: false,
            label: 'Benefíciados',
          },
          {
            data: this.amount,
            hidden: true,
            label: 'label to remove'
          }
        ]
      },
      options: {
        legend: {
          labels: {
            filter: (item) => (!item.text.includes('label to remove'))
          }
        },
        tooltips: {
          callbacks: {
            title: (tooltipItem, data) => (data.labels[tooltipItem[0].index]),
            label: (tooltipItem, data) => (`${data.datasets[0].data[tooltipItem.index]} Beneficiados`),
            afterLabel: (tooltipItem, data) => (`Valor total: ${data.datasets[1].data[tooltipItem.index]}`)
          },
          backgroundColor: '#F9F9F9',
          titleFontSize: 16,
          titleFontColor: '#0066ff',
          bodyFontColor: '#000',
          bodyFontSize: 14,
          displayColors: false,
          borderWidth: .5,
          borderColor: '#000'
        }
      }
    });

    this.states$ = this.servicoDados.getStates();
    this.counties$ = this.servicoDados.getCounties(11);
    this.beneficiaries$ = this.servicoDados.getBeneficiaries(201906, 1100015);
  }

  selectState(e) {
    this.counties$ = this.servicoDados.getCounties(e);
  }

  selectCounty(e) {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    this.updateOptions();
    months.forEach(value => {
      this.servicoDados.getBeneficiaries(`2019${value}`, e)
      .pipe(
        tap(res => {
          if (res[0]) {
            this.countyLastMonths.push(res[0].quantidadeBeneficiados.toString());
            this.amount.push(res[0].valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}).toString());
          }
        }),
        tap(() => this.chart.update())
      ).subscribe();
    });
  }

  private updateOptions() {
    this.chart.data.datasets[0].data = this.countyLastMonths = [];
    this.chart.data.datasets[1].data = this.amount = [];
    this.chart.update();
  }
}
