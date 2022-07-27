import { CupertinoPane } from 'cupertino-pane';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonItemGroup } from '@ionic/angular';
import { Observable } from 'rxjs';
import { debounceTime, delay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @ViewChild('formLoginRef') formLoginRef: IonItemGroup
  public formLogin: FormGroup
  public loading: boolean

  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit() {
    this.loading = false
    this.formLogin = this.formBuilder.nonNullable.group({
      email: ['', [
        Validators.required,
        Validators.nullValidator,
        Validators.email,
        (emailControl:AbstractControl<string>)=>{
          // si el valor es diferente de vacio y el patron verifica que es un correo valido
          if (emailControl.value  != '' && RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(emailControl.value) ){
            if(emailControl.value.includes(' ')){
              emailControl.setValue(emailControl.value.trim())
            }
            return null
          }else{
            return {invalidEmail:true}
          }
        }
      ]],
      pass: ['', [Validators.required, Validators.nullValidator]]
    })
  }

  public enterOrGo() {
    try {
      // intentamos buscar los elementos hijos del formRef desde el template
      for (const key in this.formLoginRef["el"].children) {
        // validamos que dicha propiedad exista 
        if (Object.prototype.hasOwnProperty.call(this.formLoginRef["el"].children, key)) {
          // hacemos scope a los "ion-items, para buscar en sus propiedades hijas los inputs"
          if (this.formLoginRef["el"].children[key].localName == 'ion-item') {
            // intentamos buscar los elementos hijos del "ion-item" desde la key
            for (const cKey in this.formLoginRef["el"].children[key].children) {
              // validamos que las propiedades exista
              if (Object.prototype.hasOwnProperty.call(this.formLoginRef["el"].children[key].children, cKey)) {
                // hacemos scope a los inputs 
                if (this.formLoginRef["el"].children[key].children[cKey].localName == 'ion-input') {
                  // si el valor valor es vacio...
                  if ((this.formLoginRef["el"].children[key].children[cKey] as HTMLIonInputElement).value == '') {
                    // hacemos focus a el input que este vacio
                    (this.formLoginRef["el"].children[key].children[cKey] as HTMLIonInputElement).setFocus()
                    break
                  }
                  else {
                    if (this.formLogin.valid) {
                      this.onLogin()
                    }
                  }
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  onLogin() {
    this.loading = true
    new Observable(
      subscriber => {
        setTimeout(() => {
          subscriber.next(this.formLogin.value)
        }, 1000);
      })
      .pipe(
        debounceTime(500),
        delay(1000),
      )
      .subscribe(x => {
        this.loading = false
        console.log(x);
        alert(JSON.stringify(x))
      })



  }
}
