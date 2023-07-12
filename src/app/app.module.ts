import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScrollToBottomDirective } from './scroll-to-bottom-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    ScrollToBottomDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }