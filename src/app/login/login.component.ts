import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AuthGuard } from '../core/auth.guard';
import { moveIn } from '../router.animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {
  error: any;

  constructor(public auth: AuthService, public guard: AuthGuard) { 
    this.error = this.guard.error;
  }

  ngOnInit() {
  }

  loginFb() {
    return this.auth.LoginFb();
  }

  loginGoogle(){
    return this.auth.LoginGoogle();
  }

}
