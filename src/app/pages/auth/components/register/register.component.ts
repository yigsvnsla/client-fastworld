import { IonItemGroup } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  @ViewChild('formRegisterRef') public formRegisterRef: IonItemGroup

  public formRegister:FormGroup
  public loading: boolean
  constructor(
    private formBuilder: FormBuilder
  ) { }

  public ngOnInit() {
    this.loading = false
    this.formRegister = this.formBuilder.nonNullable.group({
      dni:['',[
        Validators.required,
        Validators.nullValidator,
        Validators.pattern(/(^\d{9}$)/),
      ]],
      name:['',[Validators.required,Validators.nullValidator]],
      lastname:['',[Validators.required,Validators.nullValidator]],
      phone:['',[
        Validators.required,
        Validators.nullValidator,
        Validators.pattern(/[+]{1}[0-9]{11,14}/)
      ]],
      mail:['',[Validators.required,Validators.nullValidator]],
      password:['',[Validators.required,Validators.nullValidator]],
    })
  }

  public enterOrGo() {
    if ( !this.formRegister.valid ) {
      for (const keyC1 in this.formRegisterRef['el']['children']) {
        if (Object.prototype.hasOwnProperty.call(this.formRegisterRef['el']['children'], keyC1)) {
          if (this.formRegisterRef['el']['children'][keyC1]['localName'] == 'ion-item') {
            for (const keyC2 in this.formRegisterRef['el']['children'][keyC1]['children']) {
              if (Object.prototype.hasOwnProperty.call(this.formRegisterRef['el']['children'][keyC1]['children'],keyC2)){
                if (this.formRegisterRef['el']['children'][keyC1]['children'][keyC2]['localName'] == 'ion-input') {
                  if ((this.formRegisterRef['el']['children'][keyC1]['children'][keyC2] as HTMLIonInputElement).value == '') {
                    (this.formRegisterRef['el']['children'][keyC1]['children'][keyC2] as HTMLIonInputElement).setFocus()
                    return
                  }
                }
              }
            }
          }
        }
      }
    }else{
      this.onRegister()
    }
  }


  public onRegister(){
    this.loading = true
    setTimeout(() => {
      console.log(this.formRegister.value);
      this.loading = false
    }, 1000);
  }

}
