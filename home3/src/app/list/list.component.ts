import { Component, OnInit, Input } from '@angular/core';
import { LoaderService, NewsItem, Thing, CrossRefItem, CuratedPub } from '../loader.service';
import * as _ from 'lodash';

class YearPubs {
  year: number;
  pubs: (CrossRefItem | CuratedPub)[];
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() type: string;
  @Input() groupBy: string;
  @Input() limit: number;

  ngOnInit() {
  }

  constructor(private loader: LoaderService) {
  }

}
