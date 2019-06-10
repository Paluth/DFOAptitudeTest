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
  allUsers: Observable<User[]>;
  update: boolean = false;
  nameFilter: string;

  constructor(private _service: UserService, private _route: ActivatedRoute) { }

  filterByName(listUsers: User[], filterName?: string): User[] {
    let filteredUsers: User[] = [];

    if (filterName) {
      listUsers.forEach(user => {
        if (user.name.includes(filterName)) {
          filteredUsers.push(user);
        }
      });
    } else {
      return listUsers;
    }

    return filteredUsers;
  }

  onFilter() {
    this.allUsers.pipe(tap(listUsers => {
      this.users = this.filterByName(listUsers, this.nameFilter);
    })).subscribe();
  }

  private getAllUsers() {
    this._service.getAll().subscribe((value) => {
      this.allUsers = of(value);
      this.nameFilter = "";
      this.allUsers.subscribe(all => { console.debug(all); this.users = this.filterByName(all); console.debug(this.users); });
      
    });
  }

  ngOnInit() {
    this._service.needsUpdate.subscribe(
      need => { if (need) { this.getAllUsers(); this._service.updateComplete(); } });
  }
}
