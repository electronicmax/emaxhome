import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BibEntry } from 'app/loader.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit, OnChanges {

  @Input() p: BibEntry;
  names: string;
  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('onchanges ', this.p);
    if (this.p && this.p.author) {
      if (this.p.author.length > 1) {
        this.names = this.p.author.slice(0,-1).map((x) => [x.given, x.family].join(' ')).join(', ');
        this.names += ', and ';
        this.names += this.p.author.slice(-1).map((x) =>  [x.given, x.family].join(' '));
      } else {
        this.names = this.p.author.map((x) => [x.given, x.family].join(' ')).join('');
      }
    } else {
      delete this.names;
    }
  }

}
