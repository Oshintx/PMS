import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedbymeComponent } from './createdbyme.component';

describe('CreatedbymeComponent', () => {
  let component: CreatedbymeComponent;
  let fixture: ComponentFixture<CreatedbymeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedbymeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedbymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
