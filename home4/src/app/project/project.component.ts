import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Thing, LoaderService, Project } from '../loader.service';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer, SafeHtml } from '../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  // encapsulation: ViewEncapsulation.ShadowDom,
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  p: Project;
  sub: Subscription;
  description: SafeHtml;

  constructor(private route: ActivatedRoute, private loader: LoaderService, protected sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        const id = params['id']; // (+) converts string 'id' to a number
        this.loader.getProjects().then(byid => {
          // console.log('projects byid ', byid);
          this.p = byid.filter( x => x.id === id )[0];
          this.description = this.p && this.p.description && this.sanitizer.bypassSecurityTrustHtml(this.p.description);
        });
    });
    (window as any)._me = this;
  }
}
