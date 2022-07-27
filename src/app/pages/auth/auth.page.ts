import { Component, OnInit } from '@angular/core';
import { CupertinoPane } from 'cupertino-pane';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  public loginPane : CupertinoPane
  public registerPane : CupertinoPane

  constructor() { }

  ngOnInit() {

    this.loginPane = new CupertinoPane('app-login', {
      parentElement:'ion-content',
      fitHeight: true,
      backdrop: true,
      fastSwipeClose:true,

    })
    
    this.registerPane = new CupertinoPane('app-register', {
      parentElement:'ion-content',
      fitHeight: true,
      backdrop: true,
      fastSwipeClose:true,

    })    
  }

  // Mostrar Panel de Ingreso
  public async onShowLogin(){
    await this.loginPane.present({animate: true})
  }

  //Mostrar Panel de Registro
  public async onShowRegister(){
    await this.registerPane.present({animate: true})
  }
}
