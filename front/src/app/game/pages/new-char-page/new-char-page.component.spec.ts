import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCharPageComponent } from './new-char-page.component';

describe('NewCharPageComponent', () => {
  let component: NewCharPageComponent;
  let fixture: ComponentFixture<NewCharPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCharPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCharPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
