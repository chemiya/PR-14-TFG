import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguidoresUsuarioComponent } from './seguidores-usuario.component';

describe('SeguidoresComponent', () => {
  let component: SeguidoresUsuarioComponent;
  let fixture: ComponentFixture<SeguidoresUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeguidoresUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguidoresUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
