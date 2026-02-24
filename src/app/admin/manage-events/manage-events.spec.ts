import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEventsComponent } from './manage-events';

describe('ManageEvents', () => {
  let component: ManageEventsComponent;
  let fixture: ComponentFixture<ManageEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageEventsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
