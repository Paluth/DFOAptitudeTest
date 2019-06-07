import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable, of } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Observable<User[]>;
  constructor(private service: UserService) {
    console.trace("user comp");
    this.service.getAll().subscribe((value) => { this.users = of(value); });
  }

  ngOnInit() {
  }

}
