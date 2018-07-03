import { Component, OnInit } from '@angular/core';

import { Router, ParamMap, ActivatedRoute, } from "@angular/router";
import { switchMap } from 'rxjs/operators';

import { IssueService } from "../../issue.service";



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  issue: Object = {};
  loading: Boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public issueService: IssueService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    // this.issue = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) =>
    //     this.issueService.getIssueById(params.get('id')))
    // );

    this.issueService.getIssueById(id).subscribe((data) => {
      this.issue = data;
    }, error => console.log(error));
    console.log(this.issue)
  }

  goBack() {
    this.router.navigate(['/list']);
  }

  onSubmit() {
    this.issueService.updateIssue(this.issue).subscribe((data) => {
      this.router.navigate(['/list']);
    }, error => {console.log(error)})
  }

  deleteIssue() {
    let id = this.route.snapshot.paramMap.get('id');
    this.issueService.deleteIssue(id).subscribe(data => {
      this.router.navigate(['/list']);
    }, error => { console.log(error)})
  }

}
