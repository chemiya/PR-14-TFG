import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaRecetaComponent } from './carta-receta.component';

describe('CartaRecetaComponent', () => {
  let component: CartaRecetaComponent;
  let fixture: ComponentFixture<CartaRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaRecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
