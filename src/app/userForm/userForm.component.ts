import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './userForm.component.html',
})
export class UserFormComponent implements OnInit {
  usernameForm!: FormGroup;

  @Output() searchUser = new EventEmitter<string>();

  ngOnInit() {
    this.usernameForm = new FormGroup({
      username: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.usernameForm.valid) {
      this.searchUser.emit(this.usernameForm.get('username')?.value);
    }
  }
}
