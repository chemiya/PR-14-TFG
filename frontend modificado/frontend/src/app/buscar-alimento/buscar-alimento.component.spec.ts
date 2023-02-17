import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarAlimentoComponent } from './buscar-alimento.component';

describe('BuscarAlimentoComponent', () => {
  let component: BuscarAlimentoComponent;
  let fixture: ComponentFixture<BuscarAlimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarAlimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
