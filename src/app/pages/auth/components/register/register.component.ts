import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  public formRegister:FormGroup
  public loading: boolean
  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit() {
    this.loading = false
    this.formRegister = this.formBuilder.nonNullable.group({
      dni:['',[Validators.required,Validators.nullValidator]],
      name:['',[Validators.required,Validators.nullValidator]],
      lastname:['',[Validators.required,Validators.nullValidator]],
      phone:['',[Validators.required,Validators.nullValidator]],
      mail:['',[Validators.required,Validators.nullValidator]],
      password:['',[Validators.required,Validators.nullValidator]],
    })
  }

  public onRegister(){
    this.loading = true
    setTimeout(() => {
      console.log(this.formRegister.value);
      this.loading = false
    }, 1000);
  }

}
