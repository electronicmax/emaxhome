import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  email = 'max.van.kleek@cs.ox.ac.uk';
  constructor() { }

  ngOnInit() {
  }

}
