import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IssueService {
  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) {
  }

  getIssues() {
    return this.http.get(`${this.uri}/issues`);
  }

  getIssueById(id) {
    return this.http.get(`${this.uri}/issues/${id}`);
  }

  addIssue(title, responsible, description, severity) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.http.post(`${this.uri}/issues`, issue);
  }

  updateIssue(update) {
    let {_id, title, responsible, description, severity, status} = update;
    const issue = {
      _id,
      title,
      responsible,
      description,
      severity,
      status
    };
    return this.http.post(`${this.uri}/issues/update/${_id}`, issue);
  }

  deleteIssue(id) {
    return this.http.delete(`${this.uri}/issues/${id}`);
  }
}
