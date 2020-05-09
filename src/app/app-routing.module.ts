import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './pages/home/home.component';
import {ListPage} from './pages/list/list.component';
import {SettingsPage} from './pages/settings/settings.component';
import {CapturePage} from './pages/capture/capture.component';
import {AuthPage} from './pages/auth/auth.component';
import {SplashScreenPage} from './pages/splash-screen/splash-screen.component';
import {AuthGuard} from './common/guards/auth.guard';


const routes: Routes = [{
  path: '',
  component: SplashScreenPage
}, {
  path: 'home',
  component: HomePage,
  canActivate: [AuthGuard]
}, {
  path: 'list',
  component: ListPage,
  canActivate: [AuthGuard]
}, {
  path: 'settings',
  component: SettingsPage,
  canActivate: [AuthGuard]
}, {
  path: 'capture',
  component: CapturePage,
  canActivate: [AuthGuard]
}, {
  path: 'auth',
  component: AuthPage,
  data: {state: 'login'}
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
