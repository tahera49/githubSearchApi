import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchWidgetComponent } from './search-widget.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchRepoService } from '../services/search-repo-service';
import { Observable } from 'rxjs/Rx';

class MockSearchRepoService extends SearchRepoService {
  getRepo(queryParams: any) {
    if (queryParams === "error") {
      var error = "Manual error";
      return Observable.throw(error);
    }
    else {
      var temp = {
        response: [{
          "name": "asifmujteba/ASFTableView",
          "description": "A customizable Web like multi-column table view for iOS with header and inner rows ",
          "license": "MIT License",
          "stars": 76,
          "fork": false,
          "url": "https://github.com/asifmujteba/ASFTableView"
        }]
      }
      return Observable.of(temp);
    }
  }
}

describe('SearchWidgetComponent', () => {
  let component: SearchWidgetComponent;
  let fixture: ComponentFixture<SearchWidgetComponent>;
  let searchRepoService: SearchRepoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [SearchWidgetComponent]
    }).overrideComponent(SearchWidgetComponent, {
      set: {
        providers: [
          { provide: SearchRepoService, useClass: MockSearchRepoService }
        ]
      }
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWidgetComponent);
    component = fixture.componentInstance;
    searchRepoService = fixture.debugElement.injector.get(SearchRepoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('searchRepo should be called', async(() => {
    spyOn(component, 'searchRepo').and.callThrough();
    component.searchParam = '?q=dgdg+fork:true+stars:>4+license:mit';
    component.searchRepo();
    expect(component.searchRepo).toHaveBeenCalled();
  }));

  // it('searchRepo should be called error', async(() => {
  //   spyOn(component, 'searchRepo').and.callThrough();
  //   component.searchParam = '?q=dgdg+fork:true+stars:>4+license:mit';
  //   component.searchRepo();
  //   expect(component.searchRepo).toHaveBeenCalled();
  // }));

  it('searchRepo should be called success', async(() => {
    spyOn(component, 'searchRepo').and.callThrough();
    component.searchParam = '?q=asf+fork:true+stars:%3E4+license:mit';
    component.searchRepo();
    expect(component.searchRepo).toHaveBeenCalled();
    expect(component.repositories).toEqual([
      {
        "name": "asifmujteba/ASFTableView",
        "description": "A customizable Web like multi-column table view for iOS with header and inner rows ",
        "license": "MIT License",
        "stars": 76,
        "fork": false,
        "url": "https://github.com/asifmujteba/ASFTableView"
      }
    ]);
  }));
});


