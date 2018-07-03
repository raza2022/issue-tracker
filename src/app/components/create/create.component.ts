import { Component, OnInit } from '@angular/core';

import { Router, ParamMap, ActivatedRoute, } from "@angular/router";
import { switchMap } from 'rxjs/operators';

import { IssueService } from "../../issue.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  issue: Object = {};
  loading: Boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public issueService: IssueService
  ) {

  }

  ngOnInit() {

  }

  goBack() {
    this.router.navigate(['/list']);
  }

  onSubmit() {
    this.issueService.addIssue(this.issue).subscribe((data) => {
      this.router.navigate(['/list']);
    }, error => {console.log(error)})
  }

}
