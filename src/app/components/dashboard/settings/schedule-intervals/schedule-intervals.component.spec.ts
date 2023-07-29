import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleIntervalsComponent } from './schedule-intervals.component';

describe('ScheduleIntervalsComponent', () => {
  let component: ScheduleIntervalsComponent;
  let fixture: ComponentFixture<ScheduleIntervalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleIntervalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleIntervalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
