import { Component } from '@angular/core';
import { LoaderService, NewsItem, Thing, BibEntry, CrossRefItem, CuratedPub } from 'app/loader.service';
import { Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  news: NewsItem[];
  projects: Thing[];
  elScroll: 0;
  email = 'max.van.kleek@cs.ox.ac.uk';
  constructor(private loader: LoaderService, private router: Router) {
    this.loader.getNews().then(n => this.news = n);
    this.loader.getThings().then(p => this.projects = p);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('navivation end ');
        // this.elScroll = 0;
        // (window as any).scrollY = 0;
        window.scrollTo(0, 0);
      } else {
        console.log('router Event ', event);
      }
    });
  }
}
