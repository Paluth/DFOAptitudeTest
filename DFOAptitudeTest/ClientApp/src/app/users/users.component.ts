import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, of, Subscriber } from 'rxjs';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;
  update: boolean = false;
  constructor(private service: UserService, private _route: ActivatedRoute) {
    this.service.getAll().subscribe((value) => { this.users = of(value); });
  }

  ngOnInit() {
    this._route.queryParams.pipe(
      filter((params) => params.update)
    ).subscribe((param) => {
      if (param.update == 'true') {
        this.service.getAll().subscribe((value) => {
          this.users = of(value);
        });
      }
    })
  }

}
