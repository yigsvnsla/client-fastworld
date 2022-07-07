import { ToolsService } from './../../../../services/tools.service';
import { Component, OnInit } from '@angular/core';
import { CupertinoPane } from 'cupertino-pane';

@Component({
  selector: 'app-crear-encomienda',
  templateUrl: './crear-encomienda.component.html',
  styleUrls: ['./crear-encomienda.component.scss'],
})
export class CrearEncomiendaComponent implements OnInit {

  public productList: any[]


  public categoryList : string[]

  // pane
  private addProductPane:CupertinoPane
  private selectCategoryPane:CupertinoPane
  constructor(
    private toolsService:ToolsService
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
    this.addProductPane = new CupertinoPane('#add', {
      parentElement:'app-crear-encomienda',
      backdrop: true,
      fastSwipeClose:true,
      fitHeight: true
    })

    this.selectCategoryPane = new CupertinoPane('#category-list',{
      parentElement:'app-crear-encomienda',
      backdrop: true,
      fastSwipeClose:true,
      fitHeight: true
    })
  }

  public async ionViewDidEnter() {
    await this.addProductPane.present({animate: true})

  }



  //setters 
  public async setCategory(category:string){
    console.log(category);
    await this.selectCategoryPane.destroy({animate:true})
  }

  public async setMethodPayment(){
    
  }
  // show panes
  public async onShowCategoryPane(){
    await this.selectCategoryPane.present({animate:true})
  }
  public async addProduct(){
    await this.addProductPane.present({animate: true})
  }
}
