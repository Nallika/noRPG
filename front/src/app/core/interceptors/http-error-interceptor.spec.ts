import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-error-interceptor';
import { PopupService } from '../services/popup.service';

describe('HttpErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let popupService: PopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PopupService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true
        }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    popupService = TestBed.inject(PopupService);
  });

  it('should show an error popup when an HTTP error occurs', () => {
    const testUrl = '/api/data';
    const testError = { error: 'Unexpected error' };

    spyOn(popupService, 'openPopup');

    httpClient.get(testUrl).subscribe({
      error: () => {
        expect(popupService.openPopup).toHaveBeenCalledWith({ title: 'Error', content: 'Unexpected error occured, please reload page.' });
      }
    });

    const req = httpTestingController.expectOne(testUrl);
    req.flush(testError, { status: 500, statusText: 'Internal Server Error' });
  });
});
