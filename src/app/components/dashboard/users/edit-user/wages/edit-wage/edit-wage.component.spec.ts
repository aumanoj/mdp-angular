import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWageComponent } from './edit-wage.component';

describe('EditWageComponent', () => {
  let component: EditWageComponent;
  let fixture: ComponentFixture<EditWageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
