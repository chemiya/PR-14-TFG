import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnadirPublicacionComponent } from './anadir-publicacion.component';

describe('AnadirPublicacionComponent', () => {
  let component: AnadirPublicacionComponent;
  let fixture: ComponentFixture<AnadirPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnadirPublicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnadirPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
