import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ErrorComponent } from './error/error.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { LoaderService } from 'app/loader.service';
import { HttpModule } from '@angular/http';


const appRoutes: Routes = [
  {
    path: '/home',
    component: HomeComponent
  },
  {
    path: '/news',
    component: ListPageComponent,
    data: { type: 'news', title: 'news' }
  },
  {
    path: '/projects',
    component: ListPageComponent,
    data: { type: 'projects', title: 'projects' }
  },
  {
    component: ListPageComponent,
    path: '/publications',
    data: { type: 'publications', title: 'publications' }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent, data: { message: 'page not found' } }
];



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    ListPageComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    Ng2PageScrollModule
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
