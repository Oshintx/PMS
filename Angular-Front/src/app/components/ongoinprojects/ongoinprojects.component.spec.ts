import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoinprojectsComponent } from './ongoinprojects.component';

describe('OngoinprojectsComponent', () => {
  let component: OngoinprojectsComponent;
  let fixture: ComponentFixture<OngoinprojectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoinprojectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoinprojectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
