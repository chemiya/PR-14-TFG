import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescripcionAplicacionComponent } from './descripcion-aplicacion.component';

describe('DescripcionAplicacionComponent', () => {
  let component: DescripcionAplicacionComponent;
  let fixture: ComponentFixture<DescripcionAplicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescripcionAplicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescripcionAplicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
