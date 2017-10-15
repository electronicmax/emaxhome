import { Component } from '@angular/core';
import { LoaderService, NewsItem, Project } from 'app/loader.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  news: NewsItem[];
  projects: Project[];

  elScroll: 0;
  
  constructor(private loader: LoaderService, private router: Router) {
    this.loader.getNews().then(n => this.news = n);
    this.loader.getProjects().then(p => this.projects = p);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('navivation end ');
        // this.elScroll = 0;
        // (window as any).scrollY = 0;
        window.scrollTo(0,0);
      } else {
        console.log('router Event ', event);
      }
    });    
  }
}
