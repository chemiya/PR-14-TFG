import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaComentarioComponent } from './carta-comentario.component';

describe('CartaComentarioComponent', () => {
  let component: CartaComentarioComponent;
  let fixture: ComponentFixture<CartaComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaComentarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
