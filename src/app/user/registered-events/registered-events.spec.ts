import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredEventsComponent } from './registered-events';

describe('RegisteredEvents', () => {
  let component: RegisteredEventsComponent;
  let fixture: ComponentFixture<RegisteredEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredEventsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredEventsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
