import { Component, OnInit } from '@angular/core';
import { ConectionsService } from 'src/app/services/conections.service';
import { ToolsService } from 'src/app/services/tools.service';

interface SectionMenu{
  title: string,
  url: string,
  icon?: string,
  options?:SectionMenu[]

}

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnInit{
  public sectionMenu : SectionMenu[]
  constructor(
    private toolsService:ToolsService,
    private conectionsService:ConectionsService,
  ) {}
  ngOnInit(){
    this.sectionMenu = [{
      title: 'Administracion',
      url: 'administracion',
      options: [{
          title: 'Planes',
          url: 'planes',
          icon: 'list',
      }, {
          title: 'Lotes',
          url: 'lotes',
          icon: 'grid',
        }, {
          title: 'Vehículos',
          url: 'vehiculos',
          icon: 'car',
        }
      ]
    }, {
      title: 'Usuarios',
      url:'usuarios',
      options: [
        {
          title: 'Afiliados',
          url: 'administrar',
          icon: 'people-circle',
        }
      ]
    }, {
      title: 'Polizas',
      url:'polizas',
      options: [{
          title: 'Administrar',
          url: '',
          icon: 'list',
        },
        {
          title: 'Crear',
          url: 'crear',
          icon: 'create',
        }
      ]
    }]
  }

  onLogOut() {
    this.toolsService.showAlert({
      cssClass:'alert-danger',
      header:'🛑 Cerrar Sesion',
      subHeader: '¿Desea cerrar su sesion actual?',
      buttons:['Cancelar',{text:'Aceptar', handler:()=>{this.conectionsService.logOut()}}]
    })
  }
  
}
