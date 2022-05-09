import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDatepickerComponent } from './component-datepicker.component';

describe('DatepickerComponent', () => {
  let component: ComponentDatepickerComponent;
  let fixture: ComponentFixture<ComponentDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentDatepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
