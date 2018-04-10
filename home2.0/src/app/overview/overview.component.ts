import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoaderService, Thing } from 'app/loader.service';
import { ActivatedRoute } from '@angular/router';
import { filter as filterObj } from 'lodash';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {

  private thingtype: string;
  private sub: any;
  private byID: { [id: string]: Thing };
  private ordered: Thing[];
  private selected: Thing;
  private unselected: Thing[];

  constructor(private loader: LoaderService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.thingtype = params['type']; // (+) converts string 'id' to a number
       this.getThingsOfType(this.thingtype).then(things => {
         this.byID = things;
         const ordered = Object.values(things);
         ordered.sort((a, b) => new Date(a).valueOf() - new Date(b).valueOf());
         this.ordered = ordered;
         this.setSelected(ordered[0]);

         console.log('Ordered ', this.ordered);
         console.log('Selected ', this.selected);
         console.log('Unselected ', this.unselected);
      });
    });
  }
  setSelected(t: Thing) {
    this.selected = t;
    this.unselected = filterObj(this.ordered, tt => tt !== t);
  }

  getThingsOfType(type?: string) {
    return this.loader.getThingsByID().then(tbyid => filterObj( tbyid, thing => !type || thing.type === type));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
