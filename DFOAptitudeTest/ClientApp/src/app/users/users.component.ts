import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, of, Subscriber } from 'rxjs';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  allUsers: User[];
  update: boolean = false;
  nameFilter: string;
  constructor(private service: UserService, private _route: ActivatedRoute) {
    this.updateUsers();
  }
  onFilter() {
    if (!this.nameFilter) { this.nameFilter = ""; }
    this.users = [];
    if (this.allUsers) {
      this.allUsers.forEach((u) => {
        if (u.name) {
          if (!this.nameFilter || u.name.includes(this.nameFilter)) {
            this.users.push(u);
          }
        }
      });
    }
  }
  private updateUsers() {
    this.service.getAll().subscribe((value) => {
      this.allUsers = value;
      console.debug(this.allUsers);
      this.users = this.allUsers;
      console.debug(this.users);
    });
  }
  ngOnInit() {
    //this._route.queryParams.pipe(
    //  filter((params) => params.update)
    //).subscribe((param) => {
    //  if (param.update == 'true') {
    //    this.updateUsers();
    //  }
    //})
  }

}
