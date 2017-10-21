import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project, LoaderService } from 'app/loader.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  p: Project;
  sub: Subscription;
  projects: Project[];

  constructor(private route: ActivatedRoute, private loader: LoaderService) {
    (window as any)._w = this;
    this.loader.getProjects().then(p => this.projects = p);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        const id = params['id']; // (+) converts string 'id' to a number
        this.loader.getProjects()
        .then((ps) => ps.filter((p) => p.id === id)[0])
        .then((p) => this.p = p);
        // console.log('id is ', id);
    });
  }
}
