import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SearchWidgetComponent } from './search-widget/search-widget.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchRepoService } from './services/search-repo-service';

class MockSearchRepoService extends SearchRepoService{
  getRepo(queryParams: any){
    return null;
  }
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let searchRepoService: SearchRepoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, FormsModule, ReactiveFormsModule ],
      declarations: [ SearchWidgetComponent, AppComponent ]
    }).overrideComponent(AppComponent, {
      set: {
        providers: [
          { provide: SearchRepoService, useClass: MockSearchRepoService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    searchRepoService = fixture.debugElement.injector.get(SearchRepoService);
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Even Financial Github Repository Search');
  }));
});
