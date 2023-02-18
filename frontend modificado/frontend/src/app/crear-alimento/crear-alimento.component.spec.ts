import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAlimentoComponent } from './crear-alimento.component';

describe('CrearAlimentoComponent', () => {
  let component: CrearAlimentoComponent;
  let fixture: ComponentFixture<CrearAlimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAlimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
