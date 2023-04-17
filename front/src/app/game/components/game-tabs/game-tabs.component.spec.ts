import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTabsComponent } from './game-tabs.component';

describe('GameTabsComponent', () => {
  let component: GameTabsComponent;
  let fixture: ComponentFixture<GameTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameTabsComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch tab', () => {
    const oldTab = component.tabs[0];
    const newTab = component.tabs[1];

    expect(component.activeTab).toBe(oldTab);

    const newTabEl = fixture.debugElement.query(By.css(`[data-test="tab-${newTab}"]`)).nativeElement;
    newTabEl.click();

    expect(component.activeTab).toBe(newTab);
  });
});
