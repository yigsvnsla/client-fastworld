import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { BtnMenuComponent } from './btn-menu/btn-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule
  ],
  declarations: [
    BtnMenuComponent
  ],
  exports:[
    BtnMenuComponent
  ]
})
export class GenericComponentsModule {}
