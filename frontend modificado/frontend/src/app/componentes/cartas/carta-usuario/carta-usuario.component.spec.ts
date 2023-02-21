import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaUsuarioComponent } from './carta-usuario.component';

describe('CartaUsuarioComponent', () => {
  let component: CartaUsuarioComponent;
  let fixture: ComponentFixture<CartaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
