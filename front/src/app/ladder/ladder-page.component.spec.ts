import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadderPageComponent } from './ladder-page.component';

describe('LadderPageComponent', () => {
  let component: LadderPageComponent;
  let fixture: ComponentFixture<LadderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LadderPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LadderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
