import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorAlimentoComponent } from './buscador-alimento.component';

describe('BuscadorAlimentoComponent', () => {
  let component: BuscadorAlimentoComponent;
  let fixture: ComponentFixture<BuscadorAlimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorAlimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
