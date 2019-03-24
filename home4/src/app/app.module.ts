import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ListPageComponent } from './list-page/list-page.component';
import { ErrorComponent } from './error/error.component';
import { LoaderService } from './loader.service';
import { HttpModule } from '@angular/http';
import { ProjectComponent } from './project/project.component';
import { PublicationComponent } from './publication/publication.component';
import { PunctuatePipe } from './punctuate.pipe';
import { TitlecasePipe } from './titlecase.pipe';
import { OverviewComponent } from './overview/overview.component';
import { ThingComponent } from './thing/thing.component';
import { AboutComponent } from './about/about.component';
import { StudentsComponent } from './students/students.component';
import { TeachingComponent } from './teaching/teaching.component';
import { ProjectsComponent } from './projects/projects.component';


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
    component: AboutComponent,
    path: 'about',
    data: { title: 'ABOUT' }
  },
  {
    component: StudentsComponent,
    path: 'students',
    data: { title: 'STUDENTS' }
  },
  {
    component: TeachingComponent,
    path: 'teaching',
    data: { title: 'TEACHING' }
  },
  {
    component: ListPageComponent,
    path: 'publications',
    data: { itemtype: 'publications', title: 'PAPERS' }
  },
  {
    component: ProjectsComponent,
    path: 'projects/:id',
    data: { title: 'RESEARCH' }
  },
  { path: '', redirectTo: 'about', pathMatch: 'full' },
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
    ThingComponent,
    AboutComponent,
    StudentsComponent,
    TeachingComponent,
    ProjectsComponent
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
