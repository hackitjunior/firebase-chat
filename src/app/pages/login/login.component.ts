import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Alert } from 'src/app/classes/alert';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  constructor(private fb: FormBuilder, private alertService: AlertService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [ Validators.required, Validators.email ]],
      password: ['', [ Validators.required, Validators.minLength(8) ] ]
    });
  }

  public submit(): void {
    if ( this.loginForm.valid ) {
      const {email, password} = this.loginForm.value;
      console.log(`Email: ${email} Password: ${password}`);
    } else {
      const failedLoginAlert = new Alert('Your email or password were invalid, try again.', AlertType.Danger);
      this.alertService.alerts.next(failedLoginAlert);
    }
  }
}
