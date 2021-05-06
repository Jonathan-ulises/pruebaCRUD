import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertClComponent } from './insert-cl.component';

describe('InsertClComponent', () => {
  let component: InsertClComponent;
  let fixture: ComponentFixture<InsertClComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertClComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertClComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
