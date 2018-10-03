import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GobanComponent } from './goban.component';

describe('GobanComponent', () => {
  let component: GobanComponent;
  let fixture: ComponentFixture<GobanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GobanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GobanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
