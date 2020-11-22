import { DashboardComponent } from './dashboard.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { BsDropdownModule } from "ngx-bootstrap";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";


import { RouterModule } from "@angular/router";
import { DashboardRoutes } from "./dashboard.routing";
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild(DashboardRoutes)
  ],
  exports: [DashboardComponent]
})
export class DashboardModule {}