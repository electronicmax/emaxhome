import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { mapValues, keys, mapKeys, values, trim, uniq, toPairs } from 'lodash';
import { DomSanitizer, SafeResourceUrl, SafeHtml } from '@angular/platform-browser';
import * as _ from 'lodash';
import * as d3 from 'd3';

// can be customised to be sensitive to target.
// pass in function that will generate keys for the cache:
// e.g. if values varies on multiple parameters, then return
// a concatenation of dependent values
export let memoize = (f: (...args: any[]) => string) => {
  return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const retval: { [method: string]: any } = {}, method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const cache_key = propertyKey + (f !== undefined) ? '_' + f.apply(null, args) : '';
      if (retval[cache_key]) {
        return retval[cache_key];
      }
      return retval[cache_key] = method.apply(this, args);
    };
  };
}

/* generated by pandoc */
class Author {
  family: string;
  given: string;
}
class BibEntry {
  id: string;
  author: Author[];
  title: string;
  publisher?: string;
  type: string;
  containerTitle?: string;
  issued?: ({ [key: string]: number[][] });
}

export class Project {
  id: string;
  title: string;
  theme: string;
  pubs: string[];
  images: string[];
  headimg: string;
  color: string;
  summary: string;
  summaryHtml: SafeHtml;
}

export class NewsItem {
  id: string;
  datestr: string;
  date: Date;
  summary: string;
  summaryHtml: SafeHtml;
}


@Injectable()
export class LoaderService {

  constructor(private httpM: HttpModule, private http: Http, private sanitiser: DomSanitizer) { }

  getPubs(): Promise<BibEntry[]> {
    return this.http.get('assets/bibtex.json').toPromise().then(response => {
      return response.json().map(this._inPub);
    });
  }

  _inPub(ii): BibEntry {
    return _.mapKeys(ii, (k) => {
      return _.map(k.split('-'), (kword, i) => i > 0 ? kword.toUpperCase() : kword).join('');
    }) as BibEntry;
  }

  getProjects(): Promise<Project[]> {
    return this.http.get('assets/proj.json').toPromise().then(response => {
      return response.json().projects as Project[];
    }).then((ps) => {
      ps.map((p) => {
        p.color = d3.interpolateRainbow(1.0 * ps.indexOf(p)/ps.length);
        p.summaryHtml = this.sanitiser.bypassSecurityTrustHtml(p.summary);
        (window as any).d3 = d3;
      });
      return ps;
    });
  }

  getNews(): Promise<NewsItem[]> {
    return this.http.get('assets/news.json').toPromise().then(response => {
      return response.json().news as NewsItem[];
    }).then((news) => {
      news.map((n) => {
        n.date = new Date(n.datestr);
        n.summaryHtml = this.sanitiser.bypassSecurityTrustHtml(n.summary);
      });
      news.sort((a, b) => b.date.valueOf() - a.date.valueOf());
      return news;
    });
  }
}
