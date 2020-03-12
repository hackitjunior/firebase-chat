import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup;
  constructor(private fb: FormBuilder, private alertService: AlertService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [ Validators.required  ]],
      lastName: ['', [ Validators.required ]],
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(8) ] ]
    });
  }

  public submit(): void {
    if (this.signupForm.valid) {
      const {firstName, lastName, email, password} = this.signupForm.value;
      console.log(`Email: ${email} Password: ${password} Name: ${firstName} Last Name: ${lastName}`);
    } else {
      const failedSignedAlert = new Alert('Please enter a valid name, emai and passwod, try again', AlertType.Danger);
      this.alertService.alerts.next(failedSignedAlert);
    }
  }

}
