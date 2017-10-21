import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BibEntry, CrossRefItem } from 'app/loader.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit, OnChanges {

  @Input() p: BibEntry | CrossRefItem;
  names: string;

  constructor() {}

  ngOnInit() {}

  isBibEntry(x) {  console.log('foo! ', x, x instanceof BibEntry); return x instanceof BibEntry;  }
  isCrossRef(x) {  console.log('foo2! ', x, x instanceof CrossRefItem);  return x instanceof CrossRefItem;  }

  ngOnChanges() {
    console.log('onchanges ', this.p);    
    if (this.p && (this.p instanceof BibEntry || this.p instanceof CrossRefItem) && this.p.author && this.p.author[0]) {
      if (this.p.author.length > 1) {
        this.names = this.p.author.slice(0, -1).map((x) => [x.given, x.family].join(' ')).join(', ');
        this.names += ', and ';
        this.names += this.p.author.slice(-1).map((x) =>  [x.given, x.family].join(' '));
      } else {
        this.names = [this.p.author[0].given, this.p.author[0].family].join(' ');
        // this.p.author.map((x) => [x.given, x.family].join(' ')).join('');
      }
    } else {
      delete this.names;
    }
  }

}
