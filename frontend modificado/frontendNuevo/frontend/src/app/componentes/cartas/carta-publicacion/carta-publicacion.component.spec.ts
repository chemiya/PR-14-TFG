import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaPublicacionComponent } from './carta-publicacion.component';

describe('CartaPublicacionComponent', () => {
  let component: CartaPublicacionComponent;
  let fixture: ComponentFixture<CartaPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaPublicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
