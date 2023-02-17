import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguidosUsuarioComponent } from './seguidos-usuario.component';

describe('SeguidosComponent', () => {
  let component: SeguidosUsuarioComponent;
  let fixture: ComponentFixture<SeguidosUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguidosUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguidosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
