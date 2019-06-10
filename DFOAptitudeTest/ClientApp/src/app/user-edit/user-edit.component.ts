import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  _id: number = 0;
  tittle: string;
  submitted: boolean = false;
  userForm: FormGroup = this._builder.group(
    {
      id: ["0"],
      name: ["", [Validators.required, Validators.maxLength(50)]],
      age: ["", [Validators.required, Validators.pattern("[1-9][0-9]{0,2}")]],
      adress: ["", Validators.maxLength(50)]
    });
  constructor(
    private _builder: FormBuilder,
    private _router: ActivatedRoute,
    private service: UserService,
    private _navigate: Router) {
    this._router.paramMap.subscribe((params) =>
    {
      this._id = +params.get("id");
      if (this._id) {
        this.tittle = "Edit User";
        service.getById(this._id).subscribe(
          (user) => this.userForm.setValue({
            id: user.id, name: user.name, age: user.age, adress: user.adress
          }));
      } else {
        this.tittle = "Add User";
      }
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      this.service.createOrUpdate(this.userForm.value).subscribe();
      this._navigate.navigate(["../users"]);
    }
  }

  ngOnInit() {
  }
}
