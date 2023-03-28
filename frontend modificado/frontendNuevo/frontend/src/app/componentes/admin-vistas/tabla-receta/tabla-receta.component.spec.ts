import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRecetaComponent } from './tabla-receta.component';

describe('TablaRecetaComponent', () => {
  let component: TablaRecetaComponent;
  let fixture: ComponentFixture<TablaRecetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaRecetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
