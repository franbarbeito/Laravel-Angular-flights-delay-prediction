import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './view/guest/search/search.component';
import { LoginComponent } from './view/guest/login/login.component';
import { BrowserComponent } from './view/guest/browser/browser.component';
import { RankingComponent } from './view/guest/ranking/ranking.component';
import { ScrappersComponent } from './view/admin/scrappers/scrappers.component';
import { StatsComponent } from './view/admin/stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    LoginComponent,
    BrowserComponent,
    RankingComponent,
    ScrappersComponent,
    StatsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
