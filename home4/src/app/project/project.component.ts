import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Thing, LoaderService } from '../loader.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  p: Thing;
  sub: Subscription;
  things: Thing[];

  constructor(private route: ActivatedRoute, private loader: LoaderService) {
    (window as any)._w = this;
    this.loader.getThings().then(p => this.things = p);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        const id = params['id']; // (+) converts string 'id' to a number
        this.loader.getThingsByID().then(byid => this.p = byid[id]);
    });
  }
}
