import { Component } from '@angular/core';
import { LoaderService, NewsItem, Project } from 'app/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';
  news: NewsItem[];
  projects: Project[];

  constructor(private loader: LoaderService) {
    this.loader.getNews().then(n => this.news = n);
    this.loader.getProjects().then(p => this.projects = p);

    (window as any)._a = this;
  }
}
