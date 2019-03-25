import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators, AbstractControl } from '@angular/forms';
import { SearchRepoService } from '../services/search-repo-service';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.css']
})
export class SearchWidgetComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  constructor(public _searchService: SearchRepoService) { }
  searchForm: FormGroup;
  repositories = [];
  totalResults: any;
  searchFalse: boolean = false;
  searchParam: any;

  ngOnInit() {
    this.searchFalse = false;
    this.searchForm = new FormGroup({
      searchString: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
      stars: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]|([><]\d+)$/)]),
      license: new FormControl('', Validators.required),
      fork: new FormControl('', Validators.required)
    });
  }

  searchRepo() {
    this.searchFalse = true;
    this.blockUI.start();
    this.totalResults = '';
    this.repositories = [];
    this.searchParam = '';
    console.log("Search" + JSON.stringify(this.searchForm.value));
    this.searchParam = '?q=' + this.searchForm.value.searchString + '+fork:' + this.searchForm.value.fork + '+stars:' + this.searchForm.value.stars + '+license:' + this.searchForm.value.license;
    this._searchService.getRepo(this.searchParam).subscribe(
      data => {
        var repoResponse = JSON.parse(JSON.stringify(data));
        for (var i = 0; i < repoResponse.items.length; i++) {
          this.repositories.push({
            "name": repoResponse.items[i].full_name,
            "description": repoResponse.items[i].description,
            "license": repoResponse.items[i].license.name,
            "stars": repoResponse.items[i].stargazers_count,
            "fork": repoResponse.items[i].fork,
            "url": repoResponse.items[i].html_url,
          });
        }
        this.totalResults = repoResponse.total_count;
        console.log("Repo Details " + JSON.stringify(this.repositories) + this.repositories.length);
        console.log("Exit ::: Search Results")
        this.blockUI.stop();
      },
      error => {
        this.blockUI.stop();
        console.log('FAIL ::: Search Results Service');
      }
    )
  }

}
