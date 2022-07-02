import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public formLogin : FormGroup
  public loading : boolean 

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit() {
    this.loading = false
    this.formLogin = this.formBuilder.nonNullable.group({
      user:['',[Validators.required,Validators.nullValidator]],
      pass:['',[Validators.required,Validators.nullValidator]]
    })
  }


  onLogin(){
    this.loading = true
    setTimeout(() => {
      console.log(this.formLogin.value);
      this.loading = false
    }, 1000);
    
  }
}
