import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritasRecetasComponent } from './favoritas-recetas.component';

describe('FavoritasComponent', () => {
  let component: FavoritasRecetasComponent;
  let fixture: ComponentFixture<FavoritasRecetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritasRecetasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritasRecetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
