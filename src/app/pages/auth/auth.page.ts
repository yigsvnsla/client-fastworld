import { Component, OnInit } from '@angular/core';
import { CupertinoSettings } from 'cupertino-pane';
import { CupertinoPane } from 'cupertino-pane';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  pane:CupertinoPane

  private loginPane : CupertinoPane
  private registerPane : CupertinoPane
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

  public async onShowLogin(){
    await this.loginPane.present({animate: true})
  }

  public async onShowRegister(){
    await this.registerPane.present({animate: true})
  }
}
