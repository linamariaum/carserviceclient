import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarWithOwnerListComponent } from './car-with-owner-list.component';

describe('CarWithOwnerListComponent', () => {
  let component: CarWithOwnerListComponent;
  let fixture: ComponentFixture<CarWithOwnerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarWithOwnerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarWithOwnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
