import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupComponent } from './popup.component';
import { PopupService } from 'src/app/core/services/popup.service';
import { BehaviorSubject } from 'rxjs';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  const popup = new BehaviorSubject({});
  const popupServiceMock = jasmine.createSpyObj('popupService', ['closePopup'], {
    popup$: popup.asObservable(),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupComponent],
      providers: [
        {
          provide: PopupService,
          useValue: popupServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to popup$ and set title and content', () => {
    const title = 'Test title';
    const content = 'Test content';
    popup.next({ isOpen: true, title, content });

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.overlay').classList.contains('open')).toBeTrue();
    expect(compiled.querySelector('.title').textContent).toBe(title);
    expect(compiled.querySelector('.content').textContent).toBe(content);
  });

  it('should call popupService.closePopup() when onClose() is called', () => {
    component.onClose();
    expect(popupServiceMock.closePopup).toHaveBeenCalled();
  });
});
