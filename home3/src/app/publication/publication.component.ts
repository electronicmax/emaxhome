import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BibEntry, CrossRefItem, CuratedPub } from '../loader.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit, OnChanges {

  @Input() p: BibEntry | CrossRefItem | CuratedPub;
  valp : BibEntry | CrossRefItem | CuratedPub;
  names: string;

  constructor() {}

  ngOnInit() {}

  isBibEntry(x) {
    // console.log('foo! ', x, x instanceof BibEntry); 
    return x instanceof BibEntry;  }
  isCrossRef(x) {
    // console.log('foo2! ', x, x instanceof CrossRefItem);
    return x instanceof CrossRefItem;
  }

  ngOnChanges() {
    this.valp = this.p;
    if (this.p instanceof CuratedPub && this.p.ref) {
      this.valp = this.p.ref; // new Object.assign({}, this.p, this.p.ref); // this.p.ref;
    }
    // deal with names
    if (!this.valp) {
      delete this.names; 
    } else if ( (this.valp instanceof BibEntry || this.valp instanceof CrossRefItem) && this.valp.author && this.valp.author[0]) {
      if (this.valp.author.length > 1) {
        this.names = this.valp.author.slice(0, -1).map((x) => [x.given, x.family].join(' ')).join(', ');
        this.names += ', and ';
        this.names += this.valp.author.slice(-1).map((x) =>  [x.given, x.family].join(' '));
      } else {
        this.names = [this.valp.author[0].given, this.valp.author[0].family].join(' ');
        // this.valp.author.map((x) => [x.given, x.family].join(' ')).join('');
      }
    } else if (this.valp instanceof CuratedPub) {
      if (this.valp.authors && this.valp.authors.length > 1) {
        this.names = this.valp.authors.slice(0, -1).join(', ');
        this.names += ', and ';
        this.names += this.valp.authors.slice(-1);
      } else {
        if (!this.valp.authors) {
          console.error(' this p but not authors but not ref either! -- must be a stub! ', this.valp);
          delete this.names;
        } else {
          this.names = this.valp.authors[0];
        }
      }
    } else {
      console.error('error - valp something else ', this.valp);
    }
  }
}
