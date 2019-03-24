import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ErrorComponent } from './error/error.component';
// import { Ng2PageScrollModule } from 'ng2-page-scroll';
// import { LoaderService } from './loader.service';
import { LoaderService } from './loader.service';
import { HttpModule } from '@angular/http';
import { ProjectComponent } from './project/project.component';
import { PublicationComponent } from './publication/publication.component';
import { PunctuatePipe } from './punctuate.pipe';
import { TitlecasePipe } from './titlecase.pipe';
import { OverviewComponent } from './overview/overview.component';
import { ThingComponent } from './thing/thing.component';


const appRoutes: Routes = [
  // {
  //   path: 'home',
  //   component: HomeComponent
  // },
  // {
  //   path: 'news',
  //   component: ListPageComponent,
  //   data: { type: 'news', title: 'news' }
  // },
  // {
  //   path: 'projects/:id',
  //   component: ProjectComponent
  // },
  // {
  //   path: 'overview/:type',
  //   component: OverviewComponent
  // },
  // {
  //   path: 'overview',
  //   component: OverviewComponent
  // },
  {
    component: ListPageComponent,
    path: 'publications',
    data: { itemtype: 'publications', title: 'publications' }
  },
  { path: '', redirectTo: '/publications', pathMatch: 'full' },
  { path: '**', component: ErrorComponent, data: { message: 'page not found' } }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    ListPageComponent,
    ErrorComponent,
    ProjectComponent,
    PublicationComponent,
    PunctuatePipe,
    TitlecasePipe,
    OverviewComponent,
    ThingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    HttpModule
    // Ng2PageScrollModule
  ],
  providers: [LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
