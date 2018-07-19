import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchmemberstotasksComponent } from './searchmemberstotasks.component';

describe('SearchmemberstotasksComponent', () => {
  let component: SearchmemberstotasksComponent;
  let fixture: ComponentFixture<SearchmemberstotasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchmemberstotasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchmemberstotasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
