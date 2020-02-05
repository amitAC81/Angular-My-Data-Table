import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { TableComponent } from './table/table.component';
import { AddEditModelComponent } from './add-edit-model/add-edit-model.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { CoreModule } from '../core/core.module';
import { JwPaginationComponent } from 'jw-angular-pagination';


@NgModule({
  declarations: [TableComponent, AddEditModelComponent, PopUpComponent, JwPaginationComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule
  ],
  exports: [TableComponent, AddEditModelComponent, PopUpComponent]
})
export class SharedModule { }
