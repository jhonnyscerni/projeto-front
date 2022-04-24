import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {CollapseModule} from 'ngx-bootstrap/collapse';

import {ProfileComponent} from './profile/profile.component';
import {TimelineComponent} from './timeline/timeline.component';

import {RouterModule} from '@angular/router';
import {portalRoutes} from './portal.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from 'src/app/@core/shared/shared.module';
import {GoldFatherComponent} from './gold-father/gold-father.component';

@NgModule({
  declarations: [ProfileComponent, TimelineComponent, GoldFatherComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(portalRoutes),
    ProgressbarModule.forRoot(),
    CollapseModule.forRoot(),

    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class PortalModule {}
