import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from "app/loader.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() type: string;
  @Input() groupBy: string;
  @Input() limit: number;

  constructor(private loader: LoaderService) { }

  ngOnInit() {
  }

}
