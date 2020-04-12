import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderModule } from './layout/header/header.module';
import { HttpClientModule } from '@angular/common/http';
import { ServicoDadosService } from './services/servico-dados.service';
import { tap } from 'rxjs/operators';
import { State } from './models/state';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        HeaderModule,
        HttpClientModule
      ]
    }).compileComponents();
  }));

  function setup() {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    const servicoDadosService = fixture.debugElement.injector.get(ServicoDadosService);

    return { fixture, component, servicoDadosService };
  }

  it('should create the app', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Beneficiários Bolsa Família dos últimos 12 meses'`, () => {
    const { component } = setup();
    expect(component.title).toEqual('Beneficiários Bolsa Família dos últimos 12 meses');
  });

  it('should render title', () => {
    const { fixture } = setup();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('Beneficiários Bolsa Família dos últimos 12 meses');
  });
});
