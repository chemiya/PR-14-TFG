import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconoAplicacionComponent } from './icono-aplicacion.component';

describe('IconoAplicacionComponent', () => {
  let component: IconoAplicacionComponent;
  let fixture: ComponentFixture<IconoAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconoAplicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconoAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
