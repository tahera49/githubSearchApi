import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchWidgetModule } from './search-widget/search-widget.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SearchWidgetModule
  ],
  exports: [
    SearchWidgetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
