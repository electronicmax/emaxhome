import { Component, OnInit } from '@angular/core';
import { LoaderService, NewsItem, Thing, BibEntry, CrossRefItem, CuratedPub } from 'src/app/loader.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import 'rxjs/add/operator/filter'; 
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name: string;
  news: NewsItem[];
  projects: Thing[];
  elScroll: 0;
  email = 'max.van.kleek@cs.ox.ac.uk';
  constructor(private loader: LoaderService, private router: Router, private route: ActivatedRoute) {
    this.loader.getNews().then(n => this.news = n);
    this.loader.getThings().then(p => this.projects = p);
    this.router.events.subscribe(event => {
      console.log('router Event ', event);
      
      if (event instanceof NavigationEnd) {
        console.log('navigationEnd ', this.route);
        console.log('navivation end ');
        // this.elScroll = 0;
        // (window as any).scrollY = 0;
        window.scrollTo(0, 0);
      } 
    });
  }
  ngOnInit() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => this.route)
      .map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .subscribe((event) => {
        console.log('setting name ', event, ' ', event.title);
        this.name = event['title'];
      });
  }
}
