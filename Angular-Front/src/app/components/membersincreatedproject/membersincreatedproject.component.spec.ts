import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersincreatedprojectComponent } from './membersincreatedproject.component';

describe('MembersincreatedprojectComponent', () => {
  let component: MembersincreatedprojectComponent;
  let fixture: ComponentFixture<MembersincreatedprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersincreatedprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersincreatedprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
