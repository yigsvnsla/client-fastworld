import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial-encomienda',
  templateUrl: './historial-encomienda.component.html',
  styleUrls: ['./historial-encomienda.component.scss'],
})
export class HistorialEncomiendaComponent implements OnInit {

  public productList: any[]

  constructor() { 
    this.productList = ["","",""]
  }

  ngOnInit() {}

  public onSearchChange($event){
    console.log($event);
    
  }

}
