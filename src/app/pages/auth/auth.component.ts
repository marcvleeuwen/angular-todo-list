import {Component, OnInit} from '@angular/core';
import {Tab} from '../../common/models/tab.model';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {NavConfig} from '../../common/models/nav-config.model';
import {OauthService} from '../../common/services/oauth/oauth.service';
import {Outcome} from '../../common/models/outcome.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthPage implements OnInit {

  public showModal: boolean = false;
  public errors: ValidationErrors = {};
  public outcome: Outcome;
  public loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
  public changePasswordForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required, Validators.minLength(8)]]
  });
  public signupForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password2: ['', [Validators.required, Validators.minLength(8)]]
  });
  public navConfig: NavConfig = {
    title: 'List App'
  };
  public activeComponent: string;
  public tabs: Tab[] = [
    {
      id: 0,
      active: true,
      componentTag: 'login',
      title: 'Login',
      enabled: true
    }, {
      id: 1,
      active: false,
      componentTag: 'signup',
      title: 'Sign up',
      enabled: true
    }];
  private isSubmitted: boolean = false;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly  router: Router,
              private readonly oauth: OauthService) {
  }

  // Login
  get loginUsername() {
    return this.loginForm.get('username');
  }

  get loginPassword() {
    return this.loginForm.get('password');
  }

  // Sign Up
  get signUpUsername() {
    return this.signupForm.get('username');
  }

  get signUpEmail() {
    return this.signupForm.get('email');
  }

  get signUpPassword() {
    return this.signupForm.get('password');
  }

  get signUpPassword2() {
    return this.signupForm.get('password2');
  }

  // Change Password
  get changeUsername() {
    return this.changePasswordForm.get('username');
  }

  get changeEmail() {
    return this.changePasswordForm.get('email');
  }

  get changePassword() {
    return this.changePasswordForm.get('password');
  }

  get changePassword2() {
    return this.changePasswordForm.get('password2');
  }

  ngOnInit(): void {
    this.activeComponent = this.tabs[0].componentTag;
  }

  public formChanged() {
    if (this.isSubmitted) {
      if (this.activeComponent === 'login') {
        this.validateControl(this.loginUsername, 'loginUsername', 'Username');
        this.validateControl(this.loginPassword, 'loginPassword', 'Password');
      } else {
        this.validateControl(this.signUpUsername, 'signupUsername', 'Username');
        this.validateControl(this.signUpEmail, 'signupEmail', 'Email');
        this.validateControl(this.signUpPassword, 'signupPassword', 'Password');
        this.validateControl(this.signUpPassword2, 'signupPassword2', 'Password');
      }
    }
  }

  public onSubmit(formData: any, form: 'login' | 'signup'): void {
    this.isSubmitted = true;
    if (form === 'login') {
      if (this.loginForm.invalid) {
        this.validateControl(this.loginUsername, 'loginUsername', 'Username');
        this.validateControl(this.loginPassword, 'loginPassword', 'Password');
        return;
      }
      this.oauth.login(formData.username, formData.password).subscribe((res: any) => {
        this.router.navigate(
          ['/home']);
      }, error => {
        this.setValidationError('loginUsernamePassword', error.error);
        this.outcome = {
          status: 'error',
          message: error.error
        };
        console.error('error res', error.error);
      });
    } else if (form === 'signup') {
      if (this.signupForm.invalid) {
        this.validateControl(this.signUpUsername, 'signupUsername', 'Username');
        this.validateControl(this.signUpEmail, 'signupEmail', 'Email');
        this.validateControl(this.signUpPassword, 'signupPassword', 'Password');
        this.validateControl(this.signUpPassword2, 'signupPassword2', 'Password2');
        return;
      } else if (this.validatePasswordMatch(this.signUpPassword, this.signUpPassword2, 'signup')) {
        return;
      }
      this.oauth.signUp(formData.username, formData.email, formData.password, formData.password2).subscribe((res: any) => {
        this.activeComponent = 'login';
        this.outcome = {
          status: 'success',
          message: res
        };
      }, error => {
        console.error('sign up error', error.error);
        this.outcome = {
          message: error.error,
          status: 'error'
        };
      });
    }
  }

  public onTabChange(tabIndex: number) {
    this.isSubmitted = false;
    this.errors = {};
    this.loginForm.reset();
    this.signupForm.reset();
    this.activeComponent = this.tabs[tabIndex].componentTag;
    this.animateToPage(tabIndex);
  }

  public handleModalPositive(): void {
    this.validateControl(this.changeUsername, 'changeUsername', 'Username');
    this.validateControl(this.changeEmail, 'changeEmail', 'Email');
    this.validateControl(this.changePassword, 'changePassword', 'Password');
    this.validateControl(this.changePassword2, 'changePassword2', 'Password2');

    if (this.changePasswordForm.valid) {
      if (!this.validatePasswordMatch(this.changePassword, this.changePassword2, 'change')) {
        console.log('passwords', this.errors);
        return;
      }
      this.oauth.passwordReset(this.changeUsername.value,
        this.changeEmail.value,
        this.changePassword.value,
        this.changePassword2.value).subscribe(res => {
        this.outcome = {status: 'success', message: res};
        this.toggleModal();
      }, error => {
        this.outcome = {status: 'error', message: error.error};
      });
    }
  }

  public handleModalNegative(): void {
    console.log('modal cancel');
    this.changePasswordForm.reset();
    this.toggleModal();
  }

  public toggleModal(): void {
    this.changePasswordForm.reset();
    this.showModal = !this.showModal;
  }

  private setValidationError(id: string, validationMessage: string): void {
    if (validationMessage) {
      this.errors[id] = validationMessage;
    } else {
      delete this.errors[id];
    }
  }

  private validateControl(control: AbstractControl, id: string, name: string): void {
    if (control.errors) {
      if (control.errors.email) {
        this.setValidationError(id, 'Invalid email');
      } else if (control.errors.minlength) {
        this.setValidationError(id, `${name} is too short`);
      } else if (control.errors.maxlength) {
        this.setValidationError(id, `${name} is too long`);
      } else if (control.errors.required) {
        this.setValidationError(id, `${name} is required`);
      }
    } else {
      this.setValidationError(id, undefined);
    }
  }

  private validatePasswordMatch(password: AbstractControl, password2: AbstractControl, prefix: string): boolean {
    if (password.value !== password2.value) {
      this.setValidationError(`${prefix}Password`, undefined);
      this.setValidationError(`${prefix}Password2`, 'Passwords must match');
      return false;
    }

    return true;
  }

  private animateToPage(tabIndex: number = 0): void {
    const translateAmt: number = -100 * tabIndex;

    this.tabs.forEach(tab => {
      document.getElementById(`page_${tab.componentTag}`).style.transform = `translateX(${translateAmt}%)`;
    });
  }
}
