import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { EmailModel } from '../email-model';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {
  error: any;
  form: FormGroup;
  formControls = {};
  constructor(public auth: AuthService, public router: Router) {
    this.modelKeys.forEach( (key) => {
      let validators = [];   
      if (key === 'password') {
          validators.push(Validators.minLength(6));
      }
      if (key === 'email') {
        validators.push(Validators.email);
    }
      validators.push(Validators.required);
      validators.push(this.noSpecialChars);
      this.formControls[key] = new FormControl(this.model[key], validators);
  })
  this.form = new FormGroup(this.formControls);
  }

  model = new EmailModel("", "");
  modelKeys = Object.keys(this.model);

  noSpecialChars(c: FormControl) {
    let REGEXP = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/);

    return REGEXP.test(c.value) ? {
        validateEmail: {
        valid: false
        }
    } : null;
}


  onSubmit(form){
    this.error = this.auth.error;
    this.auth.onSubmit(form);
    
}

  ngOnInit() {
  }

}


/*
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';


@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent implements OnInit {
  error: any;

  constructor(public auth: AuthService, public router: Router) {
    
   }

  onSubmit(formData){
    this.error = this.auth.error;
    this.auth.onSubmit(formData);
    
}


  ngOnInit() {
  }

}
*/