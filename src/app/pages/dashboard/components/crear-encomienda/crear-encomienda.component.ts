import { ToolsService } from './../../../../services/tools.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CupertinoPane } from 'cupertino-pane';
import { IonDatetime, Platform } from '@ionic/angular';
import { endOfMonth } from 'date-fns';

@Component({
  selector: 'app-crear-encomienda',
  templateUrl: './crear-encomienda.component.html',
  styleUrls: ['./crear-encomienda.component.scss'],
})
export class CrearEncomiendaComponent implements OnInit {

  @ViewChild('ProgramedDateTime') ProgramedDateTime:IonDatetime

  public productList: any[]
  
  public categoryList : string[]

  // pane
  private addProductPane:CupertinoPane
  private selectCategoryPane:CupertinoPane
  private inputMethodPayPane:CupertinoPane
  private timeOutProgramedPane:CupertinoPane
  private timeOutToDayPane:CupertinoPane
  private infoUserPane:CupertinoPane
  constructor(
    private toolsService:ToolsService,
    private platform: Platform
  ) {
    this.productList = []
    this.categoryList = [
      'Alimentos',
      'Correspondencia',
      'Llaves',
      'Libros',
      'Licor',
      'Madera',
      'Otros',
      'Ropa',
      'Tecnología',
      'Vidrio'
    ];
  }

  public ngOnInit() {    

    // this.keyboard.onKeyboardDidShow().subscribe(() => {
    //   if (this.paneAggiungiFavoritesList.isHidden()) {
    //     this.paneAggiungiFavoritesList.hide();
    //     this.paneAggiungiFavoritesList.present();
    //   }
    // });

    // this.keyboard.onKeyboardDidHide().subscribe(() => {
    //   if (this.paneAggiungiFavoritesList.isHidden()) {
    //     this.paneAggiungiFavoritesList.hide();
    //     this.paneAggiungiFavoritesList.present();
    //   }
    // });

    // this.platform.keyboardDidShow.subscribe(async (ev) => {
    //   const { keyboardHeight } = ev;
    //   await this.toolsService.showAlert({
    //     message:JSON.stringify(ev),
    //     keyboardClose:false
    //   })
      
    //   // Do something with the keyboard height such as translating an input above the keyboard.
    // });
  
    // this.platform.keyboardDidHide.subscribe((d) => {
    //   console.log('hide keyboard');
      
    //   // Move input back to original location
    // });


    this.addProductPane = new CupertinoPane('#add', {
      parentElement:'app-crear-encomienda',
      backdrop: true,
      fastSwipeClose:true,
      fitHeight: true,
      simulateTouch:true,
      touchMoveStopPropagation:false,
      handleKeyboard:true,
      initialBreak:'top',
      breaks: {
        top: { enabled: true, height: 500 }
      },
    })

    this.selectCategoryPane = new CupertinoPane('#category-list',{
      parentElement:'app-crear-encomienda',
      backdrop: true,
      fastSwipeClose:true,
      fitHeight: true,
      simulateTouch:false,
      touchMoveStopPropagation:false
    })

    this.inputMethodPayPane = new CupertinoPane('#input-method-pay',{
      cssClass:'method-pay-pane',
      parentElement:'app-crear-encomienda',
      backdrop: true,
      fastSwipeClose:true,
      fitHeight: true,
      simulateTouch:false,
      bottomClose: true,
      touchMoveStopPropagation:false,
      handleKeyboard:true
    })

    this.timeOutProgramedPane = new CupertinoPane('#time-out-programed',{
      cssClass:'method-pay-pane',
      parentElement:'app-crear-encomienda',
      backdrop: true,
      fastSwipeClose:true,
      fitHeight: true,
      simulateTouch:false,
      bottomClose: true,
      touchMoveStopPropagation:false,
      handleKeyboard:true,
      events:{
        onWillPresent:()=>{
          this.ProgramedDateTime.min = new Date(Date.now()).toISOString()
          this.ProgramedDateTime.max = endOfMonth(new Date(Date.now())).toISOString()
        },
      }
    })

    this.timeOutToDayPane = new CupertinoPane('#time-out-today',{
      cssClass:'method-pay-pane',
      parentElement:'app-crear-encomienda',
      backdrop: true,
      fastSwipeClose:true,
      fitHeight: true,
      simulateTouch:false,
      bottomClose: true,
      touchMoveStopPropagation:false,
      handleKeyboard:true
    })

    this.infoUserPane = new CupertinoPane('#info-user',{
      cssClass:'method-pay-pane',
      parentElement:'app-crear-encomienda',
      backdrop: true,
      fastSwipeClose:true,
      fitHeight: false,
      simulateTouch:false,
      bottomClose: true,
      touchMoveStopPropagation:true,
      handleKeyboard:true
    })
    
  }

  public async ionViewDidEnter() {

  }

  // methods
  public editItem(item){

  }

  public deleteItem(item){

  }


  //setters 

  public async setProduct(){
    this.productList.push("")
    await this.addProductPane.destroy({animate:true})
  }

  public async setTimeOut(method:'today'|'programed'){
    switch (method) {
      case 'today':
        await this.timeOutToDayPane.present({animate:true})
        break;
      case 'programed':
        await this.timeOutProgramedPane.present({animate:true})
        break;
      default:
        console.error('setTimeOut Error > ',method);
        break;
    }
  }



  public async setMethodPay(method:"transferencia"|"contra-entrega"){
    console.log(method);
    switch (method) {
      case 'transferencia':
        // set value in to form
        break;
      case 'contra-entrega':
        await this.inputMethodPayPane.present({animate:true})
        break;
      default:
        console.error('setMethodPay Error > ',method);
        break;
    }
  }

  public async setTimeOutToday(){
    
  }

  public async setTimeOutProgramed(){
    
  }

  public async setCategory(category:string){
    console.log(category);
    await this.selectCategoryPane.destroy({animate:true})
  }

  public async setMethodPayment(){
    
  }
  // show panes

  public async onShowInfoUser(){
    await this.infoUserPane.present({animate:true})
  }

  public async onShowCategoryPane(){
    await this.selectCategoryPane.present({animate:true})
  }
  public async onShowAddProduct(){
    await this.addProductPane.present({animate: true})
  }
}
