import { Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DFO Aptitude Test';
  constructor(private service: UserService) {
    this.service.create({ id: 0, name: "ABC", age: 10, adress: "street" });
    this.service.getAll().subscribe((value) => { console.debug(value) });
    this.service.getById(5).subscribe((value) => {
      value.name = "John"; value.age = 5;
      this.service.update(value).subscribe();
    });
  }
}
