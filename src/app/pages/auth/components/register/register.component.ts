import { ConectionsService } from 'src/app/services/conections.service';
import { IonItemGroup } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToolsService } from 'src/app/services/tools.service';
import { format, isValidPhoneNumber } from 'libphonenumber-js';
import { CupertinoPane } from 'cupertino-pane';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  @ViewChild('formRegisterRef') public formRegisterRef: IonItemGroup
  @Input() pane:CupertinoPane 
  public formRegister:FormGroup
  public loading: boolean
  constructor(
    private toolsService:ToolsService,
    private conectionsService:ConectionsService, 
    private formBuilder: FormBuilder,
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
        (phoneControl: AbstractControl<string>) => {          
          if (phoneControl['value'] != '') {
            if ( RegExp(/ /).test( phoneControl['value'] ) ) phoneControl.patchValue(phoneControl['value'].replace(/ /, ''));
            if ( RegExp(/^[0-9]{10}$/).test( phoneControl['value'] ) ) phoneControl.setValue( format( phoneControl['value'] , 'EC', 'INTERNATIONAL').replace(/ /, '') );
            if ( RegExp(/^[+]{1}[0-9]{12}$/).test( phoneControl['value'] ) && isValidPhoneNumber( phoneControl['value'] )) return null;
            return { notIsValidPhoneNumber: true };
          }
        }
      ]],
      mail:['',[
        Validators.required,
        Validators.nullValidator,
        Validators.email,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
      ]],
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
    this.conectionsService.signUp(this.formRegister.value)
      .subscribe((response)=>{
        this.toolsService.showAlert({
          header: 'Registro con exito ✔',
          subHeader: `Tu cuenta comenzara un proceso de verificacion, te estaremos contactando`,
          cssClass: 'alert-success',
          buttons: [
            {
              text: 'ok',
              role: 'success',
              handler:()=>{
                this.pane.destroy({animate:true})
              }
            }
          ]
        })
      },(error)=>{
        console.error(error);
      },()=>{
        this.loading = false
      })
  }

}
