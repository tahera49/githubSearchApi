import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchWidgetComponent } from './search-widget.component';
import { BlockUIModule } from 'ng-block-ui';
import { SearchRepoService } from '../services/search-repo-service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        BlockUIModule,
        FormsModule
    ],
    providers: [SearchRepoService],
    exports: [SearchWidgetComponent],
    declarations: [SearchWidgetComponent]
})
export class SearchWidgetModule {

}