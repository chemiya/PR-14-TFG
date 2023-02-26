import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorUsuarioComponent } from './buscador-usuario.component';

describe('BuscadorUsuarioComponent', () => {
  let component: BuscadorUsuarioComponent;
  let fixture: ComponentFixture<BuscadorUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
