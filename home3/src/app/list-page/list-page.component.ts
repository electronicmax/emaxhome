import { Component, OnInit, Input } from '@angular/core';
import { LoaderService, NewsItem, Thing, CrossRefItem, CuratedPub } from '../loader.service';
import * as _ from 'lodash';
import { DomSanitizer } from '@angular/platform-browser';

class YearPubs {
  year: number;
  pubs: (CrossRefItem | CuratedPub)[];
};

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  @Input() type: string;
  @Input() groupBy: string;
  @Input() limit: number;

  news: NewsItem[];
  Things: Thing[];
  by_year: YearPubs[];

  ngOnInit() {
  }

  constructor(private loader: LoaderService, private sanitizer: DomSanitizer) {
    this.loader.getNews().then(n => this.news = n);
    this.loader.getThings().then(p => this.Things = p);
    this.loader.getMergedPubs().then((pubs) => {
      // console.log('merged ', pubs, 'hello ', Object.values(pubs));
      const byyr = Object.values(pubs).reduce((all, p) => {
        const yr = p.year;
        // sanitize pub
        if (p instanceof CuratedPub && p.preview_video_embed) {
          p.preview_video_embed_safe = sanitizer.bypassSecurityTrustResourceUrl(p.preview_video_embed);
        }
        if (p instanceof CuratedPub && p.embed_video_url) {
          p.embed_video_url_safe = sanitizer.bypassSecurityTrustResourceUrl(p.embed_video_url);
        }
        
        if (yr) {
          all[yr] = (all[yr] || []).concat([p]);
        }
        return all;
      }, {});
      console.log('byyr ', byyr);
        this.by_year = _.toPairs(byyr).map((pair) => ({ year: pair[0], pubs: pair[1]}));
        this.by_year.sort((a, b) => b.year - a.year);

        console.log('by year ', this.by_year);
    });
  }

}
