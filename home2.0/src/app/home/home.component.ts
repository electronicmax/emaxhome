import { Component, OnInit } from '@angular/core';
import { LoaderService, NewsItem, Project } from "app/loader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  news: NewsItem[];
  projects: Project[];

  constructor(private loader: LoaderService) {
    this.loader.getNews().then(n => this.news = n);
    this.loader.getProjects().then(p => this.projects = p);
  }

  ngOnInit() {
  }

}
