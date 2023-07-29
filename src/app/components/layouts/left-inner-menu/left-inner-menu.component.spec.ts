import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftInnerMenuComponent } from './left-inner-menu.component';

describe('LeftInnerMenuComponent', () => {
  let component: LeftInnerMenuComponent;
  let fixture: ComponentFixture<LeftInnerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftInnerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftInnerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
