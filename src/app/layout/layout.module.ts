import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout-components/header/header.component';
import { LeftbarComponent } from './layout-components/leftbar/leftbar.component';
import { FooterComponent } from './layout-components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HeaderComponent,
    LeftbarComponent,
    FooterComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
  ],
  exports: [
    HeaderComponent,
    LeftbarComponent,
    FooterComponent,
    LayoutComponent
  ]
})
export class LayoutModule { }
