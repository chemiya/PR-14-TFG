import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuroPublicacionesComponent } from './muro-publicaciones.component';

describe('MuroPublicacionesComponent', () => {
  let component: MuroPublicacionesComponent;
  let fixture: ComponentFixture<MuroPublicacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuroPublicacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuroPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
