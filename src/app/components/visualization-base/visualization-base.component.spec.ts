import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationBaseComponent } from './visualization-base.component';

describe('VisualizationBaseComponent', () => {
  let component: VisualizationBaseComponent;
  let fixture: ComponentFixture<VisualizationBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizationBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
