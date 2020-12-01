import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendListComponent } from './trend-list.component';

describe('TrendListComponent', () => {
  let component: TrendListComponent;
  let fixture: ComponentFixture<TrendListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
