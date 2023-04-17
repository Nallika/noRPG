import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from 'src/app/environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });

    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should perform GET request', () => {
    const testUrl = '/test';
    const responseData = { data: 'test data' };

    service.get(testUrl).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpTestingController.expectOne(`${environment.api_url}${testUrl}`);
    expect(req.request.method).toEqual('GET');
    req.flush(responseData);
  });

  it('should perform POST request', () => {
    const testUrl = '/test';
    const requestBody = { data: 'test data' };
    const responseData = { result: 'success' };

    service.post(testUrl, requestBody).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpTestingController.expectOne(`${environment.api_url}${testUrl}`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(JSON.stringify(requestBody));
    req.flush(responseData);
  });

  it('should perform PUT request', () => {
    const testUrl = '/test';
    const requestBody = { data: 'test data' };
    const responseData = { result: 'success' };

    service.put(testUrl, requestBody).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpTestingController.expectOne(`${environment.api_url}${testUrl}`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(JSON.stringify(requestBody));
    req.flush(responseData);
  });

  it('should perform DELETE request', () => {
    const testUrl = '/test';
    const responseData = { result: 'success' };

    service.delete(testUrl).subscribe((response) => {
      expect(response).toEqual(responseData);
    });

    const req = httpTestingController.expectOne(`${environment.api_url}${testUrl}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(responseData);
  });
});
