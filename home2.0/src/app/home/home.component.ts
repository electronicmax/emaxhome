import { Component, OnInit } from '@angular/core';
import { LoaderService, NewsItem, Thing, BibEntry, CuratedPub, CrossRefItem } from "app/loader.service";
import * as _ from 'lodash';


class YearPubs {
  year: number;
  pubs: (CrossRefItem | CuratedPub)[];
};


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  news: NewsItem[];
  Things: Thing[];
  by_year: YearPubs[];

  constructor(private loader: LoaderService) {
    this.loader.getNews().then(n => this.news = n);
    this.loader.getThings().then(p => this.Things = p);
    this.loader.getMergedPubs().then((pubs) => {
      const byyr = _.values(pubs).reduce((all, p) => {
        const yr = p.year;
        if (yr) {
          all[yr] = all[yr] && all[yr].concat(p) || [p];
        }
        return all;
      }, {});
      this.by_year = _.toPairs(byyr).map((pair) => ({ year: pair[0], pubs: pair[1]}));
      this.by_year.sort((a,b) => b.year - a.year);
    });
    (window as any)._home = this;
  }

  ngOnInit() {
  }

}
