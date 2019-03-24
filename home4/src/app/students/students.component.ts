import { Component, OnInit } from '@angular/core';
import { LoaderService, Student } from '../loader.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  cs: Student[];
  sep: Student[];
  alumni: Student[];

  constructor(private loader: LoaderService) {
  }

  ngOnInit() {
    this.loader.getStudents().then(students => {
      
      this.cs = students.filter(s => s.programme === 'CS' && s.status == 'ACTIVE');
      this.sep = students.filter(s => s.programme === 'SEP' && s.status == 'ACTIVE');
      this.alumni = students.filter(s => s.status === 'ALUMNI');
      console.log(` cs ${this.cs.length}: `, this.cs);
    });
  }

}
