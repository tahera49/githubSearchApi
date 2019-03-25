import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { SearchRepoService } from './search-repo-service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('SearchRepoService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: SearchRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchRepoService
      ]
    });
    injector = getTestBed();
    service = injector.get(SearchRepoService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('SearchRepoService', () => {
    it('should call getRepo', () => {
      const queryParams = '?q=tahera+fork:true+stars>5';
      const searchUrl = service.corsUrl + "/" + service.searchUrl + queryParams;
      service.getRepo(queryParams).subscribe((data: any) => {
      });
      const req = httpMock.expectOne(`${searchUrl}`);
      expect(req.request.method).toBe("GET");
    });
  });
});