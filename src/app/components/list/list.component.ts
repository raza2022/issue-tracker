import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { IssueService } from '../../issue.service';
import { map } from "rxjs/internal/operators";

export interface UserData {
  _id: string;
  title: string;
  description: string;
  status: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'description', 'status'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public issueService: IssueService) {

  }

  ngOnInit() {

    this.issueService.getIssues().subscribe((data) => {
      if (data instanceof Array) {
        const users : UserData = data.map(obj => {
          return {
            _id: obj._id,
            title: obj.title,
            description: obj.description,
            status: obj.status
          }
        });
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    }, error => console.log(error));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
