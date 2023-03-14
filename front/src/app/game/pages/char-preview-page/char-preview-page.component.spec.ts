import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharPreviewPageComponent } from './char-preview-page.component';

describe('CharPreviewPageComponent', () => {
  let component: CharPreviewPageComponent;
  let fixture: ComponentFixture<CharPreviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharPreviewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharPreviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
