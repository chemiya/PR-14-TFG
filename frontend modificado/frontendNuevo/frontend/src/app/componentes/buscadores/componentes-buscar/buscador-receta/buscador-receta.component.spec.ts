import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorRecetaComponent } from './buscador-receta.component';

describe('BuscadorRecetaComponent', () => {
  let component: BuscadorRecetaComponent;
  let fixture: ComponentFixture<BuscadorRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorRecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
