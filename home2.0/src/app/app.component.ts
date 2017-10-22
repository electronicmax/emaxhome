import { Component } from '@angular/core';
import { LoaderService, NewsItem, Project, BibEntry, CrossRefItem, CuratedPub } from 'app/loader.service';
import { Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';

class YearPubs {
  year: number;
  pubs: (BibEntry | CrossRefItem | CuratedPub)[];
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  news: NewsItem[];
  projects: Project[];
  by_year: YearPubs[];
  elScroll: 0;
  
  constructor(private loader: LoaderService, private router: Router) {
    this.loader.getNews().then(n => this.news = n);
    this.loader.getProjects().then(p => this.projects = p);
    this.loader.getPubs().then((pubs) => {
      const byyr = _.values(pubs).reduce((all, p) => {
        const yr = p.year;
        if (yr) {
          all[yr] = all[yr] && all[yr].concat(p) || [p];
        }
        return all;
      }, {});
      this.by_year = _.toPairs(byyr).map((pair) => ({ year: pair[0], pubs: pair[1]}));
    });
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
