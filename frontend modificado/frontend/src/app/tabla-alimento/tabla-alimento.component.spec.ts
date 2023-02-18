import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAlimentoComponent } from './tabla-alimento.component';

describe('TablaAlimentoComponent', () => {
  let component: TablaAlimentoComponent;
  let fixture: ComponentFixture<TablaAlimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaAlimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
