import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LedgerRoutingModule } from './ledger-routing.module';
import { AddLedgerComponent } from './add-ledger/add-ledger.component';
import { ListLedgerComponent } from './list-ledger/list-ledger.component';
import { EditLedgerComponent } from './edit-ledger/edit-ledger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from "primeng/calendar";



@NgModule({
  declarations: [
    AddLedgerComponent,
    ListLedgerComponent,
    EditLedgerComponent
  ],
  imports: [
    CommonModule,
    LedgerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarModule
    
    
  ]
})
export class LedgerModule { }
