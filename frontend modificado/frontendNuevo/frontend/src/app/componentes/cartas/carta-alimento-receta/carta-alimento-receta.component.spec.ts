import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaAlimentoRecetaComponent } from './carta-alimento-receta.component';

describe('CartaAlimentoRecetaComponent', () => {
  let component: CartaAlimentoRecetaComponent;
  let fixture: ComponentFixture<CartaAlimentoRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaAlimentoRecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaAlimentoRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
