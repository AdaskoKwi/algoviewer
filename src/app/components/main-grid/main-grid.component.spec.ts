import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGridComponent } from './main-grid.component';

describe('GridComponentComponent', () => {
  let component: MainGridComponent;
  let fixture: ComponentFixture<MainGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
