import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaAlimentoComponent } from './carta-alimento.component';

describe('CartaAlimentoComponent', () => {
  let component: CartaAlimentoComponent;
  let fixture: ComponentFixture<CartaAlimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaAlimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
