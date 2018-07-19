import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchmemberstoprojectComponent } from './searchmemberstoproject.component';

describe('SearchmemberstoprojectComponent', () => {
  let component: SearchmemberstoprojectComponent;
  let fixture: ComponentFixture<SearchmemberstoprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchmemberstoprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchmemberstoprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
