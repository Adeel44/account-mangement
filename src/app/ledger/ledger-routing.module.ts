import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLedgerComponent } from './add-ledger/add-ledger.component';
import { ListLedgerComponent } from './list-ledger/list-ledger.component';
import { EditLedgerComponent } from './edit-ledger/edit-ledger.component';

const routes: Routes = [
  { path: "add", component: AddLedgerComponent },
  { path: "list", component: ListLedgerComponent },
  { path: "edit/:id", component: EditLedgerComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LedgerRoutingModule { }
