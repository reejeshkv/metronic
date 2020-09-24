import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../_models/user.model';
import { first } from 'rxjs/operators';
import { ConfirmPasswordValidator } from '../registration/confirm-password.validator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  changePwdForm: FormGroup;
  hasError: boolean;
  isLoading$: Observable<boolean>;
  success:boolean =  false;

  name = '';
  email = '';
  code = '';

  // private fields
  private unsubscribe: Subscription[] = []; 
  // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isLoading$ = this.authService.isLoading$;
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.name = this.route.snapshot.params.name;
    this.email = this.route.snapshot.params.email;
    this.code = this.route.snapshot.params.code;
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.changePwdForm.controls;
  }

  initForm() {
    this.changePwdForm = this.fb.group(
      {
        password: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ],
        cPassword: [
          '',
          Validators.compose([
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(100),
          ]),
        ]
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  submit() {
    this.hasError = false;
    const result = {};
    const userParams = {};
    Object.keys(this.f).forEach(key => {
      result[key] = this.f[key].value;
    });
    result['code'] = this.code;
    result['email'] = this.email;

    // const newUser = new UserModel();
    // newUser.setUser(result);

    const registrationSubscr = this.authService
      .changePwd(result)
      .pipe(first())
      .subscribe((user: UserModel) => {
        if (user) {
          this.router.navigate(['/']);
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(registrationSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

}
