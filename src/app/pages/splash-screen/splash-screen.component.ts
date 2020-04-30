import {Component, OnInit} from '@angular/core';
import {OauthUtils} from '../../common/utils/oauth.utils';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss']
})
export class SplashScreenPage implements OnInit {

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    window.setTimeout(() => {
      if (OauthUtils.isLoggedIn()) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/auth']);
      }
    }, 1000);

  }

}
