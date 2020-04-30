import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CapturePage} from './capture.component';

describe('CaptureComponent', () => {
  let component: CapturePage;
  let fixture: ComponentFixture<CapturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CapturePage]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
