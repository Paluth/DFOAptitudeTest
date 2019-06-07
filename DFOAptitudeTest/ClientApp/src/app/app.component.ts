import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ClientApp';
  constructor(private service: UserService) {
    var users;
    this.service.getUsers().subscribe((value) => { console.debug(value); users = value });
    this.service.getById(5).subscribe((value) => { console.debug(value) });
  }
}
