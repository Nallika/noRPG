import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpTokenInterceptor } from './http.token.interceptor';
import { JwtService } from '../services/jwt.service';

describe('HttpTokenInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let jwtService: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        JwtService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    jwtService = TestBed.inject(JwtService);
  });

  it('should add token', () => {
    const testToken = 'test-token';
    spyOn(jwtService, 'getToken').and.returnValue(testToken);

    const testData = { test: 'data' };
    const testUrl = '/test';

    httpClient.get(testUrl).subscribe();

    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.headers.get('Authorization')).toEqual(testToken);
    expect(req.request.headers.get('Content-Type')).toEqual('application/json');
    expect(req.request.headers.get('Accept')).toEqual('application/json');

    req.flush(testData);
  });
});
