import {Component, OnInit} from '@angular/core';
import {Tab} from '../../common/models/tab.model';
import {FormBuilder, FormGroup} from '@angular/forms';
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

  public outcome: Outcome;
  public loginForm: FormGroup;
  public signupForm: FormGroup;
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

  constructor(private readonly formBuilder: FormBuilder,
              private readonly  router: Router,
              private readonly oauth: OauthService) {
    this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });

    this.signupForm = this.formBuilder.group({
      username: '',
      email: '',
      password: '',
      password2: ''
    });
  }

  ngOnInit(): void {
    this.activeComponent = this.tabs[0].componentTag;
  }

  public onSubmit(formData: any, form: 'login' | 'signup'): void {
    if (form === 'login') {
      this.oauth.login(formData.username, formData.password).subscribe((res: any) => {
        this.router.navigate(
          ['/home']);
      }, error => {
        this.outcome = {
          status: 'error',
          message: error.error
        };
        console.error('error res', error.error);
      });
    } else if (form === 'signup') {
      this.oauth.signUp(formData.username, formData.email, formData.password, formData.password2).subscribe((res: any) => {
        this.activeComponent = 'login';
        this.outcome = {
          status: 'success',
          message: res
        };
        console.log(res);
      }, error => {
        console.log('error res', error.error);
      });
    }
  }

  public onTabChange(tabIndex: number) {
    this.activeComponent = this.tabs[tabIndex].componentTag;
    this.animateToPage(tabIndex);
  }

  private animateToPage(tabIndex: number = 0): void {
    const translateAmt: number = -100 * tabIndex;

    this.tabs.forEach(tab => {
      console.log(document.getElementById(`page_${tab.componentTag}`).style.transform = `translateX(${translateAmt}%)`);
    });
  }

}
